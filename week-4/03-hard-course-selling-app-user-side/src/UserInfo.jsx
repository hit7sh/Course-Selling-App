import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    useEffect(()=> {
        fetch('http://localhost:3000/user/me', {
            method:"GET",
            headers:{Authorization:'bearer '+localStorage.getItem('userToken')}
        }).then((resp)=>{
            console.log(localStorage.getItem('userToken'));
            resp.json().then((data)=>setUsername(data.username));
        });
    }, []);

    if (username == '') return <><br /><CircularProgress color="secondary" /></>;

    return (
        <div>
            <center>
                <Card variant="outlined" style={{width:400, padding:20}}>
                    <Typography variant="h5">username: {username}</Typography>      
                    <br />
                    <br />
                    <Button variant='contained' onClick={()=>navigate('/showPurchase')}>show purchased courses</Button>
                </Card>
            </center>
        </div>
    );
}