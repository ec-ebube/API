import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header';
import Login from './Components/Login';
import Footer from './Components/Footer';
import CreateAcct from './Components/CreateAcct';
import Home from './Components/Home';
import NotFound from './NotFound';
import Users from './Components/Users';
import Course from './Components/Course';
import Corrections from './Components/Corrections';
import User from  './Components/User'
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    // All should be protected except login and register
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={user ? <Home /> : <Login />} />
          <Route path='/Login' element={!user ? <Login /> : <Home />} />
          <Route path='/CreateAcct' element={!user ? <CreateAcct /> : <Login />} />
          <Route path='/Users' element={user ? <Users /> : <Login />} />
          <Route path='/courses/:Id' element={<Course />} />
          <Route path='/answers/:Id' element={user ? <Corrections /> : <Login />} />
          <Route path='/user/:Id/get' element={<User /> } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
