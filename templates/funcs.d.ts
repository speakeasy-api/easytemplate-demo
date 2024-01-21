export {};

declare global {
  var mkDir: (path: string) => void;
  var sanitizeName: (name: string) => string;
}
