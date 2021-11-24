import React from 'react'
import axios from 'axios';
import useAsynk from '../UseAsynk';
import styled from 'styled-components';

async function getUser(id) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  return response.data;
}

const User = ({ id }) => {
  const [state] = useAsynk(() => getUser(id), [id]); //의존성 배열에 id를 넣어줌으로 인해 id값이 바뀔 때마다 이 함수를 호출하겠다라는 의미입니다.
  const { loading, data: user, error } = state;

    if(loading) return <Container><h1>로딩중이다.</h1></Container>;
    if(error) return <Container>에러발생..</Container>;
    if(!user) return null;

    return (
    <div>
       <h2>{user.username}</h2>
       <p>
         <b>Email :</b> {user.email}
       </p>
    </div>
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

export default User;