import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

const isDev = process.env.NODE_ENV !== "production";

console.log("ddd:", process.env.NODE_ENV);

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/index.esm.js",
        format: "esm",
      },
      {
        file: "dist/index.cjs.js",
        format: "cjs",
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
        babelHelpers: "bundled",
      }),
      resolve(),
      commonjs({
        transformMixedEsModules: true,
      }),
      typescript(),
      terser(),
    ].filter(Boolean),
  },
];
