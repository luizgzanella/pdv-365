import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import API from '../api';

export default function SignUp() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const status = await API.signup(userName, name, password);

    if (status === 'success') {
      const isAuthenticated = await API.signin(userName, password);

      if (isAuthenticated) {
        history.push('/');
      }
    }
  };

  return (
    <div className="sign-in-form">
      <p>Registrar</p>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Registrar</button>
      </form>

      <Link to="/signin">Voltar</Link>
    </div>
  );
}
