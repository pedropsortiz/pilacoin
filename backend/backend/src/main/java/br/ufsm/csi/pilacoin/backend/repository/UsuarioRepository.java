package br.ufsm.csi.pilacoin.backend.repository;

import br.ufsm.csi.pilacoin.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
