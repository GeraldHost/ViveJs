export const serialize = form => {
  const getRowObj = (name, value) => ({
    [encodeURIComponent(name)]: encodeURIComponent(value),
  });
  let serialized = [];
  for (var i = 0; i < form.elements.length; i++) {
    let field = form.elements[i];
    if (
      !field.name ||
      field.disabled ||
      field.type === "file" ||
      field.type === "reset" ||
      field.type === "submit" ||
      field.type === "button"
    ) {
      continue;
    }

    if (field.type === "select-multiple") {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
        serialized.push(getRowObj(field.name, field.options[n].value));
      }
    } else if (
      (field.type !== "checkbox" && field.type !== "radio") ||
      field.checked
    ) {
      serialized.push(getRowObj(field.name, field.value));
    }
  }

  return serialized;
};
