import axios from 'axios';
import React,{useState, useEffect} from 'react'
import styled from 'styled-components'

const UserInfo = () => {

  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const data = async() => {
    try {
      setUser(null);
      setError(null);
      setLoading(true);
      
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/`
      );
      setUser(response.data)
    } catch (e) {
      console.log(e.response.status)
      setError(e)
    }
    setLoading(false);
  };

  useEffect(() => {

    data();
  },[]);

  if(loading) return <Container><h1>Loading....</h1></Container>;
  if(error) return <Container>삐용삐용 에러발생</Container>;
  if(!user) return null

  

  return (
    <Container>
      <h1> 혼자 연습해보는 API 통신 예제 </h1>
      <div>
        {user.map(data => (
          <Box>
          <div>{data.name}</div>
          <div>
          <div>{data.email}</div>
          <div>lived in{data.address.city}</div>
          </div>
          </Box>
        ))}
      </div>
      <button onClick={()=> data()}>REGET DATA</button>
    </Container>
      
  )
}

const Container = styled.div`
 border: 1px solid black;
  margin: 0 auto;
  margin-top: 50px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-between;             
  width: 500px;

  button {
    width: 100%;
    padding: 10px;
  }
`;




const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-evenly;
  border:1px solid black;
  margin: 10px 0px;
  padding: 15px;

`;

export default UserInfo