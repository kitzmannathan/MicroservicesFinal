import {Link, useNavigate} from "react-router";
import {customerURL} from "../constants.js";
import {useState} from "react";

function Login({setLoggedIn, setUserID, setName}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const login = async () => {
        const encodedEmail = encodeURIComponent(email)

        const userResponse = await fetch(`${customerURL}/verifyUser/${encodedEmail}/${password}`);
        const userFound = await userResponse.text()

        if(userFound === "found"){
            setLoggedIn(true);

            const getUserResponse = await fetch(`${customerURL}/getUser/${encodedEmail}`);
            const userInfo = await getUserResponse.json()
            setUserID(userInfo[0].userID)
            setName(userInfo[0].name)
            navigate("/home");
        }
    }

    return(
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <div>
              <h1>Login to your account</h1>
          </div>
          <div>
              <label htmlFor={"email"}>Email:</label>
              <input id={"email"} onChange={(e) => {setEmail(e.target.value)}} value={email} />
          </div>
          <br/>
          <div>
              <label htmlFor={"password"}>Password:</label>
              <input id={"password"} onChange={(e) => {setPassword(e.target.value)}} value={password} />
          </div>
          <br/>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", "padding-top": "10px"}} >
              <div style={{"paddingRight": "10px"}}>
                  <button onClick={() => login()}>Login</button>
              </div>
              <div>
                  <Link to={"/createUser"}>
                      <button>create user</button>
                  </Link>
              </div>
          </div>
      </div>
    );
}
export default Login;