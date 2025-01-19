import { getDirectoryInfo } from "../api.js";
import { Component } from "../core/Component.js";
import { fetch_with_load_process } from "../core/my_fetch.js";

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
        modal_list: [], // {file_path: string, id: string}
      },
    });

    // directory 바꾸는 이벤트 상단에서 모두처리
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

        const has_target_item = target_item_index > -1;
        // 리스트에 존재하지만 마지막 아이템이라면 아무것도 할 필요가 없음
        if (has_target_item && header_list?.length - 1 === target_item_index) {
          return;
        }

        let new_header_list = [...header_list];

        // 이미 헤더에 존재하는 아이템이고, 헤더에 root를 제외한 아이템이 있다면
        // 클릭한 아이템을 기준으로 이후 아이템들을 제거
        if (has_target_item && new_header_list.length > 1) {
          new_header_list = header_list.slice(0, target_item_index + 1);
        }
        // 헤더에 존재하기 않거나, 헤더에 root만 존재한다면
        // 클릭한 아이템을 헤더에 추가
        else {
          new_header_list.push({
            id,
            name,
            type,
          });
        }

        try {
          const new_node_list = await fetch_with_load_process(() =>
            getDirectoryInfo(id)
          );
          if (!new_node_list) {
            return;
          }
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
      const { id, file_path, system_modal } = e.detail;
      this.setState((prev) => ({
        ...prev,
        modal_list: prev.modal_list.concat({ id, file_path, system_modal }),
      }));
    });

    document.addEventListener("close-modal", (e) => {
      this.setState((prev) => ({
        ...prev,
        modal_list: prev.modal_list.slice(0, prev.modal_list.length - 1),
      }));
    });

    const getData = async () => {
      const data = await fetch_with_load_process(getDirectoryInfo);
      if (!data) {
        return;
      }
      this.setState((prev) => ({
        ...prev,
        node_list_items: data,
      }));
    };
    getData();
  }

  template() {
    const header_list = JSON.stringify(this.state?.header_list);
    const node_list = JSON.stringify(this.state?.node_list_items);
    const is_root = JSON.stringify(this.state?.is_root);
    const prev_id = JSON.stringify(this.state?.header_list?.at(-2)?.id ?? "");
    const modal_list = JSON.stringify(this.state?.modal_list ?? "");

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
        <image-modal modal_list='${modal_list}'><image-modal>
      </main> 
    `;
  }
}
