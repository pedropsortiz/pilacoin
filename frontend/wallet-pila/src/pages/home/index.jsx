import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./style.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";

Modal.setAppElement("#root");

export function Home() {
  const [pilasData, setPilasData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [selectedPila, setSelectedPila] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(BACKEND_URL + "pilas")
      .then(function (response) {
        setPilasData(response.data);
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  }, []); 

  const handleTransfer = async (pila) => {
    try {
      const selectedPila = pila;
    } catch (error) {
      console.log("Error fetching pila: " + error);
    }

    try {
      const usersResponse = await axios.get(BACKEND_URL + "users");
      setUsersData(usersResponse.data);
    } catch (error) {
      console.log("Error fetching users: " + error);
    }

    setIsModalOpen(true);
  };

  const handleUserNameClick = (id) => {
    if (selectedUserId === id) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(id);
    }
  };

  const handleTransferFinal = () => {
    if (selectedUserId !== null) {
      const selectedUser = usersData.find((user) => user.id === selectedUserId);
  
      // Criar um objeto que será enviado como corpo da solicitação
      const requestBody = {
        user: selectedUser,
      };
  
      // Fazer a solicitação Axios
      axios.post("http://localhost:8080/transfer/1", requestBody)
        .then((response) => {
          // Lógica para lidar com a resposta da solicitação
          console.log("Resposta da solicitação:", response.data);
        })
        .catch((error) => {
          console.error("Erro na solicitação:", error);
        });
    } else {
      console.log("Nenhum usuário selecionado para transferência.");
    }
  
    console.log("Transferência finalizada");
    closeModal();
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPila(null);
    setSelectedUserId(null);
  };

  return (
    <div className="content">
      <h1>Pilas na sua Wallet</h1>
      <ul>
        {pilasData.map((pila) => (
          <li key={pila.nonce}>
            <p>Nonce: {pila.nonce}</p>
            <p>Status: {pila.status}</p>
            <button
              onClick={() => handleTransfer(pila)}
              disabled={pila.status === 'AG_VALIDACAO'}
            >
              Transferir
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes da Transferência"
      >
        <h2>Detalhes da Transferência</h2>
        {selectedPila && (
          <div>
            <p>Nonce do Pilacoin: {selectedPila.nonce}</p>
            <p>Status do Pilacoin: {selectedPila.status}</p>
          </div>
        )}
        <h3>Lista de Usuários</h3>
        <ul className="flex flex-row flex-wrap gap-2">
          {usersData.map((user) => (
            <button
              key={user.id}
              className={`p-2 border rounded hover:bg-gold hover:text-black-primary ${
                selectedUserId === user.id ? 'bg-neutral-700' : ''
              }`}
              onClick={() => handleUserNameClick(user.id)}
              disabled={selectedUserId !== null && selectedUserId !== user.id}
            >
              {user.nome}
            </button>
          ))}
        </ul>
        {selectedUserId && (
          <p>Usuário selecionado para transferência: {usersData.find((user) => user.id === selectedUserId)?.nome}</p>
        )}
        <button onClick={handleTransferFinal} disabled={selectedPila?.status === 'AG_VALIDACAO' || !selectedUserId}>
          Transferir
        </button>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
}
