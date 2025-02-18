import { MAX_SEAT_NUM } from "./resources/const";
import { getSeatType } from "./utls";

export type SeatType = "EMPTY" | "NORMAL" | "MUSSEUK" | "HANDICAP";

interface GlobalState {
  adult_peolple_num: number;
  child_people_num: number;
  total_people_num: number;
  selected_seat_num: number;
  selected_seat_array: {
    selected: boolean;
    type: SeatType;
  }[];
  is_checked_handicap: boolean;
}

const global_state: GlobalState = {
  adult_peolple_num: 0,
  child_people_num: 0,
  total_people_num: 0,
  selected_seat_num: 0,
  selected_seat_array: Array.from({ length: MAX_SEAT_NUM }, (_, seat_index) => ({
    selected: false,
    type: getSeatType(seat_index),
  })),
  is_checked_handicap: false,
};

export function setGlobalState<T extends keyof GlobalState>(
  key: T,
  value: GlobalState[T]
) {
  global_state[key] = value;
}

export function getGlobalState<T extends keyof GlobalState>(key: T) {
  return global_state[key];
}
