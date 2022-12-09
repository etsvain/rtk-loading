interface ILoadingState {
    effects: {
        [key: string]: boolean;
    };
    global: boolean;
}
export declare const loadingSlice: import("@reduxjs/toolkit").Slice<ILoadingState, {
    updateLoading: (state: any, action: any) => void;
}, "loading">;
export declare const selectLoading: (state: ILoadingState) => ILoadingState;
export declare const updateLoading: import("@reduxjs/toolkit").ActionCreatorWithNonInferrablePayload<"loading/updateLoading"> | import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"loading/updateLoading">;
declare const _default: import("redux").Reducer<ILoadingState, import("redux").AnyAction>;
export default _default;
