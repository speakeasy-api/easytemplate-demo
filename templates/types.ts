enum Types {
  Object = 1,
  Array = 2,
  String = 3,
  Integer = 4,
  Float = 5,
  Boolean = 6,
}

type FieldDef = {
  Name: string;
  Type: TypeDef;
};

type TypeDef = {
  Type: Types;
  Name?: string;
  Fields?: FieldDef[];
  ItemType?: TypeDef;
};

function determineType(name: string, data: any): FieldDef {
  switch (true) {
    case Array.isArray(data):
      return {
        Name: name,
        Type: {
          Type: Types.Array,
          ItemType: determineType(name, data[0])?.Type,
        },
      };
    case typeof data === "object":
      const type: FieldDef = {
        Name: name,
        Type: {
          Type: Types.Object,
          Name: name,
        },
      };

      for (const key in data) {
        const field = determineType(key, data[key]);
        type.Type.Fields = type.Type.Fields || [];
        type.Type.Fields.push(field);
      }

      return type;
    case typeof data === "string":
      return {
        Name: name,
        Type: {
          Type: Types.String,
        },
      };
    case typeof data === "number":
      return {
        Name: name,
        Type: {
          Type: Number.isInteger(data) ? Types.Integer : Types.Float,
        },
      };
    case typeof data === "boolean":
      return {
        Name: name,
        Type: {
          Type: Types.Boolean,
        },
      };
    default:
      throw new Error(`Unsupported type for ${name}: ${typeof data}`);
  }
}

function getObjects(type: TypeDef): TypeDef[] {
  const objects: TypeDef[] = [];

  if (type.Type === Types.Object) {
    objects.push(type);
  }

  if (type.Fields) {
    for (const field of type.Fields) {
      objects.push(...getObjects(field.Type));
    }
  } else if (type.ItemType) {
    objects.push(...getObjects(type.ItemType));
  }

  return objects;
}
