import { DomListener } from "@core/DomListener";
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
  }
  // Возврыщает шаблон компонента (HTML-код)
  toHTML() {
    return "";
  }

  init() {
    this.initDOMListeners();
  }
}
