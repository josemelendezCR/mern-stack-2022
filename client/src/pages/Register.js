import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const onChange = e => {
    setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      })
    )
  }

  const onSubmit = e => {
    e.preventDefault();
    if(password !== password2) {
      console.log('PASSWORD NOT MATCH');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
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
        <h1>Register</h1>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input type="text" name="name" value={name} id="name" placeholder="Enter your name" onChange={onChange} />
            <input type="email" name="email" value={email} id="email" placeholder="Enter your email" onChange={onChange} />
            <input type="password" name="password" value={password} id="password" placeholder="Enter your password" onChange={onChange} />
            <input type="password" name="password2" value={password2} id="password2" placeholder="Confirm your password" onChange={onChange} />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;