import { loginReducer } from '@modulos/login/reducer/login.reducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import { autenticacaoReducer } from '@modulos/seguranca/reducers/autenticacao.reducer';
// import { layoutReducer } from './reducers/layout.reducer';

export const rootReducer = combineReducers({
  // layout: layoutReducer,
  login: loginReducer,
});

export function createApplicationStore() {
  return configureStore({
    devTools: { name: 'poc-firebase-react' },
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export const store = createApplicationStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
