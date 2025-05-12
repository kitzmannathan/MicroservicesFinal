import {Link, useNavigate} from "react-router";
import {customerURL} from "../constants.js";
import {useState} from "react";

function CreateUser() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const createUser = async () => {
        const createUserResponse = await fetch(`${customerURL}/createUser`, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: name, email: email, password: password})})
        const createUserText = await createUserResponse.text()
        if (createUserText === "added") {
            navigate("/login");
        }
    }


    return (
        <>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <div>
                    <h1>Create a user account</h1>
                </div>
                <div>
                    <label htmlFor={"email"}>Email:</label>
                    <input id={"email"} onChange={(e) => {setEmail(e.target.value)}} value={email} />
                </div>
                <br/>
                <div>
                    <label htmlFor={"name"}>Name:</label>
                    <input id={"name"} onChange={(e) => {setName(e.target.value)}} value={name} />
                </div>
                <br/>
                <div>
                    <label htmlFor={"password"}>Password:</label>
                    <input id={"password"} onChange={(e) => {setPassword(e.target.value)}} value={password} />
                </div>
                <br/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", "padding-top": "10px"}} >
                    <div>
                        <button onClick={() => {createUser()}}>create user</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateUser;