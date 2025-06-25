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
    yield call(delay, 1000);
    yield put(increment());
    yield put(actionSuccess());
  } catch {
    yield put(actionFailure());
  }
}

export function* watchIncrementAsync() {
  yield takeEvery(actionTypes.REQUEST, incrementAsync);
}
