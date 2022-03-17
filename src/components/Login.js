import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
const Login = () => {
  const [details, setDetails] = useState({
    username: "",
    password: "",
    token: null,
  });
  const handleForm = (e) => {
    console.log(details);
    doLogin(details);
    e.preventDefault();
    if (details.username == "" || details.password == "") {
      alert("Please Enter UserId and Password");
    }
  };
  const doLogin = () => {
    let url = "http://localhost:8080/api/auth/signin";
    let param = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };
    fetch(url, param).then((res) => {
      return res.json().then((result) => {
        console.warn(result);
        loginUser(result);
      });
    });
  };

  useEffect(() => {
    let store = JSON.parse(isLoggedIn("token"));
    setDetails({ store: store });
    if (store && store.login) {
      setDetails({ login: true });
    }
  }, []);
  useEffect(() => {});
  return (
    <div>
      {!isLoggedIn() ? (
        <div className="container mt-5">
          <form method="POST" onSubmit={handleForm}>
            <div className="form-group">
              <label for="exampleInputEmail1">User Name</label>
              <input
                onChange={(e) => {
                  setDetails({ ...details, username: e.target.value });
                }}
                type="text"
                name="username"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="User Name"
              ></input>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                onChange={(e) => {
                  setDetails({ ...details, password: e.target.value });
                }}
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              ></input>
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Data</h1>
          <Navigate to="/welcome" />;
        </div>
      )}
    </div>
  );
};
const loginUser = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
  return true;
};
const isLoggedIn = () => {
  let token = localStorage.getItem("token");
  if (token == undefined || token == null || token == "") {
    return false;
  } else {
    return true;
  }
};
const logout = () => {
  localStorage.removeItem("token");
  // window.location.reload();
};
const getToken = () => {
  return localStorage.getItem("token");
};

export default Login;
export { logout, isLoggedIn, getToken };
