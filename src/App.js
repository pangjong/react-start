import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [gugudan, setGugudan] = useState({
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: '',
  })

  const onHandleSubmit = (e) => {
    e.preventDefault();
    
    if(parseInt(gugudan.value) === gugudan.first * gugudan.second) {
      setGugudan((prevState) => {
        return {
          ...prevState,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          result: `${gugudan.value} 정답`,
          value: '',
        }
      });
    } else {
      setGugudan((prevState) => {
        return {
          ...prevState,
          result: `${gugudan.value} 오답`,
          value: '',
        }
      });
    }
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
          <input type="number" value={gugudan.value} onChange={onHandleChange} />
          <button>입력</button>
        </form>
        <div> {gugudan.result}</div>
      </header>
    </div>
  );
}

export default App;
