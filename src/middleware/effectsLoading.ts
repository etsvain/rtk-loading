import { Middleware } from "@reduxjs/toolkit";
/**
 * 记录 dispatch 的 effects 状态
 * 声明为async函数是预留给loading的其他操作
 */
const effectsLoading: Middleware = (store) => (next) => (action) => {
  // 按照redux设计规范，当存在副作用函数时，action是function
  // 如果是function则执行action，如果不是，则直接dispatch
  let result = typeof action === "function" ? action(store.dispatch, store.getState) : next(action);
  // 如果是副作用函数触发，则存在meta元素
  const { meta } = action;
  // 当requestStatus的状态为fulfilled时，收集loading
  if (meta && meta.requestStatus) {
    // 按照toolkit的type做切割（toolkit会把一个副作用函数的每一步都加上状态去触发dispatch）
    // 如：namespace/function/status -> a/b/fulfilled
    // 因此需要截取方法名保存
    const actionTypeArr = action.type.split("/");
    const actionType = actionTypeArr.slice(0, actionTypeArr.length - 1).join("/");
    const { loading } = store.getState();
    // 只保存pending状态的值
    const loadingValue = meta.requestStatus === "pending";
    // 如果当前状态不相等，则保存effect-loading
    if (loadingValue !== loading[actionType]) {
      next({
        type: "loading/updateLoading",
        payload: {
          key: actionType,
          value: loadingValue,
        },
      });
    }
  }
  return result;
};

export default effectsLoading;
