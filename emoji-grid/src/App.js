import React from 'react';
import logo from './logo.svg';
import './App.css';


const emoji_rows = [
  [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "🥰",
  ],
  [
    "🐐",
    "🐪",
    "🐫",
    "🦙",
    "🦒",
    "🐺",
  ],
  [
    "🍃",
    "🍄",
    "🌰",
    "🦀",
    "🦞",
    "🌪",
  ]
];

const App = () =>
  <div className="App">
    <header className="App-header">
      <div className="emoji-container">
        {emoji_rows.flatMap(row =>
          row.map(e => <span className="emoji">{e}</span>))}
      </div>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
  </div>

export default App;
