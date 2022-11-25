import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

export const Nav = ({ libraryOpen, setLibraryOpen }) => {
  return (
    <nav>
      <h1>Tunes</h1>
      <button onClick={() => setLibraryOpen(!libraryOpen)}>
        <h2>Library</h2>
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};
