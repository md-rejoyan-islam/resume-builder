import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050/api/v1" }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({}),
});

export default authSlice;
