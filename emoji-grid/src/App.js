import React from 'react';
import logo from './logo.svg';
import './App.css';

const emojis_per_category = 10;

const initialState = {
  spinning_emojis: {},
  emoji_rows: [],
  emoji_state: {}
};

const states =  [
  "none",
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shakeX",
  "shakeY",
  "headShake",
  "swing",
  "tada",
  "wobble",
  "jello",
  "heartBeat",
];

function reducer(state, cmd) {
  switch (cmd.type) {
    case 'next_emoji_state':
      return {
        ...state,
        emoji_state: { 
            ...state.emoji_state,
            [cmd.emoji]: (state.emoji_state[cmd.emoji] + 1 || 1)
          }
      };
    case 'toggle_emoji_spin':
      return {
        ...state,
        spinning_emojis: { 
            ...state.spinning_emojis,
            [cmd.emoji]: !state.spinning_emojis[cmd.emoji]
          }
        };
    case 'init_emoji_state':
      return {
        ...state,
        emoji_state: cmd.state
      };
    case 'init_emoji_rows':
      return {
        ...state,
        emoji_rows: cmd.emoji_rows
      };
    default:
      throw new Error();
  }
}


const App = () => {
  const [state, dispatch] = 
    React.useReducer(reducer,  initialState);
    console.log('state',state);

  React.useEffect(() => {
    let state = JSON.parse(localStorage.getItem('emoji_state')) || {};
    dispatch({type:'init_emoji_state', state });
  },[]);

  React.useEffect(() => {
    localStorage.setItem('emoji_state', JSON.stringify(state.emoji_state));
  },[state.emoji_state]);

  React.useEffect(
    () => {
      fetch('emojis.json').then(res => res.json())
      .then(emojis => {
        var emoji_rows = Object.keys(emojis).map(k => emojis[k].slice(0,emojis_per_category));
        dispatch({type:'init_emoji_rows', emoji_rows });
      })
      //const subscription = props.source.subscribe();
      return () => {
        //subscription.unsubscribe();
      };
    },
    [],
  );

  const emojiClass = e => {
    let i = state.emoji_state[e.char];
    if(i === undefined){
      i = 0;
    }
    return states[i % states.length];
  };

  return <div className="App">
      <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
    <header className="App-header">
      <div className="emoji-container">
        {state.emoji_rows.flatMap(row =>
          row.map(e => 
          <span key={e.char}
            className="emoji"
            style={{animation: emojiClass(e) + ' infinite 2s'}}
            onClick={() => dispatch({type: 'next_emoji_state', emoji: e.char})}
            title={e.name}
          >{e.char}{state[e.char]}</span>))}
      </div>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
  </div>
};

export default App;
