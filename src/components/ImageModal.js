import { Component } from "../core/Component.js";
import { dispatchCloseModal } from "../events/dispatch.js";

export class ImageModal extends Component {
  constructor() {
    super({
      state: {
        show_place_holder: true,
      },
    });
    this.shadowRoot.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.shadowRoot.dispatchEvent(dispatchCloseModal());
      }
    });
  }
  static get observedAttributes() {
    return ["open", "modal_file_path"];
  }

  onAttributeChanged(name, oldValue, newValue) {
    if (name === "open") {
      this.props.open = JSON.parse(newValue);
    }
    if (name === "modal_file_path") {
      this.props.modal_file_path = JSON.parse(newValue);
    }
  }

  template() {
    const loading = "./assets/nyan-cat.gif";
    const src = createImageUrl(this.props?.modal_file_path);
    const onLoad = () => {
      this.setState((prev) => ({
        ...prev,
        show_place_holder: false,
      }));
    };

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
            ${
              this.props?.open
                ? `<div class="Modal">
                        <div>
                            <img id="placeholder" src="${
                              this.state?.show_place_holder ? loading : ""
                            }"><img>
                            <img src="${src}" onload="onLoad()"></img>
                        </div>
                    </div>`
                : ""
            }
        `;
  }
}

function createImageUrl(url = "") {
  const base =
    "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public/";
  if (url[0] === "/") {
    url = url.slice(1);
  }
  return base + url;
}
