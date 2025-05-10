import {BrowserRouter, Link, Navigate, Route, Router, Routes} from "react-router";
import Home from "./components/Home.jsx";
import {useState} from "react";
import Login from "./components/Login.jsx";
import CreateUser from "./components/CreateUser.jsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Navigate to={"/login"} />} path="/"/>
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />}/>
                <Route element={<CreateUser />} path="/createUser"/>
                <Route element={<Home loggedIn={loggedIn} />} path="/home"/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
