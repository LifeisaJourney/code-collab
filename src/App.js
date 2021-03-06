import io from 'socket.io-client';
import debounce from 'lodash/debounce';

import React, { useEffect, useReducer } from 'react';
import './App.css';
import Listing from './Listing';

const HEROKU_URL = 'https://afternoon-dawn-48814.herokuapp.com/'
const socket = io(HEROKU_URL);

const ActionType = {
    UPDATE_LINE: 'UPDATE_LINE'
};
const getInitialState = () => ({});

const reducer = (state, action) => {
    switch(action.type) {
        case ActionType.UPDATE_LINE:
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
            type: ActionType.UPDATE_LINE,
            payload: {
                [lineNumber]: value
            }
        });
    };

    const debouncedMessageEmitter = debounce((message) => {
        socket.emit('message', message);
    });

    const updateLine = (lineNumber, value) => {
        const message = { [lineNumber]: value };
        setLine(lineNumber, value);
        debouncedMessageEmitter(message);
    };

    const handleMessageReceived = (message) => {
        const lineNumber = Object.keys(message)[0];
        if (lineNumber) {
            setLine(lineNumber, message[lineNumber]);
        }
    };

  return (
    <div className="App">
      <div className="numerical-lines font-changes">
        <h2><Listing lineState={state} updateLine={updateLine} /></h2>
      </div>
      {/* <div className="code-area font-changes">
        <h2></h2>
      </div> */}
    </div>
  );
}

export default App;

