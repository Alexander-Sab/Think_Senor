export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = document.createElement("div");
    this.components.forEach((Component) => {
      const component = new Component();
      $root.insertAdjacentHTML("beforeend", component.toHTML()); // для первого рендера вставляем в начало;
    });
    return $root;
  }
  render() {
    // insertAdjacentHTML - этот метод позволяет вставлять HTML-код внутрь элемента
    // afterbegin, afterend, beforebegin, beforeend
    // this / this.$el.insertAdjacentHTML("afterbegin", "<h1>Test</h1>"); // для первого рендера вставляем в начало
    // --- а можно так! ---
    this.$el.append(this.getRoot());
  }
}
