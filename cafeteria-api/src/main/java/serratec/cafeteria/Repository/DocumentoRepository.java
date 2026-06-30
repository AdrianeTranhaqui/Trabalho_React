package serratec.cafeteria.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import serratec.cafeteria.Entity.Documento;

import java.util.List;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, Long> {

    @Query(value = """
        SELECT id, titulo, conteudo, categoria,
               1 - (embedding <=> CAST(:queryVector AS vector)) AS similarity
        FROM documentos
        WHERE embedding IS NOT NULL
        ORDER BY embedding <=> CAST(:queryVector AS vector)
        LIMIT :limit
        """, nativeQuery = true)
    List<Object[]> buscarPorSimilaridade(
            @Param("queryVector") String queryVector,
            @Param("limit") int limit
    );

    @Query("SELECT COUNT(d) FROM Documento d WHERE d.embedding IS NULL")
    long countSemEmbedding();
}
