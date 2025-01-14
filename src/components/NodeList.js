import { Component } from "../core/Component.js";

export class NodeList extends Component {
  static get observedAttributes() {
    return ["items", "is_root", "prev_id"];
  }

  onAttributeChanged(name, oldValue, newValue) {
    if (name === "items") {
      this.props.items = JSON.parse(newValue);
    }
    if (name === "is_root") {
      this.props.is_root = JSON.parse(newValue);
    }
    if (name === "prev_id") {
      this.props.prev_id = JSON.parse(newValue);
    }
  }

  template() {
    const img_src = {
      DIRECTORY: "./assets/directory.png",
      FILE: "./assets/file.png",
      PREV: "./assets/prev.png",
      default: "",
    };

    const items = [];
    if (!this.props?.is_root) {
      items.push({
        id: this.props?.prev_id ?? "",
        type: "PREV",
      });
    }
    items.push(...(this.props?.items ?? []));

    return `
        <style>
          * {
            box-sizing: border-box;
          }     
          .Nodes {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
          }
        </style>
        <div class="Nodes">
          ${items
            .map((item) => {
              const item_id = JSON.stringify(item.id ?? "");
              const item_type = JSON.stringify(item.type ?? "");
              const item_name = JSON.stringify(item.name ?? "");
              const file_path = JSON.stringify(item.filePath ?? "");
              const item_src = JSON.stringify(img_src[item.type] ?? "");

              return `
              <node-item
                item_id='${item_id}'
                item_type='${item_type}'
                item_name='${item_name}'
                file_path='${file_path}'
                item_src='${item_src}'
              ></node-item>
            `;
            })
            .join("")}
        </div> 
      `;
  }
}
