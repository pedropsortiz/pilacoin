package br.ufsm.csi.pilacoin.backend.service;

import br.ufsm.csi.pilacoin.backend.model.Bloco;
import br.ufsm.csi.pilacoin.backend.model.Pilacoin;
import br.ufsm.csi.pilacoin.backend.model.QueryRecebe;
import br.ufsm.csi.pilacoin.backend.model.Transacao;
import br.ufsm.csi.pilacoin.backend.repository.PilacoinRepository;
import br.ufsm.csi.pilacoin.backend.repository.UsuarioRepository;
import br.ufsm.csi.pilacoin.backend.util.PilaUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class QueryService {
    private final UsuarioRepository usuarioRepository;
    private final PilacoinRepository pilacoinRepository;

    public QueryService(UsuarioRepository usuarioRepository, PilacoinRepository pilacoinRepository) {
        this.usuarioRepository = usuarioRepository;
        this.pilacoinRepository = pilacoinRepository;
    }

    @SneakyThrows
    public void recebeQuery(String queryStr){
        ObjectMapper objectMapper = new ObjectMapper();
        QueryRecebe query = objectMapper.readValue(queryStr, QueryRecebe.class);
        if (query.getPilasResult() != null){
            for (Pilacoin pila: query.getPilasResult()){
                if (Arrays.equals(pila.getChaveCriador(), PilaUtil.PUBLIC_KEY.getEncoded()) && (pila.getTransacoes() == null || pila.getTransacoes().size() <= 1)){
                    pilacoinRepository.save(pila);
                } else if (pila.getTransacoes() != null && !pila.getTransacoes().isEmpty()){
                    Transacao transacao = pila.getTransacoes().get(pila.getTransacoes().size() - 1);
                    if (Arrays.equals(transacao.getChaveUsuarioDestino(), PilaUtil.PUBLIC_KEY.getEncoded())){
                        pilacoinRepository.save(pila);
                    } else if (Arrays.equals(transacao.getChaveUsuarioOrigem(), PilaUtil.PUBLIC_KEY.getEncoded())){
                        pilacoinRepository.delete(pila);
                    }
                }
            }
        } else if (query.getUsuariosResult() != null) {
            usuarioRepository.saveAll(query.getUsuariosResult());
        } else if (query.getBlocosResult() != null){
            for (Bloco bloco: query.getBlocosResult()){
                for (Transacao transacao: bloco.getTransacoes()){
                    if (transacao.getChaveUsuarioDestino() != null && Arrays.equals(transacao.getChaveUsuarioDestino(), PilaUtil.PUBLIC_KEY.getEncoded())){
                        pilacoinRepository.save(Pilacoin.builder().nonce(transacao.getNoncePila()).status("VALIDO").build());
                    } else if (transacao.getChaveUsuarioOrigem() != null && Arrays.equals(transacao.getChaveUsuarioOrigem(), PilaUtil.PUBLIC_KEY.getEncoded())){
                        pilacoinRepository.delete(Pilacoin.builder().nonce(transacao.getNoncePila()).status("VALIDO").build());
                    }
                }
            }
        }
    }
}
