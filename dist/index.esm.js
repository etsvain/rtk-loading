import { createSlice } from '@reduxjs/toolkit';

/**
 * 记录 dispatch 的 effects 状态
 * 声明为async函数是预留给loading的其他操作
 */
var effectsLoading = function (store) { return function (next) { return function (action) {
    // 按照redux设计规范，当存在副作用函数时，action是function
    // 如果是function则执行action，如果不是，则直接dispatch
    var result = typeof action === "function" ? action(store.dispatch, store.getState) : next(action);
    // 如果是副作用函数触发，则存在meta元素
    var meta = action.meta;
    // 当requestStatus的状态为fulfilled时，收集loading
    if (meta && meta.requestStatus) {
        // 按照toolkit的type做切割（toolkit会把一个副作用函数的每一步都加上状态去触发dispatch）
        // 如：namespace/function/status -> a/b/fulfilled
        // 因此需要截取方法名保存
        var actionTypeArr = action.type.split("/");
        var actionType = actionTypeArr.slice(0, actionTypeArr.length - 1).join("/");
        var loading = store.getState().loading;
        // 只保存pending状态的值
        var loadingValue = meta.requestStatus === "pending";
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
}; }; };

var initialState = {
    global: false,
    effects: {},
};
var loadingSlice = createSlice({
    name: "loading",
    initialState: initialState,
    reducers: {
        updateLoading: function (state, action) {
            var payload = action.payload;
            state.effects[payload.key] = payload.value;
            if (Object.values(state.effects).some(function (value) { return value; })) {
                state.global = true;
                // 其他按操作
            }
            else {
                state.global = false;
                // 其他按操作
            }
        },
    },
});
loadingSlice.actions.updateLoading;
var loading = loadingSlice.reducer;

export { effectsLoading as effectsLoadingMiddleware, loading };
