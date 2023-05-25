import { Routes, Route } from 'react-router-dom'
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
import AdcreateCourse from './Admin/AdcreateCourse'

function App() {
  const { user } = useAuthContext();

  return (
    // All should be protected except login and register
    <div className="App">
      {/* <Header /> */}
      <div className="content">
        <Routes>
          {/* Users LAnding page */}
          <Route path='/' element={<Header />} >
            <Route path='/' element={user ? <Home /> : <Login />} />
            <Route path='/Login' element={!user ? <Login /> : <Home />} />
            <Route path='/CreateAcct' element={!user ? <CreateAcct /> : <Login />} />
            <Route path='/courses/:Id' element={<Course />} />
            <Route path='/answers/:Id' element={user ? <Corrections /> : <Login />} />
            <Route path='/user/:Id/get' element={<User />} />
          </Route>

          {/* Admin Landing page */}
          <Route path='/admin' element={<Adheader />}>
            <Route path='/admin' element={user ? <Adhome /> : <Login />} />
            <Route path='/admin/Users' element={user ? <Users /> : <Login />} />
            <Route path='/admin/courses' element={user ? <Adcourses /> : <Login />} />
            <Route path='/admin/assessments' element={user ? <Adassessments /> : <Login />} />
            <Route path='/admin/createcourse' element={user ? <AdcreateCourse /> : <Login />} />

          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
