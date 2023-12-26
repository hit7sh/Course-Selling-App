import { Button, Card, Input } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div>
        <center>
        <Card variant="outlined" style={{width:400, padding:20}}>
            Username - <Input onChange={(e)=>setUsername(e.target.value)}/>
            <br />
            Password - <Input type="password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} />
            <br />
            <br />
            <Button 
            variant="contained"
            color="secondary"
            onClick={()=>{
              fetch('http://localhost:3000/admin/login', {
                method:'POST',
                headers:{"Content-type":"application/json",
                "username":username,
                "password":password}
              }).then((res)=>{
                  res.json().then((data)=>{
                  localStorage.setItem('adminToken', data.token);
                  navigate('/');
                });
              })
            }}
            >Log In (ADMIN) </Button>
        </Card>
    </center>
    </div>
  )
}