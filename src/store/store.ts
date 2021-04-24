import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import notificationsReducer from './features/notifications';
import dataReducer from './features/data';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notifications: notificationsReducer,
    data: dataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
