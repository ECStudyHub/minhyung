import { Component } from "../core/Component.js";
import { dispatchDirectory } from "../events/dispatch.js";

export class Breadcrumb extends Component {
  static get observedAttributes() {
    return ["title_id", "title_name", "title_type", "is_first_bread"];
  }

  constructor() {
    super();
  }

  onAttributeChanged(name, oldValue, newValue) {
    if (name === "title_id") {
      this.props.title_id = JSON.parse(newValue);
    }
    if (name === "title_name") {
      this.props.title_name = JSON.parse(newValue);
    }
    if (name === "title_type") {
      this.props.title_type = JSON.parse(newValue);
    }
    if (name === "is_first_bread") {
      this.props.is_first_bread = JSON.parse(newValue);
    }
  }

  template() {
    return `
        <style>
          div {
            padding: 4px;
          }
          div::before {
            content: "${this.props?.is_first_bread ? "" : " - "}";
          }
        </style>
        <div>${this?.props?.title_name}</div>
      `;
  }

  onConnectedDom() {
    this.shadowRoot.addEventListener("click", () => {
      this.shadowRoot.dispatchEvent(
        dispatchDirectory({
          id: this.props.title_id,
          name: this.props?.title_name,
          type: this.props?.title_type,
        })
      );
    });
  }
}
