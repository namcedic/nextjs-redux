import { put, takeEvery, call } from "redux-saga/effects";
import { increment } from "@/lib/redux/features/counter/slice";
import { delay } from "@/utils";
import { createActions } from "../../utils";

export const NAME = "counter";

export const {
  actionTypes,
  actionRequest,
  actionStart,
  actionSuccess,
  actionFailure,
} = createActions(NAME);

export function* incrementAsync() {
  try {
    yield put(actionStart());
    yield call(delay, 1000); // Simulate async operation
    // Dispatch an action to update the state upon start
    yield put(increment());
    // Dispatch an action to update the state upon success
    yield put(actionSuccess());
  } catch {
    // Dispatch an action to update the state upon failure
    yield put(actionFailure());
  }
}

export function* watchIncrementAsync() {
  yield takeEvery(actionTypes.REQUEST, incrementAsync);
}
