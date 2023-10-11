import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";
import { actions } from "../redux/Reducers/userReducer";
import { useDispatch } from 'react-redux';


export default function Login({ setShowLogin }) {
  const dispatch=useDispatch();
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      console.log(res);
      // setCurrentUsername(res.data.username);
      dispatch(actions.loginUser([res.data]));
      // myStorage.setItem('user',JSON.stringify( res.data));
      setShowLogin(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>SoftMan Pin</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
