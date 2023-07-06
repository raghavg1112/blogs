import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Old_blogs from './screens/Old_blogs'
import Public_blogs from './screens/Public_blogs'
import Navbar from './components/Navbar'
import Edit_blog from './screens/Edit_blog'
function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Public_blogs/>}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/Old_blogs" element={<Old_blogs />}></Route>
          <Route exact path='/create_blog' element={<Home/>}></Route>
          <Route exact path='/edit_blog/:id/:blog' element={<Edit_blog/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
