import { App } from "./components/App.js";
import { Breadcrumbs } from "./components/Breadcrumbs.js";
import { Breadcrumb } from "./components/Breadcrumb.js";
import { NodeList } from "./components/NodeList.js";
import { NodeItem } from "./components/NodeItem.js";
import { ImageModal } from "./components/ImageModal.js";
import { ImageModalItem } from "./components/ImageModalItem.js";

customElements.define("app-entry", App);
customElements.define("bread-crumbs", Breadcrumbs);
customElements.define("bread-crumb", Breadcrumb);
customElements.define("node-list", NodeList);
customElements.define("node-item", NodeItem);
customElements.define("image-modal", ImageModal);
customElements.define("image-modal-item", ImageModalItem);

document.querySelector("body").innerHTML = "<app-entry></app-entry>";
