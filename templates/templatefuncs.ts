function sanitizeType(type: TypeDef): string {
  switch (type.Type) {
    case Types.Object:
      if (!type.Name) throw new Error("Object type must have a name");
      return sanitizeName(type.Name);
    case Types.Array:
      if (!type.ItemType) throw new Error("Array type must have an item type");
      return `[]${sanitizeType(type.ItemType)}`;
    case Types.String:
      return "string";
    case Types.Integer:
      return "int64";
    case Types.Float:
      return "float64";
    case Types.Boolean:
      return "bool";
    default:
      throw new Error(`Unsupported type: ${type.Type}`);
  }
}
registerTemplateFunc("sanitizeType", sanitizeType);

function templateStructTag(field: FieldDef): string {
  // If the field name already matches the sanitized name, don't add a tag as it's not needed
  if (field.Name == sanitizeName(field.Name)) {
    return "";
  }

  return `\`json:"${field.Name}"\``;
}
registerTemplateFunc("templateStructTag", templateStructTag);
