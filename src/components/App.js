import { getDirectoryInfo } from "../api.js";
import { Component } from "../core/Component.js";

export class App extends Component {
  constructor() {
    super({
      state: {
        header_list: [
          {
            id: "",
            name: "root",
            type: "DIRECTORY",
          },
        ],
        node_list_items: [],
        is_root: true,
        is_modal_open: false,
        modal_file_path: "",
      },
    });

    const getData = async () => {
      const data = await getDirectoryInfo();
      this.setState((prev) => ({
        ...prev,
        node_list_items: data,
      }));
    };
    getData();

    // 상단 클릭 했을 때 처리
    document.addEventListener("update-directory", (e) => {
      const { header_list } = this.state ?? {};
      const { id, name, type } = e.detail;

      if (id === undefined) {
        return;
      }

      const update = async () => {
        const target_item_index = header_list.findIndex(
          (item) => item.id === id
        );

        // 리스트에 존재하지만 마지막 아이템이라면 아무것도 할 필요가 없음
        const has_target_item = target_item_index > -1;
        if (has_target_item && header_list?.length - 1 === target_item_index) {
          return;
        }

        let new_header_list = [...header_list];

        if (has_target_item && new_header_list.length > 1) {
          new_header_list = header_list.slice(0, target_item_index + 1);
        } else {
          new_header_list.push({
            id,
            name,
            type,
          });
        }

        try {
          const new_node_list = await getDirectoryInfo(id);
          this.setState((prev) => ({
            ...prev,
            header_list: new_header_list,
            node_list_items: new_node_list,
            is_root: new_header_list?.length === 1,
          }));
        } catch (e) {}
      };

      update();
    });

    document.addEventListener("open-modal", (e) => {
      const { file_path } = e.detail;
      this.setState((prev) => ({
        ...prev,
        modal_file_path: file_path,
        is_modal_open: true,
      }));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.setState((prev) => ({
          ...prev,
          is_modal_open: false,
        }));
      }
    });
  }

  template() {
    const header_list = JSON.stringify(this.state?.header_list);
    const node_list = JSON.stringify(this.state?.node_list_items);
    const is_root = JSON.stringify(this.state?.is_root);
    const prev_id = JSON.stringify(this.state?.header_list?.at(-2)?.id ?? "");
    const is_modal_open = JSON.stringify(this.state?.is_modal_open);
    const modal_file_path = JSON.stringify(this.state?.modal_file_path ?? "");

    return `
        <style>
          * {
            box-sizing: border-box;
          }     
          .app {
            border: 1px solid #ccc;
            background-color: #fff;
            border-radius: 5px;
            width: 800px;
            height: 600px;
          }
        </style>
        <main class="App">
          <bread-crumbs items='${header_list}'></bread-crumbs>
          <node-list items='${node_list}' is_root='${is_root}' prev_id='${prev_id}'></node-list>
          <image-modal open='${is_modal_open}' modal_file_path='${modal_file_path}'><image-modal>
        </main> 
    `;
  }
}
