package br.ufsm.csi.pilacoin.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MineState {
    private boolean mineraPila;
    private boolean mineraBloco;
    private boolean validaPila;
    private boolean validaBloco;
}
