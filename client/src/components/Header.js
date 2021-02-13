import React from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from '../utils/auth';

export default function Header() {
  const history = useHistory();

  const handleOnClick = () => {
    signOut();
    history.push('/signin');
  };

  return (
    <header className="header">
      <button className="signout-button" onClick={handleOnClick}>
        Sair
      </button>
    </header>
  );
}
