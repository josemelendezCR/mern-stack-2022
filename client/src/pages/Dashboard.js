import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from '../components/GoalForm';
import { getGoals, reset } from '../features/goals/goalSlice';
import GoalItem from '../components/GoalItem';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { goals, isLoading, isError, message } = useSelector(state => state.goals);

  useEffect(() => {
    if(!user) {
      navigate('/login');
    }

    if(isError) {
      console.log('ERROR GETTING GOALS:', message);
    }

    dispatch(getGoals());
    
    // This runs when the component is unmount
    return () => {
      dispatch(reset());
    }
    
  }, [user, navigate, isError, message, dispatch]);

  if(isLoading) {
    return <div>SPINNER</div>
  }

  return <div>
    <section>
      <h1>Welcome</h1>
    </section>
    <GoalForm />
    <section>
      {goals.length > 0 ? (<div>
        {goals.map(goal => (<GoalItem key={goal.id} goal={goal} />))}
      </div>) : (<h3>You have not set any goals</h3>)}
    </section>
  </div>
}

export default Dashboard;