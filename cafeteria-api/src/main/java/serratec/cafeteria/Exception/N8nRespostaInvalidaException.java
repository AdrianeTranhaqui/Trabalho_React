package serratec.cafeteria.Exception;

public class N8nRespostaInvalidaException extends RuntimeException{

    public N8nRespostaInvalidaException(String message) {
        super(message);
    }

    public N8nRespostaInvalidaException(String message, Throwable cause) {
        super(message, cause);
    }
}
