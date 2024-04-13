import { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch('');

  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass((prev) => !prev);
  };

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error('Invalid email');
      return;
    }
    if (!password) {
      toast.error('Invalid password');
      return;
    }
    // Submit apis
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch({
        type: 'FETCH_USER_LOGIN_SUCCESS',
        payload: data,
      });
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
      <div className="login-body col-4 mx-auto mt-4 pt-3">
        <div className="text-center">
          <Link to="/" className="text-decoration-none fs-2 fw-bold text-dark">
            Trong Duc's Application
          </Link>
        </div>
        <p className="text-center mt-3 fs-5 py-2"> Hello, who’s this?</p>
        <div className="content-form">
          <form onSubmit={(event) => handleLogin(event)}>
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
              <div className="input-group position-relative">
                <input
                  value={password}
                  type={showPass ? 'text' : 'password'}
                  className="form-control mt-2 z-2"
                  placeholder="At least 6 letters"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <span
                  style={{ cursor: 'pointer' }}
                  className="user-select-none position-absolute top-50 end-0 translate-middle z-3"
                  onClick={() => clickHandler()}
                >
                  {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>
            <Link to={'/forgot-password'} className="mt-2 fs-6 text-end d-block">
              Forgot password?
            </Link>
            <div className="form-group mt-4">
              <button className="btn btn-dark col-12">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
