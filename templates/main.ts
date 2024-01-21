require("templates/types.ts");
require("templatefuncs.ts");

const mainTypeName = context.Local.FileName.substring(
  0,
  context.Local.FileName.lastIndexOf(".")
);

const mainTypeField = determineType(mainTypeName, context.Local.Data);
var mainType: TypeDef;

if (mainTypeField.Type.Type === Types.Object) {
  mainType = mainTypeField.Type;
} else {
  mainType = {
    Type: Types.Object,
    Name: mainTypeName,
    Fields: [mainTypeField],
  };
}

const allObjects = getObjects(mainType);

const outDir = `out/${mainTypeName}`;
const outFile = `${outDir}/${mainTypeName}.go`;

mkDir(outDir);

templateFile("templates/types.go.stmpl", outFile, {
  PackageName: mainTypeName,
  Types: allObjects,
});
