import { PasswordRounded } from '@mui/icons-material';
import { Button, Card, Input, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
    <center>
        <div style={{marginTop:"200px", marginBottom:10}}>
            <Typography variant="h6">Welcome to Todo App, please Sign up below.</Typography>
        </div>
    </center>
    <center>
        <br />
        <Card variant="outlined" style={{width:400, padding:20}}>
            Username - <Input onChange={(e)=>setUsername(e.target.value)}/>
            <br />
            Password - <Input type="password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} />
            <br />
            <br />
            <Button 
            variant="contained"
            onClick={()=>{
              fetch('http://localhost:3000/user/signup', {
                method:'POST',
                body:JSON.stringify({username, password}),
                headers:{"Content-type":"application/json"}
              }).then((res)=>{
                res.json().then((data)=>{
                  localStorage.setItem('userToken', data.token);
                  navigate('/');
                });
              })
            }}
            >Sign up</Button>
        </Card>
    </center>
    </>
  )
}
