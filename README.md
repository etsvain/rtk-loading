

  build with @reduxjs/toolkit.
 
 A rtk extraReducer method execution process collector

 The execution status of the current method can be obtained from the 【loading.effects】 of the 【store】 every time the createAsyncThunk executes


### step1
```

npm install rtk-loading

```

### step2
```
import { configureStore } from "@reduxjs/toolkit";
import { loading, effectsLoadingMiddleware } from "rtk-loading";

const store = configureStore({
  reducer: {
    loading: loading,
    //... you reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(effectsLoadingMiddleware),
});

export default store;

```