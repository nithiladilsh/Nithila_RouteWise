import { createSlice, configureStore } from '@reduxjs/toolkit';

// Create a slice for managing the item count
const itemCountSlice = createSlice({
  name: 'itemCount',
  initialState: {
    itemCount: 0,
  },
  reducers: {
    setItemCount: (state, action) => {
      state.itemCount = action.payload;
    },
  },
});

// Export the action to update the item count
export const { setItemCount } = itemCountSlice.actions;

// Configure the Redux store
const store = configureStore({
  reducer: {
    itemCount: itemCountSlice.reducer, // Add the itemCount slice to the Redux store
  },
});

export default store;
