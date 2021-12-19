import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import AuthService from "./services/auth-service";

const store = createStore(combineReducers({}), applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const init = async () => {
  return (
    <Provider store={store}>
      <AuthService>
        <App />
      </AuthService>
    </Provider>
  );
};
export default init;
