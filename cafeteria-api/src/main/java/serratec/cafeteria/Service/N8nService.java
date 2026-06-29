package serratec.cafeteria.Service;

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

@Service
public class N8nService {

    private static final Logger log = LoggerFactory.getLogger(N8nService.class);

    private final WebClient n8nWebClient;
    private final String webhookUrl;
    private  int timeoutMs;

    public N8nService(
            WebClient n8nWebClient,
            @Value("${n8n.webhook.url}") String webhookUrl,
            @Value("${n8n.webhook.timeout-ms}") int timeoutMs
    ) {
        this.n8nWebClient = n8nWebClient;
        this.webhookUrl = webhookUrl;
        this.timeoutMs = timeoutMs;
    }

    public String perguntar(String pergunta){
        long inicio = System.currentTimeMillis();
        log.info("Enviando pergunta ao n8n. Tamanho da pergunta: {} caracteres", pergunta.length());

        try{
            N8nResponse resposta = n8nWebClient.post()
                    .uri(webhookUrl)
                    .bodyValue(new N8nRequest(pergunta))
                    .retrieve()
                    .bodyToMono(N8nResponse.class)
                    .timeout(Duration.ofMillis(timeoutMs))
                    .block();

            long duracao = System.currentTimeMillis() - inicio;
            log.info("Resposta do n8n recebida em {} ms", duracao);

            if (resposta == null || resposta.resposta() == null || resposta.resposta().isBlank()){
                throw new N8nRespostaInvalidaException("0 n8n respondeu, mas sem conteúdo de resposta válido.");
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
