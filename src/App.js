import io from 'socket.io-client';

import React, { useEffect, useReducer } from 'react';
import './App.css';
import Listing from './Listing';

const HEROKU_URL = 'https://afternoon-dawn-48814.herokuapp.com/'
const socket = io(HEROKU_URL);

const getInitialState = () => ({});

const reducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_LINE':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const App = () => {
    useEffect(() => {
        socket.on('message', handleMessageReceived);
        return () => {
            socket.off('message');
        };
    });

    const [state, dispatch] = useReducer(reducer, getInitialState());

    const setLine = (lineNumber, value) => {
        dispatch({
            type: 'UPLOAD_LINE',
            payload: {
                [lineNumber]: value
            }
        });
    };

    const updateLine = (lineNumber, value) => {
        const message = { [lineNumber]: value };
        setLine(lineNumber, value);
        socket.emit('message', message);
    };

    const handleMessageReceived = (message) => {
        setLine(message.lineNumber, message.value);
    };

  return (
    <div className="App">
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

