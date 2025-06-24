import { all } from "redux-saga/effects";
import { watchIncrementAsync } from "@/lib/redux/features/counter/saga";
import { authSaga  } from "@/lib/redux/features/auth/saga";

export function* rootSaga() {
  yield all([watchIncrementAsync(), authSaga()]);
}
