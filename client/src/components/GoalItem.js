import { useDispatch } from "react-redux";
import { deleteGoal } from '../features/goals/goalSlice';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>{goal.text}</h2>
      <h5>{goal.userId}</h5>
      <button onClick={() => dispatch(deleteGoal(goal.id))}>Delete</button>
    </div>
  );
}

export default GoalItem;