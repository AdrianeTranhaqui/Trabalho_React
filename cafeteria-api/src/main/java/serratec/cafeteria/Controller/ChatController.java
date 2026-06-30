package serratec.cafeteria.Controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import serratec.cafeteria.DTO.Request.PerguntaRequest;
import serratec.cafeteria.DTO.Response.RespostaDTO;
import serratec.cafeteria.Service.N8nService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final N8nService n8nService;

    public ChatController(N8nService n8nService) {
        this.n8nService = n8nService;
    }

    @PostMapping("/chat")
    public ResponseEntity<RespostaDTO> chat(@Valid @RequestBody PerguntaRequest request){
        String resposta = n8nService.perguntar(request.pergunta());
        return ResponseEntity.ok(new RespostaDTO(resposta));
    }
}
