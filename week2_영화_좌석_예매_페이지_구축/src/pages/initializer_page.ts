import { MAX_HANDICAP_PEOPLE_NUM } from "../resources/const";
import { $$reserve_page } from "../section_elements";
import { getGlobalState } from "../state";
import { updateSelectPeopleNumButtons, updateCheckboxDisabled } from "../utls";

export function initPage() {
  const global_total_people_num = getGlobalState("total_people_num");

  updateSelectPeopleNumButtons({
    $buttons: $$reserve_page.$$select_people_section.$group_adult_num_button.children,
    selected_number: getGlobalState("adult_peolple_num"),
  });
  updateSelectPeopleNumButtons({
    $buttons: $$reserve_page.$$select_people_section.$group_child_num_button.children,
    selected_number: getGlobalState("child_people_num"),
  });
  updateCheckboxDisabled({
    $checkbox: $$reserve_page.$$select_people_section.$checkbox_handicap,
    will_disabled:
      global_total_people_num === 0 || global_total_people_num > MAX_HANDICAP_PEOPLE_NUM,
  });
}
