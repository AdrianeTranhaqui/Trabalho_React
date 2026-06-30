package serratec.cafeteria.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import serratec.cafeteria.Entity.Documento;
import serratec.cafeteria.Repository.DocumentoRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmbeddingService {

    private static final Logger log = LoggerFactory.getLogger(EmbeddingService.class);

    private final WebClient webClient;
    private final DocumentoRepository documentoRepository;
    private final String model;
    private final String apiKey;

    public EmbeddingService(
            WebClient.Builder webClientBuilder,
            DocumentoRepository documentoRepository,
            @Value("${gemini.base-url}") String baseUrl,
            @Value("${gemini.embedding.model}") String model,
            @Value("${gemini.api-key}") String apiKey
    ) {
        this.webClient = webClientBuilder
                .baseUrl(baseUrl)
                .build();
        this.documentoRepository = documentoRepository;
        this.model = model;
        this.apiKey = apiKey;
    }

    public float[] gerarEmbedding(String texto, String taskType) {
        // 1. Monta a estrutura correta exigida pela API do Gemini
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", texto);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(textPart));

        // O body para o endpoint ":embedContent" espera a propriedade "content" diretamente
        Map<String, Object> body = new HashMap<>();
        body.put("content", content);
        body.put("outputDimensionality", 768);
        body.put("taskType", taskType);

        // 2. Faz a chamada apontando para o endpoint oficial do text-embedding-004
        String responseJson = this.webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/" + model + ":embedContent")
                        .queryParam("key", apiKey)
                        .build())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);
            JsonNode valuesNode = root.path("embedding").path("values");

            if (valuesNode.isMissingNode()) {
                throw new RuntimeException("Resposta da API não contém o nó 'embedding.values'. Resposta: " + responseJson);
            }

            float[] embedding = new float[valuesNode.size()];
            for (int i = 0; i < valuesNode.size(); i++) {
                embedding[i] = (float) valuesNode.get(i).asDouble();
            }
            return embedding;
        } catch (Exception e) {
            throw new RuntimeException("Falha ao processar embedding do Gemini API", e);
        }
    }

    public void gerarEmbeddingsPendentes() {
        long pendentes = documentoRepository.countSemEmbedding();
        if (pendentes == 0) {
            log.info("Todos os documentos já possuem embeddings.");
            return;
        }

        log.info("Gerando embeddings via Gemini REST para {} documentos...", pendentes);
        List<Documento> documentos = documentoRepository.findAll();

        for (Documento doc : documentos) {
            if (doc.getEmbedding() == null) {
                try {
                    String textoParaVetorizar = doc.getTitulo() + ". " + doc.getConteudo();
                    float[] embedding = gerarEmbedding(textoParaVetorizar, "RETRIEVAL_DOCUMENT");
                    doc.setEmbedding(embedding);
                    documentoRepository.save(doc);
                    log.info("Embedding gerado para: {}", doc.getTitulo());
                    Thread.sleep(1500);
                } catch (Exception e) {
                    log.error("Erro ao gerar embedding para {}: {}", doc.getTitulo(), e.getMessage());
                }
            }
        }
        log.info("Geração de embeddings concluída.");
    }
}