import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react"
import { CourseCard } from "./ShowAllCourses";
import axios from "axios";
import { useRecoilState } from "recoil";
import { coursesState } from "./store/atoms/courses";
import { useNavigate } from "react-router-dom";

export default function AdminCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useRecoilState(coursesState);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const getCourses = async () => {
                const {data} = await axios.get('http://localhost:3000/admin/courses', {
                    headers:{
                        'Content-type':'application/json',
                        authorization:'bearer '+localStorage.getItem('adminToken')
                    }
                });
                if (data.courses) {
                    setCourses(data.courses);
                }
            }
            getCourses();
            setLoading(false);
    }, [])

    if (loading) return <><br /><CircularProgress color="secondary" /></>
    
    return (<div style={{margin:10, display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>{
          courses.map(course => (
            <div key={course._id} onClick={()=>navigate('/adminEdit/'+course._id)}>
            <CourseCard admin={true} course={course} />
            
            </div>
        ))
      }
    </div>);
}