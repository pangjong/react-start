import React, { useMemo, useState } from 'react';

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

  const getCount = () => {
    return counterNum;
  }

  const outCount = useMemo(() => getCount, [counterNum]);
  
  const increaseNum = () => {
      setCounterNum(prevCounterNum => prevCounterNum + 1)
  }

  const decreaseNum = () => {
    setCounterNum(prevCounterNum => prevCounterNum - 1)
  }

  return(
    <>
      <h1>{outCount}</h1>
      <button onClick={increaseNum}>+1 </button>
      <button onClick={decreaseNum}>-1</button>
    </>
  );
}


export default Counter;
