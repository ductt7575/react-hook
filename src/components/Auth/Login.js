import { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    //Validate
    // Submit apis
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate('/');
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header text d-flex align-items-center justify-content-end mx-4 gap-2 mt-4">
        <Link to="/" className="m-0 me-auto text-primary text-decoration-none">
          {`<`} Back home
        </Link>
        <p className="m-0">Don't have an account yet?</p>
        <Link to={'/signup'} className="btn border-dark">
          Sign up
        </Link>
        <a target="_blank" href="https://www.google.com/" className="text-dark d-inline-block ms-2">
          Contact Us
        </a>
      </div>
      <div className="login-body col-3 mx-auto mt-5 pt-3">
        <div className="title text-center">
          <Link to="/" className="brand">
            Trong Duc's Application
          </Link>
        </div>
        <p className="welcome text-center mt-3"> Hello, who’s this?</p>
        <div className="content-form">
          <div className="form-group mt-3">
            <label className="fw-bolder">Email</label>
            <input
              value={email}
              type="email"
              className="form-control mt-2"
              placeholder="abc@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="fw-bolder">Password</label>
            <input
              value={password}
              type="password"
              className="form-control mt-2"
              placeholder="At least 8 letters"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Link to={'/forgot-password'} className="mt-2 fs-6 text-end d-block">
            Forgot password?
          </Link>
          <div className="form-group mt-4">
            <button className="btn btn-dark col-12" onClick={() => handleLogin()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
