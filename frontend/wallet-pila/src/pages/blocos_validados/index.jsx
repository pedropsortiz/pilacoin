import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

export function BlocosValidados() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/logValidaBloco');
        setResponseData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="content">
      <h1>Blocos Validados</h1>
      {responseData ? (
        <>
          <p>Validando bloco minerado pelo(a): {responseData.miner}</p>
          <p>{responseData.hash}</p>
          <p>Numero do bloco: {responseData.blockNumber}</p>
          <p>{responseData.isValid ? 'Valido!' : 'Invalido!'}</p>
        </>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}
