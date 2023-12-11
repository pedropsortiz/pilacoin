package br.ufsm.csi.pilacoin.backend.service;

import br.ufsm.csi.pilacoin.backend.model.Mensagem;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RabbitService {
    private final ValidaService validaService;
    private final MineraService mineraService;
    private final QueryService queryService;
    private List<Mensagem> msgs = new ArrayList<>();

    @Autowired
    public RabbitService(ValidaService validaService, MineraService mineraService, QueryService queryService) {
        this.validaService = validaService;
        this.mineraService = mineraService;
        this.queryService = queryService;

    }

    @RabbitListener(queues = "descobre-bloco")
    public void descobreBloco(@Payload String bloco){
        System.out.println("-=+=".repeat(10)+"\nBloco descoberto\n"+"-=+=".repeat(10));
        mineraService.mineraBloco(bloco);
    }

    @RabbitListener(queues = "pila-minerado")
    public void validaPila(@Payload String pila){
        validaService.validaPila(pila);
    }

    @RabbitListener(queues = "bloco-minerado")
    public void validaBloco(@Payload String bloco){
        validaService.validaBloco(bloco);
    }

    //@RabbitListener(queues = "pedromarina")
    //public void msgs(@Payload String msg) {
    //    System.out.println("-=+=".repeat(10)+"\n"+msg+"\n"+"-=+=".repeat(10));
    //}zzz

    @RabbitListener(queues = "report")
    public void report(@Payload String report){
        System.out.println(report);
    }

    @RabbitListener(queues = "pedromarina-query")
    public void resultadoQuery(@Payload String resultado){
        System.out.println(resultado);
        queryService.recebeQuery(resultado);
    }

    @RabbitListener(queues = "clients-errors")
    public void errors(@Payload String error){
        System.out.println("Error: "+error);
    }
}
