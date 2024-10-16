import { capitalize } from "@core/utils";

// для слушателя событий
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No $root provided for DomListener!");
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  // для добовления и удаления слушателя событий
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name || "";
        throw new Error(
          `Method ${method} is not implemented in ${name} Component`
        );
      }
      // Тоже самое, что addEventListener
      this.$root.on(listener, this[method].bind(this));
    });
  }
  // удаления слушателя событий
  removeDOMListeners() {}
}
// input -> onInput
function getMethodName(eventName) {
  return "on" + capitalize(eventName);
}
