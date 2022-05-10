import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <header>
      <div className='logo'>
        <Link to="/">Goal Setter</Link>
      </div>
      <div>
        {user ? (<button onClick={onLogout}>Logout</button>) : (
          <><Link to="/login">Login</Link>
          <Link to="/register">Register</Link></>
        )}        
      </div>
    </header>
  );
}

export default Header;