import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { coursesState } from './store/atoms/courses';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function ShowAllCourses() {
  const [courses, setCourses] = useRecoilState(coursesState);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const {data} = await axios.get('http://localhost:3000/user/courses', {
        headers: {
          "Content-type":"application/json",
          Authorization:'Bearer '+localStorage.getItem('userToken')
        }
        });
        setCourses(data.courses);
        console.log(data.courses);
      } catch(error) {}
      setLoading(false);
  };

  useEffect( ()=> {
    fetchCourses();
  }, [])

  if (loading) return <><br /><CircularProgress color="secondary" /></>

  return (<div style={{margin:10, display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>{
          courses.map(course => (
            <CourseCard key={course._id} course={course} />
        ))
      }
    </div>);
}

export function CourseCard(props) { 
  const course = props.course;
  return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{width: 300}} ></img>
        <Typography><CurrencyRupeeIcon fontSize='small' /> {course.price}</Typography>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
        {props.admin == undefined && <Button variant="contained" size="large">Buy</Button>}
        </div>
    </Card>
  // <Card sx={{ maxWidth: 345}} style={{margin:10}}>
  //             <CardMedia
  //               component="img"
  //               sx={{ height: 345 }}
  //               image={course.imageLink}
  //               title={course.title}
  //             />
  //             <CardContent>
  //               <Typography gutterBottom variant="h5" component="div">
  //                 {course.title}
  //               </Typography>
  //               <Typography variant="body2" color="text.secondary">
  //                 {course.description}
  //               </Typography>
  //               <Typography>Rs: {course.price}</Typography>
  //             </CardContent>
  //             {
  //               props.admin == undefined &&
  //             (<CardActions>
  //               <Button size="small" variant="contained" color="secondary">Buy</Button>
  //             </CardActions>)
  //             }
  //           </Card>
}