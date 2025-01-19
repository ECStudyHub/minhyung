import { Component } from "../core/Component.js";
import { dispatchCloseModal } from "../events/dispatch.js";

export class ImageModalItem extends Component {
  constructor() {
    super();

    document.addEventListener("keydown", (e) => {
      if (this.props?.system_modal) {
        return;
      }

      if (e.key === "Escape") {
        this.shadowRoot.dispatchEvent(dispatchCloseModal({}));
      }
    });
  }

  static get observedAttributes() {
    return ["file_path", "modal_id", "system_modal"];
  }

  template() {
    return `
        <style>
            * {
                box-sizing: border-box;
            }
            .Modal {
                z-index: 1;
                width: 100%;
                height: 100%;
                position: fixed;
                left: 0;
                top: 0;
                background-color: rgba(0,0,0,0.3);
            }
            .Modal > div {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            img {
                width: 100%;
            }
        </style>
        <div class="Modal">
            <div>
                <img src="${this.props?.file_path ?? ""}"></img>
            </div>
        </div>
    `;
  }
}
