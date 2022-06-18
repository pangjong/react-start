import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
// import 와 require의 차이는
// require 는 이전 Node에서 다른 객체를 불러올때 사용하는 문법 단 한줄에 하나씩만
// import 는 es6 에서 새로 추가된 문법으로 여러개를 동시에 불러올때 사용할 수 있다.
// webpack이 컴파일링할때 require는 모듈을 통째로 불러오는 반면에 import 는 필요한것만 불러오고 압축한다는 차이.


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
  // 이렇게 하나의 객체로 묶으면
  // 몇개의 객체만 수정하고싶을때 prevState로 묶거나 하는등이 필요됨

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
    <>
      <div> {gugudan.first} 곱하기 {gugudan.second} 는 ?</div>
        <form onSubmit={onHandleSubmit}>
          <input ref={inputRef} type="number" value={gugudan.value} onChange={onHandleChange} />
          <button>입력</button>
        </form>
      <div> {gugudan.result}</div>
    </>
  );
}

export default App;
