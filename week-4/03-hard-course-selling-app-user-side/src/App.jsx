import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css'
import AppBar from './AppBar';
import Login from './login';
import Signup from './Signup';
import Homepage from './Homepage';
import ShowAllCourses from './ShowAllCourses';
import AdminLogin from './AdminLogin';
import AdminCourses from './AdminCourses';
import AdminEdit from './AdminEdit';
import AddCourse from './AddCourse';
import UserInfo from './UserInfo';
import ShowPurchase from './ShowPurchase';
import { RecoilRoot } from 'recoil';

function App() {
 
  return (
    <>
    <RecoilRoot>
      <div>
          <Router>  
            <AppBar></AppBar>
            <br />
            <Routes>
              <Route path="/courses" element={<ShowAllCourses/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route path="/showPurchase" element={<ShowPurchase />} />
              <Route path="/" element={<Homepage/>}/>
              <Route path="/adminLogin" element={<AdminLogin/>}/>
              <Route path="/adminCourses" element={<AdminCourses/>}/>
              <Route path="/adminEdit/:courseId" element={<AdminEdit/>}/>
              <Route path="/addCourse" element={<AddCourse/>}/>
            </Routes>
          </Router>
      </div>
    </RecoilRoot>
    </>
  )
}

export default App
