import { configureStore } from "@reduxjs/toolkit";
import watches from "./watchSlice";

export default configureStore({
  reducer: {
    watches,
  },
});
