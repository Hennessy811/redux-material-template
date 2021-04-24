import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import incomingRequests, { RequestDataItem, RequestDataItemState } from '../../shared/data/incomingRequests';
import newsFeed, { NewsFeedItem } from '../../shared/data/newsFeed';
import { AppThunk, RootState } from '../store';

export interface DataState {
  incomingRequests: RequestDataItem[];
  newsFeed: NewsFeedItem[];
}

const initialState: DataState = {
  incomingRequests,
  newsFeed,
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
    approveAll: state => {
      state.incomingRequests = state.incomingRequests.map(item => ({ ...item, state: 'approved' }));
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

export const { changeState, approveAll } = dataSlice.actions;

export const selectRequestItem = (state: RootState, id: string) => state.data.incomingRequests.find(i => i.id === id);
export const selectData = (state: RootState) => state.data;
export const selectNews = (state: RootState) => state.data.newsFeed;

export default dataSlice.reducer;
