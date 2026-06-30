package serratec.cafeteria.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import serratec.cafeteria.DTO.Request.N8nRequest;
import serratec.cafeteria.DTO.Response.N8nResponse;
import serratec.cafeteria.Exception.N8nIndisponivelException;
import serratec.cafeteria.Exception.N8nRespostaInvalidaException;

import java.time.Duration;
import java.util.List;

@Service
public class N8nService {

    private static final Logger log = LoggerFactory.getLogger(N8nService.class);

    private final WebClient n8nWebClient;
    private final BuscaVetorialService buscaVetorialService;
    private final String webhookUrl;
    private int timeoutMs;

    public N8nService(
            WebClient n8nWebClient,
            BuscaVetorialService buscaVetorialService,
            @Value("${n8n.webhook.url}") String webhookUrl,
            @Value("${n8n.webhook.timeout-ms}") int timeoutMs
    ) {
        this.n8nWebClient = n8nWebClient;
        this.buscaVetorialService = buscaVetorialService;
        this.webhookUrl = webhookUrl;
        this.timeoutMs = timeoutMs;
    }

    public String perguntar(String pergunta){
        long inicio = System.currentTimeMillis();
        log.info("Enviando pergunta ao n8n. Tamanho da pergunta: {} caracteres", pergunta.length());

        List<String> contextos;
        try {
            contextos = buscaVetorialService.buscarContexto(pergunta, 3);
        } catch (Exception e) {
            log.warn("Falha na busca vetorial, continuando sem contexto: {}", e.getMessage());
            contextos = List.of();
        }

        if (!contextos.isEmpty()) {
            log.info("Contexto retrieved: {} trechos", contextos.size());
        }

        try{
            N8nRequest request = new N8nRequest(pergunta, contextos);

            String rawResponse = n8nWebClient.post()
                    .uri(webhookUrl)
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofMillis(timeoutMs))
                    .block();

            long duracao = System.currentTimeMillis() - inicio;
            log.info("Resposta raw do n8n recebida em {} ms: {}", duracao, rawResponse);

            ObjectMapper mapper = new ObjectMapper();
            N8nResponse resposta = mapper.readValue(rawResponse, N8nResponse.class);

            if (resposta == null || resposta.resposta() == null || resposta.resposta().isBlank()){
                throw new N8nRespostaInvalidaException("O n8n respondeu, mas sem conteúdo de resposta válido. Raw: " + rawResponse);
            }

            return resposta.resposta();
        }
        catch (WebClientResponseException ex){
            log.error("n8n respondeu com status de erro: {}", ex.getStatusCode(), ex);

            throw new N8nRespostaInvalidaException("O n8n respondeu com erro: "+ ex.getStatusCode(), ex);
        }
        catch (N8nRespostaInvalidaException ex){
            throw ex;
        }
        catch (Exception ex){
            log.error("Falha de comunicação com o n8n", ex);

            throw new N8nIndisponivelException("Não foi possível conectar ao n8n", ex);
        }
    }
}
