import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

export function BlocosValidados() {
  const [responseData, setResponseData] = useState(null);

<<<<<<< HEAD
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
=======
    return (
        <div className="content">
            <h1>Blocos Validados</h1>
            Validando bloco minerado pelo(a): iris_augusto<br/>
            9537269629856648250451285778281024414972490165930051618004409463251537
            110427941548649020598956093796432407239217743554726184882600387580788735<br/>
            Numero do bloco: 17336<br/>
            Valido!<br/>
        </div>
    );
}
>>>>>>> bf3c0636e4a1578c7768c464dab83f55b6ef82ae
