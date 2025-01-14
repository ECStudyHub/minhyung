import { Component } from "../core/Component.js";
import { dispatchDirectory, dispatchOpenModal } from "../events/dispatch.js";

export class NodeItem extends Component {
  static get observedAttributes() {
    return ["item_src", "item_name", "item_type", "item_id", "file_path"];
  }

  constructor() {
    super();
  }

  onAttributeChanged(name, oldValue, newValue) {
    if (name === "item_src") {
      this.props.item_src = JSON.parse(newValue);
    }
    if (name === "item_name") {
      this.props.item_name = JSON.parse(newValue);
    }
    if (name === "item_type") {
      this.props.item_type = JSON.parse(newValue);
    }
    if (name === "item_id") {
      this.props.item_id = JSON.parse(newValue);
    }
    if (name === "file_path") {
      this.props.file_path = JSON.parse(newValue);
    }
  }

  template() {
    const { item_name, item_type, item_src } = this.props ?? {};

    return `
        <style>
          * {
            box-sizing: border-box;
          }     
          .Node {
            width: 140px;
            min-height: 150px;
            padding: 12px;
            margin: 8px;
            text-align: center;
            display: flex;
            flex-direction: column;
            word-break: keep-all;
          }
        </style>
        <div class="Node">
          <div>${item_type !== "PREV" ? item_name ?? "" : ""}</div>
          <img src=${item_src ?? ""}></img>
        </div>  
      `;
  }

  onConnectedDom() {
    this.shadowRoot.addEventListener("click", () => {
      const { item_id, item_name, item_type, file_path } = this.props ?? {};
      // 상위에 디렉토리를 눌렀다는 이벤트 전파
      if (item_type === "DIRECTORY" || item_type === "PREV") {
        this.shadowRoot.dispatchEvent(
          dispatchDirectory({
            id: item_id,
            name: item_name,
            type: item_type,
          })
        );
      }
      // TODO: modal 열기
      else if (item_type === "FILE") {
        this.shadowRoot.dispatchEvent(
          dispatchOpenModal({
            file_path,
          })
        );
      }
    });
  }
}
