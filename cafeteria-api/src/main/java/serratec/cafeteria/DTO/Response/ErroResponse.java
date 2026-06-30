package serratec.cafeteria.DTO.Response;

import java.time.Instant;

public record ErroResponse(String mensagem, Instant timestamp) {
    public static ErroResponse of(String mensagem){
        return new ErroResponse(mensagem, Instant.now());
    }
}
