import { MAX_SEAT_NUM } from "./resources/const";
import { getSeatType } from "./utls";

const global_state: {
  adult_peolple_num: number;
  child_people_num: number;
  total_people_num: number;
  selected_seat_num: number;
  selected_seat_array: {
    selected: boolean;
    type: SeatType;
  }[];
  is_checked_handicap: boolean;
} = {
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

export type SeatType = "EMPTY" | "NORMAL" | "MUSSEUK" | "HANDICAP";
export function setGlobalState<T extends keyof typeof global_state>(
  key: T,
  value: (typeof global_state)[T]
) {
  global_state[key] = value;
}

export function getGlobalState<T extends keyof typeof global_state>(key: T) {
  return global_state[key];
}
