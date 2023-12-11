import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

export function PilasValidacao() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/logsValidaPila');
        setResponseData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchData();
  }, []); 
  
  return (
    <div className="content">
      <h1>Pilas em Validação</h1>
      {responseData ? (
        responseData.map((pila, index) => (
          <div key={index}>
            <p>Pila Minerado em: {pila.tentativas} tentativas</p>
          </div>
        ))
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}
