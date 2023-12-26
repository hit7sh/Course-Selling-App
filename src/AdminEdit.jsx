import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CourseCard } from "./ShowAllCourses";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Button, Card, Input, TextField, TextareaAutosize, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { coursesState } from "./store/atoms/courses";
import { useRecoilState } from "recoil";

export default function AdminEdit() {
    const navigate = useNavigate();
    const {courseId} = useParams();
    const [courses, setCourses] = useRecoilState(coursesState);
    const idx = courses.findIndex(x=> x._id == courseId);
    const [course, setCourse] = useState(courses[idx]);
    
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [price, setPrice] = useState(course.price);
    const [imageLink, setImageLink] = useState(course.imageLink);
    
    return (<div style={{display:'flex', margin:20, padding:20}}>
        <CourseCard admin={true} course={course}/>
    <center>
        <Card variant="outlined" style={{width:500, padding:20}}>
            <center style={{color:"red"}}>EDIT</center>
            <br />
            <TextField required value={title} label="Title" variant="outlined" onChange={(e)=>setTitle(e.target.value)} />
            <br />
            <br />
            <TextField required value={description} label="Description" multiline variant="filled" onChange={(e)=>setDescription(e.target.value)} />

            <br />
            <br />
            <TextField required value={price} type="number" label="Price" onChange={(e)=>setPrice(e.target.value)}/>
            <br />
            <br />
            <TextField required value={imageLink} multiline label="Image Link" variant="outlined" onChange={(e)=>setImageLink(e.target.value)}/>
            <br />
            <br />
            <Button 
            variant="contained"
            onClick={()=>{
              fetch('http://localhost:3000/admin/courses/'+courseId, {
                method:'PUT',
                headers:{
                    "Content-type":"application/json",
                    authorization:'bearer '+localStorage.getItem('adminToken')
                },
                body:JSON.stringify({title, description, price, imageLink})
              }).then((res)=>{
                res.json().then((data)=>{
                    setCourse(x => { return {...x, title, description, price, imageLink}});
                    setCourses(x => { x[idx] = course; return x;});
                });
              })
            }}
            ><EditIcon fontSize="large"/></Button>
            <br />
            <br />
            <br />
            <Button 
            variant="contained" 
            color="error" 
            fontSize="large"
            onClick={()=>{
                fetch('http://localhost:3000/admin/courses/'+courseId,
                {
                    method:"DELETE",
                    headers:{authorization:'bearer '+localStorage.getItem('adminToken')},
                }).then((res) => {
                    alert("Course Deleted!");
                    navigate('/adminCourses');
                });
            }}
            >
                Delete course<DeleteIcon/></Button>
        </Card>
    </center>
    </div>)
}