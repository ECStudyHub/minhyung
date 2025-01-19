import { dispatchCloseModal, dispatchOpenModal } from "../events/dispatch.js";

const MESSAGES = {
  over_max_retry_count: "최대 재시도 횟수를 초과했습니다.",
  will_retry: "다시 시도하시겠습니까?",
  user_cancel: "사용자가 취소했습니다.",
};

export async function my_fetch({
  retry_count,
  max_retry_count,
  fetchFunction,
  onBeforeFetch,
  onSuccessFetch,
  onError,
}) {
  try {
    if (retry_count === 0) {
      onBeforeFetch();
    }
    const data = await fetchFunction();
    onSuccessFetch();
    return data;
  } catch (e) {
    return onError({
      retry_count,
      retry_function: () =>
        my_fetch({
          retry_count: retry_count + 1,
          max_retry_count,
          fetchFunction,
          onBeforeFetch,
          onSuccessFetch,
          onError,
        }),
    });
  }
}

export async function fetch_with_load_process(fetchFunction) {
  const load_image_path = "assets/nyan-cat.gif";
  const MAX_RETRY_COUNT = 0;
  let retry_count = 0;

  const fetching = () => {
    return my_fetch({
      fetchFunction,
      retry_count,
      max_retry_count: MAX_RETRY_COUNT,
      onBeforeFetch: () => {
        document.dispatchEvent(
          dispatchOpenModal({
            file_path: load_image_path,
            id: "",
            system_modal: true,
          })
        );
      },
      onSuccessFetch: () => {
        document.dispatchEvent(dispatchCloseModal());
      },
      onError: ({ retry_count, retry_function }) => {
        if (retry_count >= MAX_RETRY_COUNT) {
          alert(MESSAGES.over_max_retry_count);
          document.dispatchEvent(dispatchCloseModal());
          return;
        } else {
          return retry_function();
        }
      },
    });
  };

  return fetching();
}
