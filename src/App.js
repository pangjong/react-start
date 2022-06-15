import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {

  // state = {
  //   first: Math.ceil(Math.random() * 9),
  //   second: Math.ceil(Math.random() * 9),
  //   value: '',
  //   result: '',
  // }

  const [gugudan, setGugudan] = useState({
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: '',
  })
  const inputRef = React.useRef();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    
    if(parseInt(gugudan.value) === gugudan.first * gugudan.second) {
      setGugudan((prevState) => {
        return {
          ...prevState,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          result: `${prevState.value} 정답`,
          value: '',
        }
      });
    } else {
      setGugudan((prevState) => {
        return {
          ...prevState,
          result: `${prevState.value} 오답`,
          value: '',
        }
      });
    }

    inputRef.current.focus();
  };
  
  const onHandleChange = (e) => {
    setGugudan((prevState) => {
      return {
        ...prevState,
        value: e.target.value
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div> {gugudan.first} 곱하기 {gugudan.second} 는 ?</div>
        <form onSubmit={onHandleSubmit}>
          <input ref={inputRef} type="number" value={gugudan.value} onChange={onHandleChange} />
          <button>입력</button>
        </form>
        <div> {gugudan.result}</div>
      </header>
    </div>
  );
}

export default App;
