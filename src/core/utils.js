// храним вспомогательные функции
// Puere function

export function capitalize(string) {
  if (typeof string !== "string") {
    return "";
  }
  return string[0].charAt(0).toUpperCase() + string.slice(1);
}
