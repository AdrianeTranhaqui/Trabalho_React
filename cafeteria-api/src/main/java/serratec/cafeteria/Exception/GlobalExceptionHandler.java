package serratec.cafeteria.Exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import serratec.cafeteria.DTO.Response.ErroResponse;


@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResponse> handleValidacao(MethodArgumentNotValidException ex){
        String mensagem = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(erro -> erro.getDefaultMessage())
                .orElse("Requisição inválida.");

        return ResponseEntity.badRequest().body(ErroResponse.of(mensagem));
    }

    @ExceptionHandler(N8nIndisponivelException.class)
    public ResponseEntity<ErroResponse> handleN8nIndisponivel(N8nIndisponivelException ex) {
        log.error("n8n indisponível: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT)
                .body(ErroResponse.of("O assistente está temporariamente indisponível. Tente novamente em alguns instantes."));
    }

    @ExceptionHandler(N8nRespostaInvalidaException.class)
    public ResponseEntity<ErroResponse> handleN8nRespostaInvalida(N8nRespostaInvalidaException ex) {
        log.error("Resposta inválida do n8n: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(ErroResponse.of("Não foi possível processar sua pergunta agora. Tente novamente."));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResponse> handleGenerico(Exception ex) {
        log.error("Erro inesperado", ex);
        return ResponseEntity.internalServerError()
                .body(ErroResponse.of("Ocorreu um erro inesperado. Tente novamente mais tarde."));
    }
}
