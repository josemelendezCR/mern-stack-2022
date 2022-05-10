import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

const GoalForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onChange = (e) => setText(() => e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText('');
  }

  return <section>
    <form onSubmit={onSubmit}>
      <input name="text" type="text" id="text" value={text} onChange={onChange} placeholder="Set your goal"/>
      <button type="submit">Add Goal</button>
    </form>
  </section>
}

export default GoalForm;