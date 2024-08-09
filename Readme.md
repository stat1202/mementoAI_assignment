# 프론트엔드 개발 과제 - 한승재

이 프로젝트는 Webpack 설정을 직접 구성하고, 주어진 요구사항에 따라 동작하는 드래그 앤 드롭 기능을 구현하는 과제입니다. `react-beautiful-dnd` 라이브러리를 사용하여, 지정된 드래그 제약 조건을 만족하는 애플리케이션을 만들어야 합니다. 제공되는 최소 기능의 초기 파일을 기반으로 시작하여 아래의 과제들을 수행해야 합니다.

## 폴더구조

```
 ┣ 📂public
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📂DragDrop
 ┃ ┃ ┃ ┣ 📜DragDropContainer.tsx
 ┃ ┃ ┃ ┣ 📜DraggableItem.tsx
 ┃ ┃ ┃ ┣ 📜DragNDropProvider.tsx
 ┃ ┃ ┃ ┗ 📜DroppableItem.tsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜useDragDrop.tsx
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜item.d.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜item.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┗ 📜index.tsx
```

## 구현 결과

### Webpack 적용

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const prod = argv.mode === "production";

  return {
    mode: prod ? "production" : "development",
    devtool: prod ? "hidden-source-map" : "eval",
    entry: "./src/index.tsx",
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "[name].js",
    },
    devServer: {
      port: 3000,
      hot: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["babel-loader", "ts-loader"],
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, "src"),
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify:
          process.env.NODE_ENV === "production"
            ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
              }
            : false,
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
```

### 드래그 제약 조건

#### 1. 첫 번째 칼럼에서 세 번째 칼럼으로는 아이템 이동이 불가능

https://github.com/user-attachments/assets/8a76daa6-78f5-41ef-bb2c-b96525c2f33f

#### 2. 짝수 아이템은 다른 짝수 아이템 앞으로 이동 불가능

https://github.com/user-attachments/assets/3cb9bd14-c6f3-4a88-a21e-0cc535447c7e

#### 3. 이동할 수 없는 지적으로 아이템 드래그 시, 제약이 있을을 알림

https://github.com/user-attachments/assets/1f67994f-c1d8-4cbc-ade9-68253039a5b9

- 이동이 불가능한 곳으로 드래그 중 이동 시 요소가 붉은 색으로 표시되어 제약이 있음을 알렸습니다.
### 멀티 드래그

https://github.com/user-attachments/assets/23c1faac-9253-4c1b-a92c-849bcd8a0262

- 드래그 시 사용자가 선택한 요소의 개수를 볼 수 있도록 설계했습니다.

## 개발 지침

- UX를 고려하여 사용자 친화적인 인터페이스를 설계하세요. (이를 위해 과제 목표 외 UI 및 기능을 추가하여도 좋습니다.)
- 1번 항목을 제외한 과제는 `react-beautiful-dnd` 외 다른 라이브러리를 사용할 수 없습니다.
- 단, 스타일은 본인이 자주 사용하는 스타일 사용(CSS-in-JS, tailwind 등)

## 제출 방법

완성된 프로젝트 코드를 Git 저장소에 올리고, 해당 저장소 링크를 제출하세요.

### 평가 기준

- Webpack 설정의 정확성
- 드래그 앤 드롭 기능의 정확한 구현
- 코드의 가독성 및 구조화
- 사용자 경험 및 인터페이스 디자인
