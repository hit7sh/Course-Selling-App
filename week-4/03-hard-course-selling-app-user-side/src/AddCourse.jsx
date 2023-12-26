import { Button, Card, Input, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

export default function AddCourse() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageLink, setImageLink] = useState('');

    return (<>
    <center>
        <div style={{marginTop:"20px", marginBottom:10}}>
            <Typography variant="h6">Enter the fields below and click '+' button to add course.</Typography>
        </div>
    </center>
    <center>
        <Card variant="outlined" style={{width:400, padding:20}}>
            <TextField required label="Title" variant="outlined" onChange={(e)=>setTitle(e.target.value)} />
            <br />
            <br />
            <TextField required label="Description" multiline variant="filled" onChange={(e)=>setDescription(e.target.value)} />

            <br />
            <br />
            <TextField required type="number" label="Price" onChange={(e)=>setPrice(e.target.value)}/>
            <br />
            <br />
            <TextField required multiline label="Image Link" variant="outlined" onChange={(e)=>setImageLink(e.target.value)}/>
            <br />
            <br />
            <Button 
            variant="contained"
            onClick={async ()=>{
              const {data} = await axios.post('http://localhost:3000/admin/courses',
              {title, description, price, imageLink},
              {
                headers:{
                    "Content-type":"application/json",
                    authorization:'bearer '+localStorage.getItem('adminToken')
                }},
              );
              alert(JSON.stringify(data));
            }}
            ><AddIcon fontSize="large"/></Button>
        </Card>
    </center>
    </>);
}