import "./App.css";
import Admin from "./Components/Main/Admin/Admin";
import Landingpage from "./Components/Main/Landingpage";
import Signup from "./Components/Main/User/Auth/Signup";
import Login from "./Components/Main/User/Auth/Login";
import { Route, Routes } from "react-router-dom";
import User from "./Components/Main/User/Userpage/User";
import Header from "./Components/Shared/Header";
import UserReport from "./Components/Main/User/Userpage/UserReport";
import GraphOne from "./Components/Main/User/Userpage/GraphOne";
// import UserReport from "./Components/Main/User/Userpage/UserReport";

export const config = {
  endpoint: `https://quizbeeback.herokuapp.com/v1`,
};

function App() {

  
  return (
    <div className="App container-fluid">
      <Routes>
        <Route path="/admin" element={<Admin />} exact />
        
        <Route path="/user/result" element={<UserReport />} exact />

        <Route path="/user/test" element={<User />} exact />

        <Route path="/user/signup" element={<Signup />} exact />

        <Route path="/user/login" element={<Login />} exact />

        <Route path="/" element={<Landingpage />} exact />
      </Routes>
    </div>
  );
}

export default App;
