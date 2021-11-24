//여기 페이지에서 커스텀 훅을 작성합니다.
import { useEffect, useReducer,useCallback } from "react";

const reducerEx = (state, action ) => {
  switch(action.type) {
    case "LOADING" : 
      return {
        loading : true,
        data: null,
        error : null,
      }
    case "SUCCESS" : 
      return {
        loading: false,
        data: action.data,
        error: null,
      }
    case "ERROR" : 
      return {
        loading: false,
        data:null,
        error: action.error,
      }
      default :
        throw new Error(`Unhandled action type : ${action.type}`); 
  }
}

const useAsynk = (callback, deps = [], skip = false) => {
  const [state, dispatch] = useReducer(reducerEx,{
    loading: false,
    data: null,
    error:null,
  });
  
  const fetchData = useCallback(async() => { //useCallback은 꼭 사용할 필요는 없다. 생략해도 무방합니다.
    dispatch({ type: "LOADING" });
    try{
      const data = await callback()
      dispatch({ type: "SUCCESS", data })
    } catch (e) {
      dispatch({ type: "ERROR" , error : e})
    }

  }, [callback]);

    useEffect(() => {
      if(skip) {
        return;
      }
      fetchData();
      //eslint-disable-next-line
    } ,deps)

    return [state, fetchData]
}

export default useAsynk;