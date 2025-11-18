import { ILoginResponse, IRegisterPayload, IUser } from "@/lib/types/user.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface RegisterResponse {
  data: {
    _id: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshTokenPayload {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  data: {
    access_token: string;
  };
}

export interface UpdateMePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface GetMeResponse {
  data: IUser;
}

export interface UpdateMeResponse {
  data: IUser;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  data: {
    _id: string;
  };
}

export interface LogoutResponse {
  data: {
    success: boolean;
  };
}

const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/proxy/api/v1",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation<
      {
        data: {
          _id: string;
        };
      },
      IRegisterPayload
    >({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<ILoginResponse, LoginPayload>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenPayload>({
      query: (payload) => ({
        url: "/auth/refresh",
        method: "POST",
        body: payload,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    getMe: builder.query<GetMeResponse, string | undefined>({
      query: (fields) => {
        const url = fields ? `/auth/me?fields=${fields}` : "/auth/me";
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Auth"],
    }),

    updateMe: builder.mutation<UpdateMeResponse, UpdateMePayload>({
      query: (payload) => ({
        url: "/auth/me",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),

    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordPayload
    >({
      query: (payload) => ({
        url: "/auth/me/password",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
} = authSlice;

export default authSlice;
