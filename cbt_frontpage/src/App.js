import { Routes, /*useNavigate,*/  Route } from 'react-router-dom'
// import NoUserHeader from './Components/NoUserHeader';
import Header from './Components/Header';
import Login from './Components/Login';
import Footer from './Components/Footer';
import CreateAcct from './Components/CreateAcct';
import Home from './Components/Home';
import NotFound from './NotFound';
import Corrections from './Components/Corrections';
import User from './Components/User'
import Course from './Components/Course';
import { useAuthContext } from './hooks/useAuthContext';
import Users from './Admin/Users';
import Adhome from './Admin/Adhome';
import Adheader from './Admin/Adheader';
import Adcourses from './Admin/Adcourses';
import Adassessments from './Admin/Adassessments';

function App() {
  const { user } = useAuthContext();

  // const navigate = useNavigate();

  if (user) {
    var dUser = JSON.parse(user)
    if (dUser.Role === "Admin") {
      // navigate("/Admin")
      var path = '/admin'

    } else if (dUser.Role === "User") {
      // navigate("/")
      var nav = '/'
    }
  }

  // console.log(dUser);

  return (
    // All should be protected except login and register
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          {/* Logged Out User Landing page */}
          {/* <Route path='Login/' element={<NoUserHeader />}> */}
          <Route path='Login/' element={<Login />} />
          <Route path='CreateAcct/' element={<CreateAcct />} />
          {/* </Route> */}


          {/* Admin Landing page */}
          <Route path={path} element={user && dUser.Role === "Admin" ? <Adheader /> : <Login />}>
            <Route path={path} element={user && dUser.Role === "Admin" ? <Adhome /> : <Login />} />
            <Route path={path + 'Users'} element={user && dUser.Role === "Admin" ? <Users /> : <Login />} />
            <Route path='/admin/courses' element={user && dUser.Role === "Admin" ? <Adcourses /> : <Login />} />
            <Route path='/admin/assessments' element={user && dUser.Role === "Admin" ? <Adassessments /> : <Login />} />
            {/* {user && dUser.Role === 'Admin' ? theRoute : theRoutes} */}
          </Route>


          {/* Users Landing page */}
          <Route path='/' element={user && dUser.Role === 'User' ? <Header /> : <Login />} >
            <Route path={nav} element={user && dUser.Role === "User" ? <Home /> : <Login />} />
            <Route path={nav + 'courses/:Id'} element={<Course />} />
            <Route path={nav + 'answers/:Id'} element={user ? <Corrections /> : <Login />} />
            <Route path={nav + 'user/:Id/get'} element={<User />} />
          </Route>


          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div >
  );
}

export default App;
