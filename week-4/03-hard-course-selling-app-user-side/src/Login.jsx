import { Button, Card, Input, Typography } from '@mui/material';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  return (
    <>
    <center>
        <div style={{marginTop:"200px", marginBottom:10}}>
            <Typography variant="h6">Welcome to Todo App, please log in below.</Typography>
        </div>
    </center>
    <center>
        <Card variant="outlined" style={{width:400, padding:20}}>
            Username - <Input onChange={(e)=>setUsername(e.target.value)}/>
            <br />
            Password - <Input type="password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} />
            <br />
            <br />
            <Button 
            variant="contained"
            onClick={()=>{
              fetch('http://localhost:3000/user/login', {
                method:'POST',
                headers:{"Content-type":"application/json",
                "username":username,
                "password":password}
              }).then((res)=>{
                res.json().then((data)=>{
                  localStorage.setItem('userToken', data.token);
                  navigate('/');
                });
              })
            }}
            >Log In</Button>
        </Card>
    </center>
    </>
  )
}

export default Login;