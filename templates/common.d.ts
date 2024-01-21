export {};

declare global {
  interface GlobalContext {}

  type GlobalComputed = {} & Record<string, any>;

  type Data = {
    FileName: string;
    Data: any;
  };

  interface Context {
    Global: GlobalContext;
    Local: Data;
    GlobalComputed: GlobalComputed;
    LocalComputed: any;
    RecursiveComputed: any;
  }

  var context: Context;

  var templateFile: (
    templateFile: string,
    targetFile: string,
    values: any
  ) => void;

  var registerTemplateFunc: (name: string, func: (...any) => void) => void;
}
