import React from 'react'
import axios from 'axios'
import styled from 'styled-components';
import useAsynk from '../UseAsynk';

async function getUsers() { //이게 우리가 만든 커스텀훅인 useAsynK에 매개변수 콜백함수 자리에 들어갈 함수 
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/`);
  return response.data;
}


const UserEx = () => {
    const [state,refetch] = useAsynk(getUsers, [], true);

    const {loading, data:users , error} = state; // 비구조화할당으로 빼준 모습.
    if(loading) return <Container><h1>로딩중이다.</h1></Container>;
    if(error) return <Container>에러발생..</Container>;
    if(!users) return <Container> <button onClick={refetch}>불러오기</button> </Container>

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
    <button onClick={refetch}>data받아라 ~</button>
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
