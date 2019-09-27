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
        socket.on('message', handleMessageReceived);
   });

    const handleMessageReceived = (message) => {
        console.log(message);
    };

    const handleClick = () => {
        socket.emit('message', 'Test!');
    };

  return (
    <div className="App">
      <button onClick={handleClick}>Click</button>

      <div className="numerical-lines">
        <h2><Listing/></h2>
      </div>
      <div className="code-area">
        <h2>test</h2>
      </div>
    </div>
  );
}

export default App;

