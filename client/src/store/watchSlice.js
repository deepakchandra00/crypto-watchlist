import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setErrorStatus } from "../component/utils/setErrorMessage";

const initialState = {
  loading: true,
  list: [],
  error: "",
};

export const fetchList = createAsyncThunk("watchList", async () => {
  return await axios
    .get("http://localhost:8000/watchlist")
    .then((response) => response.data);
});

const fetchLists = createSlice({
  name: "watchlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.error = "";
    });
    builder.addCase(fetchList.rejected, (state, action) => {
      state.loading = true;
      state.error = setErrorStatus(action.error);
    });
  },
});

export default fetchLists.reducer;
