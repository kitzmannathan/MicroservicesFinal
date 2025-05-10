import { useNavigate } from "react-router";
import {customerURL} from "../constants.js";

function CreateUser() {
    const navigate = useNavigate();

    const createUser = async () => {
        await fetch(`${customerURL}/createUser`, {method: "POST", body: {name: "user1", email: "test@test.com"}})
        navigate("/login");
    }


    return (
        <>
            <h1> create user account </h1>
            <button onClick={() => createUser()}> create user</button>
        </>
    )
}

export default CreateUser;