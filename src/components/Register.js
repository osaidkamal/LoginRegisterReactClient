import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    roles: [],
  });
  const handleForm = (e) => {
    console.log(user);
    doRegister(user);
    e.preventDefault();
  };
  const doRegister = () => {
    let url = "http://localhost:8080/api/auth/signup";
    let param = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify(user),
    };
    fetch(url, param).then((res) => {
      res.json().then((result) => {
        console.warn(result);
        // loginUser(result.token);
        setUser(result);
      });
      <Navigate to="/login"></Navigate>;
    });
  };

  return (
    <>
      <div className="container mt-5">
        <form method="POST" onSubmit={handleForm}>
          <div className="form-group">
            <label for="exampleInputEmail1">User Name</label>
            <input
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              type="text"
              name="username"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="User Name"
            ></input>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              type="email"
              name="username"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            ></input>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            ></input>
          </div>

          <Link to="/login" type="submit" className="btn btn-primary mt-2">
            Submit
          </Link>
          <Link to="/login" type="submit" className="btn btn-primary mt-2 ms-2">
            Already Registered?
          </Link>
        </form>
      </div>
    </>
  );
};
export default Register;
