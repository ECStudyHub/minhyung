export const dispatchDirectory = ({ id, name, type }) =>
  new CustomEvent("update-directory", {
    detail: {
      id,
      name,
      type,
    },
    bubbles: true,
    composed: true,
  });

export const dispatchOpenModal = ({ file_path, id, system_modal }) =>
  new CustomEvent("open-modal", {
    detail: {
      file_path,
      id,
      system_modal,
    },
    bubbles: true,
    composed: true,
  });

export const dispatchCloseModal = ({ id } = { id: "" }) =>
  new CustomEvent("close-modal", {
    detail: {
      id,
    },
    bubbles: true,
    composed: true,
  });
