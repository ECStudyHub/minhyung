import { Component } from "../core/Component.js";

export class Breadcrumbs extends Component {
  static get observedAttributes() {
    return ["items"];
  }

  onAttributeChanged(name, oldValue, newValue) {
    if (name === "items") {
      this.props.items = JSON.parse(newValue);
    }
  }

  template() {
    return `
        <style>
          * {
            box-sizing: border-box;
          }      
          .Breadcrumb {
            height: 62px;
            padding: 16px;
            border-bottom: 1px solid #ccc;
            display: flex;
            flex-direction: row;
          }
        </style>
        <nav class="Breadcrumb">
          ${this.props.items
            .map(({ id, name, type }, idx) => {
              const title_id = JSON.stringify(id ?? "");
              const title_name = JSON.stringify(name ?? "");
              const title_type = JSON.stringify(type ?? "");
              const is_first_bread = JSON.stringify(idx === 0);

              return `
                  <bread-crumb 
                      title_id='${title_id}'
                      title_name='${title_name}'
                      title_type='${title_type}'
                      is_first_bread='${is_first_bread}'
                  ></bread-crumb>`;
            })
            .join("")}
        </nav>
    `;
  }
}
