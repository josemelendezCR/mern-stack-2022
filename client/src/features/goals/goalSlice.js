import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await goalService.createGoal(goalData, token);
  } catch(err) {
    console.log('ERROR CREATING GOAL REDUCER:', err);
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
  try{
    const { token } = thunkAPI.getState().auth.user;
    return await goalService.getGoals(token);
  } catch(err) {
    console.log('ERROR GET ALL GOALS REDUCER:', err);
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id, thunkAPI) => {
  try{
    const { token } = thunkAPI.getState().auth.user;
    return await goalService.deleteGoal(id, token);
  } catch(err) {
    console.log('ERROR DELETING GOAL REDUCER:', err);
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState 
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)        
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload        
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      // REDUCERS FOR DELETE GOAL
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(goal => goal.id !== action.payload)        
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
  }
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer; 

