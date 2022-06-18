import React, { useEffect, useMemo, useState } from 'react';

// TODO sCU vs memo vs pureComponent
// https://study-ihl.tistory.com/216
// 필요 유무에 따라 렌더링을 재정의 해야할만큼 = sCU
// 가벼운 렌더링 재정의 = pureComponent
// --- 위는 Class 형 정의
//  React.memo는 PureComponent와 달리 state 변화에는 영향받지 않는다.  = memo
// 함수형 정의

// sCU 예시 코드 현재 counterNum vs nextCounterNum 비교 true 렌더링 false 멈춰
// shouldComponentUpdate(nextProps, nextState) {
//   return counterNum !== nextState.counterNum;
// };


function Counter() {
  const [counterNum, setCounterNum] = useState(0);

  //------ memo
  // const getCount = () => {
  //   return counterNum;
  // }

  //const outCount = useMemo(() => getCount, [counterNum]);
  //---------- memo??

  //------- useEffect
  // useEffect(() => {
  //   console.log(counterNum)
  // }, [counterNum]);

  //-------- useEffect
  const increaseNum = () => {
      setCounterNum(prevCounterNum => prevCounterNum + 1)
  }

  const decreaseNum = () => {
    setCounterNum(prevCounterNum => prevCounterNum - 1)
  }

  return(
    <div>
      <h1>{counterNum}</h1>
      <button onClick={increaseNum}>+1 </button>
      <button onClick={decreaseNum}>-1</button>
    </div>
  );
}


export default Counter;
