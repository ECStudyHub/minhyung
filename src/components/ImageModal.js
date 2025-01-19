import { Component } from "../core/Component.js";

export class ImageModal extends Component {
  static get observedAttributes() {
    return ["modal_list"];
  }

  template() {
    return `
      <style>
          * {
              box-sizing: border-box;
          }
      </style>
      ${this.props?.modal_list?.map?.(
        ({ file_path, id, system_modal }) => `
        <image-modal-item
          file_path='${JSON.stringify(file_path)}'
          modal_id='${JSON.stringify(id)}'
          system_modal='${JSON.stringify(system_modal)}'
        ></image-modal-item>
      `
      )}
    `;
  }
}
