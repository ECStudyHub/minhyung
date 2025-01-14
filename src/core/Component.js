export class Component extends HTMLElement {
  static get observedAttributes() {
    return [];
  }
  constructor(props) {
    super();
    this.attachShadow({ mode: "open" });
    this.state = props?.state;
    this.props = {};
  }

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
    this.onConnectedDom();
  }
}
