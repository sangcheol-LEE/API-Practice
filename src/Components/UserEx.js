import React,{ useEffect, useReducer } from 'react'
import axios from 'axios'
import styled from 'styled-components';

// LOADING, SUCCESS, ERROR 등 3가지 엑션을 관리해 줄 예정
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

const UserEx = () => {

  const [state, dispatch] = useReducer(reducerEx, {
    loading: false,
    data: null,
    error: null,
  }) // 초기값 설정하는 거 잊지마셈

  const fetchUsers = async() => {
    dispatch({ type:"LOADING" })
    try {
          const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/`
      );
      dispatch({ type:'SUCCESS', data: response.data })
    } catch (e) {
      dispatch({ type:'ERROR', error : e });
    }
  };

  useEffect(() => {
     fetchUsers();
  },[]);

    const {loading, data:users , error} = state; // 비구조화할당으로 빼준 모습.
    if(loading) return <Container><h1>로딩중이다.</h1></Container>;
    if(error) return <Container>에러발생..</Container>;
    if(!users) return null

  return (
    <Container>
    <h1>기본적인 API 통신 예제</h1>
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
    <button onClick={() => fetchUsers()}>data받아라 ~</button>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid black;
  margin: 0 auto;
  margin-top: 100px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 500px;

  button {
    width: 100%;
    padding: 10px;
  }
`;

export default UserEx;
