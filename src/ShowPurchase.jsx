import { useEffect, useState } from "react";
import { CourseCard } from "./ShowAllCourses";
import { CircularProgress } from "@mui/material";

export default function ShowPurchase () {
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetch('http://localhost:3000/user/purchasedCourses', {
            method:"GET",
            headers:{authorization:'bearer '+localStorage.getItem('userToken')}
        }).then((res)=>{
            setLoading(false);
            res.json().then((data)=>setPurchasedCourses(data.purchasedCourses));
        });
    }, []);


    if (loading) return <><br /><CircularProgress color="secondary" /></>
    return (
    <div style={{margin:10, display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>{
          purchasedCourses.map(course => (
            <CourseCard key={course._id} course={course} />
        ))
      }
    </div>
    );
}