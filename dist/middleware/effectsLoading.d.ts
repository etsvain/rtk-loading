import { Middleware } from "@reduxjs/toolkit";
/**
 * 记录 dispatch 的 effects 状态
 * 声明为async函数是预留给loading的其他操作
 */
declare const effectsLoading: Middleware;
export default effectsLoading;
