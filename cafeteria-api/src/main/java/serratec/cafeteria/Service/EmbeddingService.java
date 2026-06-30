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

    public EmbeddingService(
            WebClient.Builder webClientBuilder,
            DocumentoRepository documentoRepository,
            @Value("${ollama.base-url}") String baseUrl,
            @Value("${ollama.embedding.model}") String model
    ) {
        this.webClient = webClientBuilder
                .baseUrl(baseUrl)
                .build();
        this.documentoRepository = documentoRepository;
        this.model = model;
    }

    public float[] gerarEmbedding(String texto) {
        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("prompt", texto);

        String responseJson = webClient.post()
                .uri("/api/embeddings")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);
            JsonNode embeddingNode = root.path("embedding");

            float[] embedding = new float[embeddingNode.size()];
            for (int i = 0; i < embeddingNode.size(); i++) {
                embedding[i] = (float) embeddingNode.get(i).asDouble();
            }
            return embedding;
        } catch (Exception e) {
            throw new RuntimeException("Falha ao processar embedding do Ollama", e);
        }
    }

    public void gerarEmbeddingsPendentes() {
        long pendentes = documentoRepository.countSemEmbedding();
        if (pendentes == 0) {
            log.info("Todos os documentos já possuem embeddings.");
            return;
        }

        log.info("Gerando embeddings para {} documentos...", pendentes);
        List<Documento> documentos = documentoRepository.findAll();

        for (Documento doc : documentos) {
            if (doc.getEmbedding() == null) {
                try {
                    String textoParaVetorizar = doc.getTitulo() + ". " + doc.getConteudo();
                    float[] embedding = gerarEmbedding(textoParaVetorizar);
                    doc.setEmbedding(embedding);
                    documentoRepository.save(doc);
                    log.info("Embedding gerado para: {}", doc.getTitulo());
                } catch (Exception e) {
                    log.error("Erro ao gerar embedding para {}: {}", doc.getTitulo(), e.getMessage());
                }
            }
        }
        log.info("Geração de embeddings concluída.");
    }
}
