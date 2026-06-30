package serratec.cafeteria.Config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import serratec.cafeteria.Service.EmbeddingService;

@Component
public class EmbeddingRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(EmbeddingRunner.class);

    private final EmbeddingService embeddingService;

    public EmbeddingRunner(EmbeddingService embeddingService) {
        this.embeddingService = embeddingService;
    }

    @Override
    public void run(String... args) {
        log.info("=== Verificando embeddings pendentes ===");
        try {
            embeddingService.gerarEmbeddingsPendentes();
        } catch (Exception e) {
            log.error("Erro ao gerar embeddings: {}", e.getMessage());
            log.error("Verifique se a OPENAI_API_KEY está configurada corretamente no application.properties");
        }
    }
}
