import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./screens/Home/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Old_blogs from "./screens/Old_blogs";
import Public_blogs from "./screens/Public_blogs";
import Navbar from "./components/Navbar";
import Edit_blog from "./screens/Edit_blog";
import Show_blog from "./screens/Show_blog";
import { AppProvider } from "./context/AppProvider";
import Footer from "./components/Footer";
function App() {
  let slug = useParams();
  return (
    <AppProvider>
      <GoogleOAuthProvider>
        <div className="App" style={{ height: "85vh" }}>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Public_blogs />}></Route>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/Old_blogs" element={<Old_blogs />}></Route>
              <Route exact path="/create_blog" element={<Home />}></Route>
              <Route
                exact
                path="/edit_blog/:slug"
                element={<Edit_blog />}
              ></Route>
              <Route
                exact
                path="/show_blog/:slug"
                element={<Show_blog />}
              ></Route>
            </Routes>
          </Router>
        </div>
        <Footer />
      </GoogleOAuthProvider>
    </AppProvider>
  );
}

export default App;
