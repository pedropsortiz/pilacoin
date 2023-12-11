package br.ufsm.csi.pilacoin.backend.controller;

import br.ufsm.csi.pilacoin.backend.model.*;
import br.ufsm.csi.pilacoin.backend.repository.PilacoinRepository;
import br.ufsm.csi.pilacoin.backend.repository.UsuarioRepository;
import br.ufsm.csi.pilacoin.backend.service.MineraService;
import br.ufsm.csi.pilacoin.backend.service.ValidaService;
import br.ufsm.csi.pilacoin.backend.util.PilaUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/")
public class MainController {
    private final RabbitTemplate rabbitTemplate;
    private final UsuarioRepository usuarioRepository;
    private final PilacoinRepository pilacoinRepository;

    public MainController(RabbitTemplate rabbitTemplate, UsuarioRepository usuarioRepository, PilacoinRepository pilacoinRepository) {
        this.rabbitTemplate = rabbitTemplate;
        this.usuarioRepository = usuarioRepository;
        this.pilacoinRepository = pilacoinRepository;
    }

    @GetMapping("/query/{type}")
    public void query(@PathVariable String type) throws JsonProcessingException {
        QueryEnvia query = QueryEnvia.builder().idQuery(1).tipoQuery(type).nomeUsuario(PilaUtil.USERNAME).build();
        ObjectMapper objectMapper = new ObjectMapper();
        rabbitTemplate.convertAndSend("query", objectMapper.writeValueAsString(query));
    }

    @GetMapping("/users")
    public List<Usuario> getUsers(){
        return usuarioRepository.findAll();
    }

    @GetMapping("/pilas")
    public List<Pilacoin> getPilas(){
        return pilacoinRepository.findAll();
    }

    @GetMapping("/mineState")
    public MineState getStates(){
        MineState state = MineState.builder().mineraBloco(MineraService.isMiningBloco())
                .mineraPila(MineraService.isMining()).validaPila(ValidaService.isValidating())
                .validaBloco(ValidaService.isValidatingBloco()).build();
        System.out.println(state);
        return state;
    }

    @GetMapping("/minePila")
    public boolean mineraPila(){
        System.out.println("Alterando mineracao de pila");
        return MineraService.changeMineState();
    }

    @GetMapping("/mineBloco")
    public boolean mineraBloco(){
        System.out.println("Alterando mineracao de bloco");
        return MineraService.changeMiningBlocoState();
    }

    @GetMapping("/validatePila")
    public boolean validaPila(){
        System.out.println("Alterando validacao de pila");
        return ValidaService.changeValidatingState();
    }

    @GetMapping("/validateBloco")
    public boolean validaBloco(){
        System.out.println("Alterando validacao de bloco");
        return ValidaService.changeValidatingBlocoState();
    }

    @PostMapping("/transfer/{quantity}")
    public void tranferirPila(@RequestBody Usuario user, @PathVariable int quantity) throws JsonProcessingException {
        List<Pilacoin> pilas = pilacoinRepository.findByStatus("VALIDO");
        System.out.println(pilas);
        if (pilas.size() < quantity){
            throw new RuntimeException();
        } else {
            ObjectMapper objectMapper = new ObjectMapper();
            for (int i = 0; i < quantity; i++){
                TransferirPilacoin tranferir = TransferirPilacoin.builder().noncePila(pilas.get(i).getNonce())
                        .chaveUsuarioOrigem(PilaUtil.PUBLIC_KEY.getEncoded()).nomeUsuarioOrigem(PilaUtil.USERNAME)
                        .chaveUsuarioDestino(user.getChavePublica()).nomeUsuarioDestino(user.getNome())
                        .dataTransacao(new Date()).build();
                tranferir.setAssinatura(PilaUtil.geraAssinatura(tranferir));
                rabbitTemplate.convertAndSend("transferir-pila", objectMapper.writeValueAsString(tranferir));
                pilacoinRepository.delete(pilas.get(i));
            }
        }
    }

    @GetMapping("/test")
    public void setRabbitTemplate() throws JsonProcessingException {
        ObjectMapper ob = new ObjectMapper();
        rabbitTemplate.convertAndSend("query", ob.writeValueAsString(
                QueryEnvia.builder().idQuery(1).tipoQuery("PILA").nomeUsuario(PilaUtil.USERNAME)
                        .usuarioMinerador(PilaUtil.USERNAME).status("VALIDO").build()
        ));
    }
}
