import {BrowserRouter, Link, Navigate, Route, Router, Routes} from "react-router";
import Home from "./components/Home.jsx";
import {useState} from "react";
import Login from "./components/Login.jsx";
import CreateUser from "./components/CreateUser.jsx";
import Orders from "./components/Orders.jsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userID, setUserID] = useState(0);
    const [name, setName] = useState("");

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Navigate to={"/login"} />} path="/"/>
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUserID={setUserID} setName={setName} />}/>
                <Route element={<CreateUser />} path="/createUser"/>
                <Route element={<Home loggedIn={loggedIn} userID={userID} name={name} setLoggedIn={setLoggedIn} />} path="/home"/>
                <Route element={<Orders loggedIn={loggedIn} name={name} userID={userID} setLoggedIn={setLoggedIn} />} path="/orders"/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
