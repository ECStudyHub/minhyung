// import { dispatchEvent } from "../events/EventManager";

import { event_manager } from "../events/EventManager.js";

export class Component extends HTMLElement {
  event_manager = event_manager;

  static get observedAttributes() {
    return [];
  }

  constructor(props) {
    super();
    this.attachShadow({ mode: "open" });
    this.state = props?.state;
    this.props = {};
  }

  addEventListener(event_name, callback, options) {
    // const custom_event = new CustomEvent(event_name, {
    //   bubbles: true,
    //   composed: true,
    //   detail: { target: this, callback },
    // });
    this.event_manager.addEventListener(this, event_name, callback, options);
  }

  // removeEventListener(event_name, callback) {
  //   this.event_manager.removeEventListener(
  //     this.shadowRoot,
  //     event_name,
  //     callback
  //   );
  // }

  connectedCallback() {
    this.#render();
    this.onConnectedDom();
  }

  disconnectedCallback() {
    this.onDisconnectedDom();
  }

  adoptedCallback() {
    this.onAdopted();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    this.props[name] = JSON.parse(newValue);

    this.onAttributeChanged(name, oldValue, newValue);
    this.#render();
  }

  onConnectedDom() {}
  onDisconnectedDom() {}
  onAdopted() {}
  onAttributeChanged() {}

  template() {
    return "";
  }

  #render() {
    this.shadowRoot.innerHTML = this.template();
  }

  setState(newState) {
    if (typeof newState === "function") {
      this.state = newState(this.state);
    } else {
      this.state = newState;
    }

    this.#render();
  }
}
