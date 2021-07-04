// useAsync 커스텀 Hook 만들어서 사용하기
/*
데이터를 요청해야 할 때마다 리듀서를 작성하는 것은 
번거로운 일 입니다. 
매번 반복되는 코드를 작성하는 대신에, 
커스텀 Hook 을 만들어서 
요청 상태 관리 로직을 쉽게 재사용하는 방법을 알아봅시다.
*/

import { useReducer, useEffect } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

/*
 useAsync함수는 두가지 파라미터를 받아온다,
 첫번째 파리미터 : API요청을 시작하는 함수,
 두번째 파라미터 : deps
  -> 이 deps는 useEffect의 deps로 설정된다.

  **데이터 나중에 불러오기
  Users 컴포넌트는 
  컴포넌트가 처음 렌더링 되는 시점부터 
  API 를 요청하고 있습니다. 
   만약에 특정 버튼을 눌렀을 때만 API 를 요청하고 싶다면, 
   어떻게 해야할까요? 
    세번째 파라미터 skip 을 넣어보세요.

  세번째 파라미터 : 
  skip 파라미터의 기본 값을 false 로 지정하고, 
  만약 이 값이 true 라면 useEffect 에서 
  아무런 작업도 하지 않도록 설정해주었습니다.
*/

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchUserData = async () => {
    dispatch({
      type: 'LOADING',
    });
    try {
      const data = await callback(); //
      dispatch({ type: 'SUCCESS', data: data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  }; //fetchUserData

  useEffect(() => {
    /*
    skip 파라미터의 기본 값을 false 로 지정하고, 
    만약 이 값이 true 라면 useEffect 에서 아무런 작업도 하지 않도록
     설정해주었습니다.
    */
    if (skip) return;
    fetchUserData();
    //deps에 줄생기는거 없애기
    //eslint설정을 다음 줄에서만 비활성화
    //eslint-disable-next-line
  }, deps);

  return [state, fetchUserData];
}

export default useAsync;
