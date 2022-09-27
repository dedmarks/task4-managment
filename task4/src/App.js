import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./style.scss"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";  
import { useSelector } from "react-redux";





function App() {

  const {currentUser} = useSelector(state => state.user);

  console.log(currentUser)

  return (
    <Router>
       <div className="App">
      <div className="container">
      <Routes>
      <Route path="/" element={ currentUser ? <Home/> : <Navigate to="/login"/>}/>
      <Route path="/login" element={currentUser ? <Navigate to="/"/> : <Login/>}/>
      <Route path="/register" element={currentUser ? <Navigate to="/"/> : <Register/>}/>
    </Routes>
      </div>
    </div>
    </Router>
   
  );
}

export default App;
