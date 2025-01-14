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

export const dispatchOpenModal = ({ file_path }) =>
  new CustomEvent("open-modal", {
    detail: {
      file_path,
    },
    bubbles: true,
    composed: true,
  });

export const dispatchCloseModal = () =>
  new CustomEvent("open-modal", {
    bubbles: true,
    composed: true,
  });
