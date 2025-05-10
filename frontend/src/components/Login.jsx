import {Link, useNavigate} from "react-router";

function Login({setLoggedIn}) {
    const navigate = useNavigate();


    const login = async () => {
        setLoggedIn(true);
        navigate("/home");
    }

    return(
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <div>
              <h1>HELLO</h1>
          </div>
          <div>
              <label htmlFor={"userName"}>Username:</label>
              <input id={"userName"}/>
          </div>
          <br/>
          <div>
              <label htmlFor={"password"}>Password:</label>
              <input id={"password"}/>
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