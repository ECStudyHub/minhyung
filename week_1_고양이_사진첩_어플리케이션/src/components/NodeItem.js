import { Component } from "../core/Component.js";
import { updateDirectoryEvent, OpenModalEvent } from "../events/dispatch.js";

export class NodeItem extends Component {
  static get observedAttributes() {
    return ["item_src", "item_name", "item_type", "item_id", "file_path"];
  }

  constructor() {
    super();
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
    this.clickEventHandler = (e) => {
      const { item_id, item_name, item_type, file_path } = this.props ?? {};
      // 상위에 디렉토리를 눌렀다는 이벤트 전파
      if (item_type === "DIRECTORY" || item_type === "PREV") {
        this.dispatchEvent(
          updateDirectoryEvent({
            id: item_id,
            name: item_name,
            type: item_type,
            target: this,
          })
        );
      }
      // 파일이라면 파일 열기
      else if (item_type === "FILE") {
        const base =
          "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public";

        this.dispatchEvent(
          OpenModalEvent({
            file_path: `${base}/${file_path}`,
            id: item_id,
          })
        );
      }
    };
    this.addEventListener("click", this.clickEventHandler);
  }
  onDisconnectedDom() {
    this.removeEventListener("click", this.clickEventHandler);
  }
}

// modal은 여러개가 중첩될 수 있음.
// 여기 안에는
