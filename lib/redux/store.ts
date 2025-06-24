import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import counterReducer from "@/lib/redux/features/counter/slice";
import { rootSaga } from "@/lib/redux/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
    reducer: {
      counter: counterReducer,
    },
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
