package serratec.cafeteria.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import serratec.cafeteria.Repository.DocumentoRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class BuscaVetorialService {

    private static final Logger log = LoggerFactory.getLogger(BuscaVetorialService.class);

    private final DocumentoRepository documentoRepository;
    private final EmbeddingService embeddingService;

    public BuscaVetorialService(DocumentoRepository documentoRepository, EmbeddingService embeddingService) {
        this.documentoRepository = documentoRepository;
        this.embeddingService = embeddingService;
    }

    public List<String> buscarContexto(String pergunta, int topN) {
        log.info("Buscando contexto para: {}", pergunta);

        float[] embeddingPergunta = embeddingService.gerarEmbedding(pergunta);
        String vectorString = vetorParaString(embeddingPergunta);

        List<Object[]> resultados = documentoRepository.buscarPorSimilaridade(vectorString, topN);

        List<String> contextos = new ArrayList<>();
        for (Object[] row : resultados) {
            String titulo = (String) row[1];
            String conteudo = (String) row[2];
            Double similaridade = ((Number) row[3]).doubleValue();

            log.info("Documento encontrado: '{}' (similaridade: {:.4f})", titulo, similaridade);

            if (similaridade > 0.3) {
                contextos.add(titulo + ": " + conteudo);
            }
        }

        log.info(" {} contextos relevantes encontrados.", contextos.size());
        return contextos;
    }

    private String vetorParaString(float[] vetor) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < vetor.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(vetor[i]);
        }
        sb.append("]");
        return sb.toString();
    }
}
