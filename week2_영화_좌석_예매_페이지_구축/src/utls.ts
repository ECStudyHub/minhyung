export function updateSelectPeopleNumButtons({
  $buttons,
  selected_number,
}: {
  $buttons: HTMLCollection;
  selected_number: number;
}) {
  for (const button of $buttons) {
    const node_value = Number(button?.textContent) ?? 0;
    if (isNaN(node_value)) continue;

    if (node_value === selected_number) {
      button.classList.add("toggle");
    } else {
      button.classList.remove("toggle");
    }
  }
}

export function updateCheckboxDisabled({
  $checkbox,
  will_disabled,
}: {
  $checkbox: HTMLInputElement | null;
  will_disabled: boolean;
}) {
  if (!$checkbox) {
    return;
  }

  if (will_disabled) {
    $checkbox?.setAttribute?.("disabled", "true");
  } else {
    $checkbox?.removeAttribute?.("disabled");
  }
}

export function getSeatType(seat_index: number) {
  const NORMAL_START = 0;
  const NORMAL_END = 25;
  const MUSSEUK_START = 26;
  const MUSSEUK_END = 35;
  const HANDICAP_START = 36;
  const HANDICAP_END = 38;

  if (seat_index >= NORMAL_START && seat_index <= NORMAL_END) {
    return "NORMAL";
  }
  if (seat_index >= MUSSEUK_START && seat_index <= MUSSEUK_END) {
    return "MUSSEUK";
  }
  if (seat_index >= HANDICAP_START && seat_index <= HANDICAP_END) {
    return "HANDICAP";
  }
  return "EMPTY";
}
