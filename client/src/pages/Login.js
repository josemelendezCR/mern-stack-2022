import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const { email, password } = formData;

  const onChange = e => {
    setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      })
    )
  }

  const onSubmit = e => {
    e.preventDefault();    
    const userData = { email, password };
    dispatch(login(userData));
  }

  useEffect(() => {
    if(isError) {
      console.log('ERROR IN USE EFFECT');
    }

    if(isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, dispatch, navigate]);

  if(isLoading) {
    return <div>SPINNER</div>
  }

  return (
    <div>
      <section>
        <h1>Login</h1>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input type="email" name="email" value={email} id="email" placeholder="Enter your email" onChange={onChange} />
            <input type="password" name="password" value={password} id="password" placeholder="Enter your password" onChange={onChange} />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;