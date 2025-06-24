import { useAppSelector, useAppDispatch } from "@/lib/redux/hook";
import { selectCount } from "@/lib/redux/features/counter/selectors";
import {
  decrement,
  increment,
  incrementAsync,
} from "@/lib/redux/features/counter/slice";
import React from "react";

export const Counter = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const onIncrement = () => dispatch(increment());
  const onDecrement = () => dispatch(decrement());
  const onIncrementAsync = () => dispatch(incrementAsync());

  return (
    <div className="flex flex-col">
      <h1 className="text-white text-3xl md:text-5xl font-bold text-center my-8">
        Counter with Redux Toolkit And Saga
      </h1>
      <div className="space-y-4 py-8">
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={onIncrement}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 mx-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={onDecrement}
        >
          Decrement
        </button>
        <button
          className="px-4 py-2 mx-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={onIncrementAsync}
        >
          Increment Async
        </button>
      </div>
      <p className="text-lg font-semibold text-center">{count}</p>
    </div>
  );
};
