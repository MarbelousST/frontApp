import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [resData, setResData] = useState('');
  const [nombre, setName] = useState('');
  const [fechaNacimiento, setDate] = useState('');
  const [edad, setEdad] = useState(0);
  const misCabeceras = new Headers();
  const miInitGet = {
    method: 'GET',
    headers: misCabeceras,
    mode: 'cors',
    cache: 'default',
  };

  const handleGetApi = (url) => {
    fetch(url, miInitGet)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
      });
  };
  const handlePost = (event) => {
    console.log(event.target);
    fetch('http://104.196.130.222:8080/api/calcularEdad', {
      method: 'POST',
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify({ nombre, fechaNacimiento }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setEdad(data);
      });
  };
  const handleChange = (event) => {
    if (event.target.name === 'nombre') {
      setName(event.target.value);
    } else if (event.target.name === 'date') {
      setDate(event.target.value);
    }
  };

  console.log(edad);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>PoC para el pipeline de cloud</p>
        <a
          className='App-link'
          onClick={() => {
            handleGetApi('http://35.231.28.237:8080/api/v1');
          }}
          rel='noopener noreferrer'
        >
          Backend V1
        </a>
        <a
          className='App-link'
          onClick={() => {
            handleGetApi('http://35.231.28.237:8080/api/v2');
          }}
          rel='noopener noreferrer'
        >
          Backend V2
        </a>

        <form onSubmit={handlePost}>
          <label>
            Name:
            <input
              type='text'
              value={nombre}
              name='nombre'
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha de nacimieento:
            <input
              type='date'
              value={fechaNacimiento}
              name='date'
              onChange={handleChange}
            />
          </label>
          <input type='submit' value='Envíar' />
        </form>
      </header>
    </div>
  );
}

export default App;
