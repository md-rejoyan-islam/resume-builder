import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./features/auth/auth-slice";
import coverLetterSlice from "./features/cover-letter/cover-letter-slice";
import disclosureLetterSlice from "./features/disclosure-letter/disclosure-letter-slice";
import resumeSlice from "./features/resume/resume-slice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [resumeSlice.reducerPath]: resumeSlice.reducer,
    [coverLetterSlice.reducerPath]: coverLetterSlice.reducer,
    [disclosureLetterSlice.reducerPath]: disclosureLetterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authSlice.middleware)
      .concat(resumeSlice.middleware)
      .concat(coverLetterSlice.middleware)
      .concat(disclosureLetterSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
