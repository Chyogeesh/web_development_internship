import React, { useState, useReducer } from 'react';
import './App.css';

const initialState = { value: 0, history: [], future: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      if (state.value >= 150) return state;
      return {
        ...state,
        value: state.value + 1,
        history: [...state.history, state.value],
        future: []
      };
    case 'decrement':
      if (state.value <= 0) return state;
      return {
        ...state,
        value: state.value - 1,
        history: [...state.history, state.value],
        future: []
      };
    case 'undo':
      if (state.history.length === 0) return state;
      const lastValue = state.history[state.history.length - 1];
      return {
        ...state,
        value: lastValue,
        history: state.history.slice(0, -1),
        future: [state.value, ...state.future]
      };
    case 'redo':
      if (state.future.length === 0) return state;
      const nextValue = state.future[0];
      return {
        ...state,
        value: nextValue,
        history: [...state.history, state.value],
        future: state.future.slice(1)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>Number Control App</h1>
      <div className="controls">
        <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
        <span>{state.value}</span>
        <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${(state.value / 150) * 100}%` }}
        ></div>
      </div>
      <div className="history-controls">
        <button onClick={() => dispatch({ type: 'undo' })} disabled={state.history.length === 0}>Undo</button>
        <button onClick={() => dispatch({ type: 'redo' })} disabled={state.future.length === 0}>Redo</button>
      </div>
    </div>
  );
}

export default App;
