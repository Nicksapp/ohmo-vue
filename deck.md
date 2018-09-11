# MDX 演示文档接入

> 接入在线演示文档 mdx-deck 库


* [语法](https://mdxjs.com/)

对应文件夹根目录下 `./deck`, 每个子文件夹对应一个演示文档。

## 构建 Build

```bash
./node_module/.bash/mdx-deck build deck/xxx.mdx -d ./public/deck/...
```

cli Options

```bash
-p --port     Dev server port
--no-open     Prevent from opening in default browser
-d --out-dir  Output directory for exporting
--no-html     Disable static HTML rendering
--out-file    Filename for screenshot or PDF export
--width       Width in pixels
--height      Height in pixels
--webpack     Path to webpack config file
```

## 拓展插件

* `mdx-deck-code-surfer` [文档](https://github.com/pomber/code-surfer) 代码突出显示

## 文档目录

```
1. babel-plugin babel插件原理深入

$ ./node_modules/.bin/mdx-deck build deck/babel-plugin/index.mdx -d ./public/deck/babel-plugin
```