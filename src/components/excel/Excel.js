import { $ } from "@core/dom";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create("div", "excel");

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className); // создаем  элемент для компонента
      const component = new Component($el); // прередаем $el как аргумент компонента
      // DEBUG
      // if (component.name) {
      //   window["c" + component.name] = component;
      // }
      $el.html(component.toHTML());
      $root.append($el); // складываем елемент спомощью метода append
      return component;
    });
    return $root;
  }
  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((component) => {
      component.init();
    });
  }
}
