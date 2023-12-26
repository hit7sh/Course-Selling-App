import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import { adminState } from './store/atoms/admin';


export default function AppBar() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(userState);
  const [adminUsername, setAdminUsername] = useRecoilState(adminState);
  const [loading, setLoading] = useState(true);

  const init = async () => {
    try {
      const resp = await axios.get('http://localhost:3000/user/me',{
              headers:{
                "authorization":"Bearer "+localStorage.getItem('userToken')
              }});
      if (resp.data.username) {
        setUsername(resp.data.username);
      }
    } catch(error){}
    try {
      const resp = await axios.get('http://localhost:3000/admin/me',{
              headers:{
                "authorization":"Bearer "+localStorage.getItem('adminToken')
              }});
      if (resp.data.username) {
        setAdminUsername(resp.data.username);
      }
    } catch(error){}
    setLoading(false);
  };
  useEffect(()=>{
    init();
  },
   []);

    if (loading) return <><br /><CircularProgress color="secondary" /></>
  
  return (  
    <div style={{
        display:"flex",
        justifyContent:"space-between",
        background:"rgb(200, 150, 255)",
        padding:5
    }}>
        <div style={{display:"flex"}} onClick={()=>navigate("/")}>
        <LocalLibraryIcon fontSize="large" />
        <Typography variant="h6" style={{marginLeft:7}}><b>Courses App</b></Typography>
        </div>
        <div >
          {adminUsername?<AdminLoggedInBar username={adminUsername}/>
          :(username?(<UserLoggedInBar username={username}/>):<NotLoggedInBar/>)
          }
        </div>
      </div>  
      )
}


function UserLoggedInBar(props) {
  const navigate = useNavigate();

  return <div style={{display:"flex"}}>
            <Button variant='contained' color='success' style={{marginRight:10}} onClick={()=>{
              navigate('/courses');
            }}> show courses</Button>
            <div style={{display:"flex"}} onClick={()=>navigate('/userinfo')}>
            <Typography variant="h6">{props.username}</Typography>
            <AccountCircleIcon fontSize="large" style={{marginRight:10}} />
            </div>
            <Button variant="contained" color="error" onClick={()=>{
              localStorage.setItem('userToken', '');
              navigate('/');}
            }>Log out</Button>
          </div>
}

function NotLoggedInBar() {
  const navigate = useNavigate();

  return <div>
            <Button variant="contained" style={{marginRight:10}} color="secondary" onClick={()=>navigate('/adminLogin')}>
            ADMIN (LogIn)</Button>
            <Button variant="contained" style={{marginRight:10}} onClick={()=>navigate('/login')}>
            log in</Button>
          <Button variant="contained" onClick={()=>navigate('/signup')}>Sign up</Button>
          </div>
}

function AdminLoggedInBar(props) {
  const navigate = useNavigate();
  return <div style={{display:"flex"}}>
            <Button variant='contained' color='success' style={{marginRight:10}} onClick={()=>{
              navigate('/addCourse');
            }}> Add Course</Button>
            <Button variant='contained' color='secondary' style={{marginRight:10}} onClick={()=>{
              navigate('/adminCourses');
            }}> show courses</Button>
            <Typography variant="h6" color="blueviolet">{props.username}</Typography>
            <AccountCircleIcon fontSize="large" style={{marginRight:10}} />
            <Button variant="contained" color="error" onClick={()=>{
            localStorage.setItem('adminToken', '');
            window.location = '/'; }}>Log out</Button>
          </div>
}