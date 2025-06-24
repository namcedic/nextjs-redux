import { RootState } from "@/lib/redux/store";

export const selectCount = (state: RootState) => state.counter.value;
