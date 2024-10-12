// утилита для удобства работы с DOM, а-ля джейквери (jQuery)

class Dom {
  constructor(selector) {
    // #app
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }
  // работа html как jQuery (добавляет, удаляет, заменяет)
  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html("");
    return this;
  }
  append(node) {
    console.log("append", node);

    if (Element.prototype.append) {
      if (node instanceof Dom) {
        node = node.$el;
      }
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}
// создание элемента с заданными параметрами (класс и атрибуты)
$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return new Dom(el);
};
