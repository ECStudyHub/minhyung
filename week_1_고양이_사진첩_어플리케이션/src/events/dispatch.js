export const updateDirectoryEvent = ({ id, name, type, target } = {}) =>
  new CustomEvent("update-directory", {
    detail: {
      id,
      name,
      type,
      target,
    },
    bubbles: true,
    composed: true,
  });

export const OpenModalEvent = ({ file_path, id, system_modal, target } = {}) =>
  new CustomEvent("open-modal", {
    detail: {
      file_path,
      id,
      system_modal,
      target,
    },
    bubbles: true,
    composed: true,
  });

export const CloseModalEvent = ({ id, target } = {}) =>
  new CustomEvent("close-modal", {
    detail: {
      id,
      target,
    },
    bubbles: true,
    composed: true,
  });
