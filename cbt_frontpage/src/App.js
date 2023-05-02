import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header';
import Login from './Components/Login';
import Footer from './Components/Footer';
import CreateAcct from './Components/CreateAcct';
import Home from './Components/Home';
import NotFound from './NotFound';
import Users from './Components/Users';

function App() {


  return (
    // All should be protected except login and register
    <div className="App">
      <Header />
      <div className="content">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/CreateAcct' element={<CreateAcct />} />
        <Route path='/Users' element={<Users />} />
        <Route path='*' element={<NotFound />}/> 
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
