import io from 'socket.io-client';
import uuidv1 from 'uuid/v1';

import React, { useEffect } from 'react';
import './App.css';
import Listing from './Listing';

const HEROKU_URL = 'https://afternoon-dawn-48814.herokuapp.com/'
const socket = io(HEROKU_URL);

const App = () => {
    useEffect(() => {
        const clientId = uuidv1();
        socket.emit('join', clientId);
   });

  return (
    <div className="App">
      <div className="numerical-lines">
        <h2><Listing/></h2>
      </div>
    </div>
  );
}

export default App;

