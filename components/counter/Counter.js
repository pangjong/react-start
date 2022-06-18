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
  const [useCallbackTest, SetUseCallbackTest] = useState([]);
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

  ///////// 렌더링 될때마다 함수가 재생성 됨
  // https://ko.reactjs.org/docs/hooks-reference.html#usecallback
  // useMemo 와 비슷하게 사용하는데 의존성배열이 변경되었을때 새로운 함수를 반환한다
  // const memoizedCallback = useCallback(function, deps);

  // 막간의 차이점
  // https://www.daleseo.com/react-hooks-use-callback/
  // useCallback 은 메모이제이션 된 '함수'를 반환하고 useMemo는 메모이제이션된 '값'을 반환
  // useMemo(() => fn, deps) === useCallback(fn, deps)
  const increaseNum = useCallback(() => {
      setCounterNum(prevCounterNum => prevCounterNum + 1)
  }, useCallbackTest);

  const decreaseNum = useCallback(() => {
    setCounterNum(prevCounterNum => prevCounterNum - 1)
  }, useCallbackTest);

  return(
    <div>
      <h1>{counterNum}</h1>
      <button onClick={increaseNum}>+1 </button>
      <button onClick={decreaseNum}>-1</button>
    </div>
  );
}


export default Counter;
