import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import incomingRequests, { RequestDataItem, RequestDataItemState } from '../../shared/data/incomingRequests';
import { AppThunk, RootState } from '../store';

export interface DataState {
  incomingRequests: RequestDataItem[];
}

const initialState: DataState = {
  incomingRequests,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<{ id: string; status: RequestDataItemState }>) => {
      state.incomingRequests = state.incomingRequests.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, state: action.payload.status };
        }
        return item;
      });
    },
  },
  extraReducers: builder => {
    // builder
    //   .addCase(incrementAsync.pending, state => {
    //     state.status = 'loading';
    //   })
    //   .addCase(incrementAsync.fulfilled, (state, action) => {
    //     state.status = 'idle';
    //     state.value += action.payload;
    //   });
  },
});

export const { changeState } = dataSlice.actions;

export const selectRequestItem = (state: RootState, id: string) => state.data.incomingRequests.find(i => i.id === id);
export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
