import React,{useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components';

const Users = () => {
  const [ users, setUsers ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async() => {
    try {
      setUsers(null);
      setError(null);
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/`
      );
      setUsers(response.data)
    } catch (e) {
      console.log(e.response.status)
      setError(e)
    }
    setLoading(false);
  };

  useEffect(() => {
    
    fetchUsers();
  },[]);

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

export default Users
