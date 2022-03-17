import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { isLoggedIn, logout, getToken } from "./Login";
const Welcome = () => {
  useEffect(() => {
    doGet();
  }, []);
  const doGet = (e) => {
    // let token = "Bearer " + getToken();
    let url = "http://localhost:8080/api/test/all";
    // let param = {
    //   headers: {
    //     Authorization: token,
    //   },
    // };
    fetch(url)
      .then((res) => {
        return res.text().then((result) => {
          console.log(result);
          setContent(result);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [content, setContent] = useState("");
  return (
    <div>
      {isLoggedIn() ? (
        <div>
          <h1> Hello Testing </h1>
          <div>
            <h1>{content}</h1>
          </div>
          <button
            onClick={getToken()}
            type="submit"
            className="btn btn-primary me-3"
          >
            Get
          </button>
          <Link
            onClick={logout}
            to="/"
            type="submit"
            className="btn btn-primary"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <h1>not verified</h1>
          <Navigate to="/"></Navigate>
        </div>
      )}
    </div>
  );
};

export default Welcome;
