import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

export function BlocosDescobertos() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/logsMineraBloco');
        setResponseData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="content">
      <h1>Blocos Descobertos</h1>
      {responseData ? (
        <>
          <p>Minerou Bloco</p>
          <p>{responseData.hash}</p>
          <p>{responseData.blockNumber}</p>
          <p>{responseData.data}</p>
          <p>Bloco descoberto</p>
        </>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}
