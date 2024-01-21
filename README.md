# easytemplate-demo

This is a demo project for [easytemplate](https://github.com/speakeasy-api/easytemplate) showing a use case the mimics one of the many online JSON to Go struct converters available.

Giving a glimpse into how easytemplate is used at Speakeasy to generate the SDKs via our generator at [Speakeasy](https://speakeasyapi.dev).

## Usage

To run the demo, clone the repo and run the following command:

```bash
go run main.go
```

This will read the `bar.json` file and generate the `bar.go` file in the `out/bar/` directory.
