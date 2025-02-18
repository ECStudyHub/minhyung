import { MAX_HANDICAP_PEOPLE_NUM, MAX_SEAT_NUM, PRICE } from "../resources/const";
import { MSG } from "../resources/messages";
import { $$reserve_page } from "../section_elements";
import { getGlobalState, setGlobalState } from "../state";
import {
  getSeatType,
  updateSelectPeopleNumButtons,
  updateCheckboxDisabled,
} from "../utls";

export function connectResevePageEventListeners() {
  $$reserve_page.$$select_people_section.$element?.addEventListener(
    "click",
    handleClickSelectPeopleSection
  );

  $$reserve_page.$$select_people_section.$checkbox_handicap?.addEventListener(
    "click",
    handleClickHandicapCheckbox
  );

  $$reserve_page.$$theater_seats_section.$element?.addEventListener(
    "click",
    handleClickTheaterSeatsSection
  );

  $$reserve_page.$$bottom_section.$reset_button?.addEventListener(
    "click",
    resetReserveDatas
  );
}

// 인원 선택 이벤트
function handleClickSelectPeopleSection(e: MouseEvent) {
  const { $checkbox_handicap, $group_adult_num_button, $group_child_num_button } =
    $$reserve_page.$$select_people_section;

  const target = e.target as HTMLElement | null;
  if (target?.tagName !== "BUTTON") {
    return;
  }

  const selected_number = Number(target.textContent) ?? 0;
  const is_adult_button = target?.closest("div #adultBtn");
  const is_child_button = target?.closest("div #youthBtn");

  let peolple_sum = getGlobalState("total_people_num");
  if (is_adult_button) {
    peolple_sum = selected_number + getGlobalState("child_people_num");
  } else if (is_child_button) {
    peolple_sum = getGlobalState("adult_peolple_num") + selected_number;
  }

  if ($checkbox_handicap?.checked && peolple_sum > MAX_HANDICAP_PEOPLE_NUM) {
    alert(MSG.over_handicap_num);
    return;
  }

  if (peolple_sum < getGlobalState("selected_seat_num")) {
    resetReserveDatas();
    return;
  }

  if (is_adult_button) {
    setGlobalState("adult_peolple_num", selected_number);
    updateSelectPeopleNumButtons({
      $buttons: $group_adult_num_button.children,
      selected_number: getGlobalState("adult_peolple_num"),
    });
  } else if (is_child_button) {
    setGlobalState("child_people_num", selected_number);
    updateSelectPeopleNumButtons({
      $buttons: $group_child_num_button.children,
      selected_number: getGlobalState("child_people_num"),
    });
  }

  setGlobalState(
    "total_people_num",
    getGlobalState("adult_peolple_num") + getGlobalState("child_people_num")
  );
  updateCheckboxDisabled({
    $checkbox: $checkbox_handicap,
    will_disabled:
      getGlobalState("total_people_num") === 0 ||
      getGlobalState("total_people_num") > MAX_HANDICAP_PEOPLE_NUM,
  });
  updateSeats(
    $$reserve_page.$$theater_seats_section.$element,
    getGlobalState("total_people_num") > 0
  );
}

// 장애인 체크박스 이벤트
function handleClickHandicapCheckbox() {
  const $checkbox_handicap = $$reserve_page.$$select_people_section.$checkbox_handicap;
  const $theater_seats = $$reserve_page.$$theater_seats_section.$element;

  if (!$checkbox_handicap.checked && getGlobalState("selected_seat_num") > 0) {
    resetReserveDatas();
    return;
  }

  $checkbox_handicap.checked = !!$checkbox_handicap.checked;
  setGlobalState("is_checked_handicap", $checkbox_handicap.checked);
  updateSeats($theater_seats, getGlobalState("total_people_num") > 0);
}

function updateSeats($theater_seats: HTMLDivElement, will_show: boolean) {
  const selected_seat_array = getGlobalState("selected_seat_array") || [];
  const is_seat_limit_reached =
    getGlobalState("selected_seat_num") === getGlobalState("total_people_num");

  const seat_type = selected_seat_array.find((seat) => seat.selected)?.type;

  Array.from($theater_seats?.children ?? []).forEach(($seat, seat_index) => {
    const seat_info = selected_seat_array[seat_index] || {};
    const is_selected = seat_info.selected;
    const is_disabled =
      !will_show ||
      (seat_type && seat_info.type !== seat_type) ||
      (is_seat_limit_reached && !is_selected);

    $seat.classList.toggle("disabled", is_disabled);
    $seat.classList.toggle("clicked", is_selected);
  });
}

// 좌석 선택 이벤트
function handleClickTheaterSeatsSection(e: MouseEvent) {
  const selected_seat_index = Array.from(
    $$reserve_page.$$theater_seats_section.$element.children
  ).findIndex((element) => element === e.target);

  const selected_seat_type = getSeatType(selected_seat_index);
  if (selected_seat_type === "MUSSEUK" && getGlobalState("total_people_num") % 2 !== 0) {
    window.alert(MSG.invalid_mussseuk_eat_num);
    return;
  }

  if (selected_seat_type === "HANDICAP" && !getGlobalState("is_checked_handicap")) {
    window.alert(MSG.invalid_handicap_check);
    return;
  }

  updateSeat(selected_seat_index, selected_seat_type);
  updateCheckboxDisabled({
    $checkbox: $$reserve_page.$$select_people_section.$checkbox_handicap,
    will_disabled:
      selected_seat_type !== "HANDICAP" && getGlobalState("selected_seat_num") > 0,
  });
  updateReservationInformations();
}

function updateSeat(
  target_index: number,
  seat_type: "NORMAL" | "MUSSEUK" | "HANDICAP" | "EMPTY"
) {
  const next_selected_seat_array = getGlobalState("selected_seat_array").map(
    (seat, index) =>
      index === target_index ? { selected: !seat.selected, type: seat_type } : seat
  );
  const selected_seat_num = next_selected_seat_array.filter(
    (seat) => seat.selected
  ).length;

  if (selected_seat_num > getGlobalState("total_people_num")) {
    return;
  }

  setGlobalState("selected_seat_array", next_selected_seat_array);
  setGlobalState("selected_seat_num", selected_seat_num);
  updateSeats($$reserve_page.$$theater_seats_section.$element, true);
}

function updateReservationInformations() {
  const selected_seat_num = getGlobalState("selected_seat_num");
  const seat_lefts = MAX_SEAT_NUM - selected_seat_num;

  const seat_type = getGlobalState("selected_seat_array").find(
    (seat) => seat.selected
  )?.type;
  // 1. 장애인석이면 5000원
  if (seat_type === "HANDICAP") {
    $$reserve_page.$$reserve_info_section.$span_amount.textContent = `${
      PRICE.handicap * selected_seat_num
    }`;
    return;
  }
  // 그거 아니면 어른가격, 어린이가격을 for문에 넣어서 합침
  let total_price = 0;

  for (let i = 0; i < selected_seat_num; i++) {
    if (i < getGlobalState("adult_peolple_num")) {
      total_price += PRICE.adult;
    } else {
      total_price += PRICE.child;
    }
  }

  if (seat_type === "MUSSEUK") {
    total_price *= 0.8;
  }

  $$reserve_page.$$reserve_info_section.$span_remain_seat_cnt.textContent = `${seat_lefts}`;
  $$reserve_page.$$reserve_info_section.$span_amount.textContent = `${total_price}`;
}

function resetReserveDatas() {
  alert(MSG.cancel_all_seat);

  setGlobalState("adult_peolple_num", 0);
  setGlobalState("child_people_num", 0);
  setGlobalState("total_people_num", 0);
  setGlobalState("selected_seat_num", 0);
  setGlobalState(
    "selected_seat_array",
    Array.from({ length: MAX_SEAT_NUM }, (_, seat_index) => ({
      selected: false,
      type: getSeatType(seat_index),
    }))
  );
  setGlobalState("is_checked_handicap", false);

  updateSelectPeopleNumButtons({
    $buttons: $$reserve_page.$$select_people_section.$group_adult_num_button.children,
    selected_number: 0,
  });
  updateSelectPeopleNumButtons({
    $buttons: $$reserve_page.$$select_people_section.$group_child_num_button.children,
    selected_number: 0,
  });
  updateReservationInformations();
  updateSeats($$reserve_page.$$theater_seats_section.$element, false);
}
