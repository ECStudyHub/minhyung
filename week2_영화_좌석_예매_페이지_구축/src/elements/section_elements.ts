const $login_section = document.querySelector("#loginSection") as HTMLDivElement | null;

export const $$login_page = {
  $element: $login_section,
  $login_btn: document.querySelector("#theaterLoginBtn") as HTMLButtonElement | null,
  $input_email: $login_section?.querySelector("#email") as HTMLInputElement | null,
  $input_password: $login_section?.querySelector("#password") as HTMLInputElement | null,
};

const $reserve_section = document.querySelector(
  "#theaterSection"
) as HTMLDivElement | null;

// 왼쪽 선택영역
const $check_num_of_people_section = $reserve_section?.querySelector(
  ".section-numOfPeople"
) as HTMLDivElement | null;

// 오른쪽 예약정보 영역
const $section_reserve_info = $reserve_section?.querySelector(
  "#reserveInfo"
) as HTMLDivElement | null;

export const $$reserve_page = {
  $element: $reserve_section,
  $$select_people_section: {
    $element: $check_num_of_people_section,
    $group_adult_num_button: $check_num_of_people_section?.querySelector(
      ".btn-group#adultBtn"
    ) as HTMLDivElement,
    $group_child_num_button: $check_num_of_people_section?.querySelector(
      ".btn-group#youthBtn"
    ) as HTMLDivElement,
    $checkbox_handicap: $check_num_of_people_section?.querySelector(
      ".checkbox input#checkHandicap"
    ) as HTMLInputElement,
  },
  $$reserve_info_section: {
    $element: $section_reserve_info,
    $span_remain_seat_cnt: $section_reserve_info?.querySelector(
      "#remainSeatCnt"
    ) as HTMLSpanElement,
    $span_amount: $section_reserve_info?.querySelector("#amount") as HTMLSpanElement,
  },
  $$theater_seats_section: {
    $element: $reserve_section?.querySelector("#theaterSeat") as HTMLDivElement,
  },
  $$bottom_section: {
    $reset_button: $reserve_section?.querySelector("#reselect") as HTMLButtonElement,
  },
};
