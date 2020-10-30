import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";



function App() {

  const [repositories, setRepositories] = useState([])

  useEffect( ()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  } , [] )

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `repositorio adicionado ${Date.now()}`,
      url: "http://github.com/...", 
      techs: [ "Node.js", "SQL", "548" ]
    })
    
    const repository = response.data
    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(r => r.id === id);
    const tempRepositories = [...repositories];
    tempRepositories.splice(repositoryIndex, 1);
    setRepositories( tempRepositories )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(rep => 
            <li key={rep.id}>
              <ul>{rep.title}</ul>
              <button onClick={() => handleRemoveRepository(rep.id)}>
                Remover
              </button>
            </li>  
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
