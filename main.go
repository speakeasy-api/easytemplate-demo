package main

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"path/filepath"

	"github.com/dop251/goja"
	"github.com/ettle/strcase"
	"github.com/speakeasy-api/easytemplate"
)

type Data struct {
	FileName string
	Data     any
}

func sanitizeName(name string) string {
	return strcase.ToGoPascal(name)
}

func main() {
	// Create a new easytemplate engine.
	engine := easytemplate.New(
		easytemplate.WithJSFuncs(map[string]func(call easytemplate.CallContext) goja.Value{
			"mkDir": func(call easytemplate.CallContext) goja.Value {
				path := call.Argument(0).String()
				if err := os.MkdirAll(path, os.ModePerm); err != nil {
					panic(err)
				}
				return nil
			},
			"sanitizeName": func(call easytemplate.CallContext) goja.Value {
				name := call.Argument(0).String()
				return call.VM.Runtime.ToValue(sanitizeName(name))
			},
		}),
		easytemplate.WithTemplateFuncs(map[string]any{
			"sanitizeName": sanitizeName,
		}),
	)

	dataFile := "bar.json"

	raw, err := os.ReadFile(dataFile)
	if err != nil {
		log.Fatal(err)
	}

	data := Data{
		FileName: filepath.Base(dataFile),
		Data:     nil,
	}
	if err := json.Unmarshal(raw, &data.Data); err != nil {
		log.Fatal(err)
	}

	if err := engine.Init(context.Background(), data); err != nil {
		log.Fatal(err)
	}

	// Start the engine from a typescript entrypoint.
	if err := engine.RunScript(context.Background(), "templates/main.ts"); err != nil {
		log.Fatal(err)
	}
}
