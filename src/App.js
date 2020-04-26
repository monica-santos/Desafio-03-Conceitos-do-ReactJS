import React, { useState, useEffect } from 'react'

import './styles.css'
import './services/api'
import api from './services/api'
function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('repositories').then((res) => {
      setRepos(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const repo = {
      id: '123',
      url: 'https://github.com/josepholiveira',
      title: 'Desafio ReactJS',
      techs: ['React', 'Node.js']
    }
    try {
      const response = await api.post('repositories', repo)
      setRepos([...repos, response.data])
    } catch (err) {
      console.error('Could not create repository', err)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      setRepos([...repos.filter((repo) => repo.id !== id)])
    } catch (err) {
      console.error('Could not delete repository', err)
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
