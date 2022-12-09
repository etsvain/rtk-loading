### How to use

### 1. install
```

npm install rtk-loading

```

### 2. use 
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