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

export interface UpdateMeWithAvatarPayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar?: File;
}

export interface GetMeResponse {
  data: IUser & { tenant: { _id: string; name: string } };
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

export interface ActivateAccountPayload {
  token: string;
}

export interface ActivateAccountResponse {
  data: {
    _id: string;
  };
  message: string;
}

export interface ResendActivationLinkPayload {
  email: string;
}

export interface ResendActivationLinkResponse {
  data: {
    message: string;
  };
  message: string;
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

    updateMeWithAvatar: builder.mutation<UpdateMeResponse, UpdateMeWithAvatarPayload>({
      query: (payload) => {
        const formData = new FormData();
        if (payload.first_name) formData.append("first_name", payload.first_name);
        if (payload.last_name) formData.append("last_name", payload.last_name);
        if (payload.phone) formData.append("phone", payload.phone);
        if (payload.avatar) formData.append("avatar", payload.avatar);

        return {
          url: "/auth/me",
          method: "PUT",
          body: formData,
        };
      },
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

    activateAccount: builder.mutation<
      ActivateAccountResponse,
      ActivateAccountPayload
    >({
      query: (payload) => ({
        url: "/auth/activate",
        method: "POST",
        body: payload,
      }),
    }),

    resendActivationLink: builder.mutation<
      ResendActivationLinkResponse,
      ResendActivationLinkPayload
    >({
      query: (payload) => ({
        url: "/auth/resend-activation-link",
        method: "POST",
        body: payload,
      }),
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
  useUpdateMeWithAvatarMutation,
  useChangePasswordMutation,
  useActivateAccountMutation,
  useResendActivationLinkMutation,
} = authSlice;

export default authSlice;
