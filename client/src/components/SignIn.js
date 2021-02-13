import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../api';

export default function SignIn() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isAuthenticated = await API.signin(userName, password);

    if (isAuthenticated) {
      history.push('/');
    }
  };

  return (
    <div className="sign-in-form">
      <p>Entrar</p>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Entrar</button>
      </form>
      <Link to="/signup">Criar conta</Link>
    </div>
  );
}
