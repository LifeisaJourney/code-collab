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
        return () => {
            socket.off('message');
        };
    });

    const handleMessageReceived = (message) => {
        console.log(message);
    };

  return (
    <div className="App">
      <div className="numerical-lines font-changes">
        <h2><Listing/></h2>
      </div>
      <div className="code-area font-changes">
        <h2>test</h2>
      </div>
    </div>
  );
}

export default App;

