import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

export function PilasValidados() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/logsMineraPila');
        setResponseData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="content">
      <h1>Pilas Validados</h1>
      {responseData ? (
        responseData.map((pila, index) => (
          <div key={index}>
            <p>Validando pila do(a): {pila.miner}</p>
            <p>{pila.isValid ? 'Valido!' : 'Invalido!'}</p>
          </div>
        ))
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}
