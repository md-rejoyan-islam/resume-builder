import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  DisclosureLetterFormatData,
  DisclosureLetterTheme,
  PersonalInfo,
  DisclosureContent,
  DisclosureType,
} from "./disclosure-letter-format";

// =============================================================================
// Types
// =============================================================================

export interface DisclosureLetterListItem {
  _id: string;
  title: string;
  isDefault: boolean;
  status: "draft" | "completed";
  disclosureType?: DisclosureType;
  createdAt: string;
  updatedAt: string;
}

export interface DisclosureLetter extends DisclosureLetterFormatData {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  items: number;
  limit: number;
  page: number;
  totalPages: number;
}

export interface ListDisclosureLettersResponse {
  data: DisclosureLetterListItem[];
  pagination: Pagination;
}

export interface GetDisclosureLetterResponse {
  data: DisclosureLetter;
}

export interface GetDefaultDisclosureLetterResponse {
  data: DisclosureLetter | null;
}

export interface CreateDisclosureLetterResponse {
  data: {
    _id: string;
  };
}

export interface UpdateDisclosureLetterResponse {
  data: DisclosureLetter;
}

export interface DeleteDisclosureLetterResponse {
  data: {
    _id: string;
  };
}

export interface DuplicateDisclosureLetterResponse {
  data: {
    _id: string;
  };
}

export interface SetDefaultDisclosureLetterResponse {
  data: {
    _id: string;
  };
}

export interface DisclosureLetterCountResponse {
  count: number;
}

export interface ListDisclosureLettersQuery {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "title";
  sortOrder?: "asc" | "desc";
  search?: string;
  status?: "draft" | "completed";
  disclosureType?: DisclosureType;
}

export interface CreateDisclosureLetterPayload {
  title: string;
  isDefault?: boolean;
  status?: "draft" | "completed";
  disclosureType?: DisclosureType;
  theme?: DisclosureLetterTheme;
  personalInfo: PersonalInfo;
  disclosureContent: DisclosureContent;
}

export interface UpdateDisclosureLetterPayload {
  id: string;
  data: Partial<CreateDisclosureLetterPayload>;
}

export interface DuplicateDisclosureLetterPayload {
  id: string;
  title?: string;
}

export interface UploadPdfDisclosureLetterResponse {
  data: {
    _id: string;
  };
}

// =============================================================================
// RTK Query API Slice
// =============================================================================

const disclosureLetterSlice = createApi({
  reducerPath: "disclosureLetter",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/proxy/api/v1",
  }),
  tagTypes: [
    "DisclosureLetter",
    "DisclosureLetterList",
    "DefaultDisclosureLetter",
    "DisclosureLetterCount",
  ],
  endpoints: (builder) => ({
    // List all disclosure letters for the authenticated user
    listDisclosureLetters: builder.query<
      ListDisclosureLettersResponse,
      ListDisclosureLettersQuery | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set("page", String(params.page));
        if (params?.limit) searchParams.set("limit", String(params.limit));
        if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
        if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
        if (params?.search) searchParams.set("search", params.search);
        if (params?.status) searchParams.set("status", params.status);
        if (params?.disclosureType)
          searchParams.set("disclosureType", params.disclosureType);

        const queryString = searchParams.toString();
        return {
          url: queryString
            ? `/disclosure-letters?${queryString}`
            : "/disclosure-letters",
          method: "GET",
        };
      },
      providesTags: ["DisclosureLetterList"],
    }),

    // Get a single disclosure letter by ID
    getDisclosureLetter: builder.query<GetDisclosureLetterResponse, string>({
      query: (id) => ({
        url: `/disclosure-letters/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "DisclosureLetter", id }],
    }),

    // Get the user's default disclosure letter
    getDefaultDisclosureLetter: builder.query<
      GetDefaultDisclosureLetterResponse,
      void
    >({
      query: () => ({
        url: "/disclosure-letters/default",
        method: "GET",
      }),
      providesTags: ["DefaultDisclosureLetter"],
    }),

    // Get disclosure letter count
    getDisclosureLetterCount: builder.query<DisclosureLetterCountResponse, void>(
      {
        query: () => ({
          url: "/disclosure-letters/count",
          method: "GET",
        }),
        providesTags: ["DisclosureLetterCount"],
      }
    ),

    // Create a new disclosure letter
    createDisclosureLetter: builder.mutation<
      CreateDisclosureLetterResponse,
      CreateDisclosureLetterPayload
    >({
      query: (payload) => ({
        url: "/disclosure-letters",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [
        "DisclosureLetterList",
        "DefaultDisclosureLetter",
        "DisclosureLetterCount",
      ],
    }),

    // Update a disclosure letter
    updateDisclosureLetter: builder.mutation<
      UpdateDisclosureLetterResponse,
      UpdateDisclosureLetterPayload
    >({
      query: ({ id, data }) => ({
        url: `/disclosure-letters/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DisclosureLetter", id },
        "DisclosureLetterList",
        "DefaultDisclosureLetter",
      ],
    }),

    // Delete a disclosure letter
    deleteDisclosureLetter: builder.mutation<
      DeleteDisclosureLetterResponse,
      string
    >({
      query: (id) => ({
        url: `/disclosure-letters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "DisclosureLetterList",
        "DefaultDisclosureLetter",
        "DisclosureLetterCount",
      ],
    }),

    // Duplicate a disclosure letter
    duplicateDisclosureLetter: builder.mutation<
      DuplicateDisclosureLetterResponse,
      DuplicateDisclosureLetterPayload
    >({
      query: ({ id, title }) => ({
        url: `/disclosure-letters/${id}/duplicate`,
        method: "POST",
        body: title ? { title } : {},
      }),
      invalidatesTags: ["DisclosureLetterList", "DisclosureLetterCount"],
    }),

    // Set a disclosure letter as default
    setDefaultDisclosureLetter: builder.mutation<
      SetDefaultDisclosureLetterResponse,
      string
    >({
      query: (id) => ({
        url: `/disclosure-letters/${id}/default`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DisclosureLetter", id },
        "DisclosureLetterList",
        "DefaultDisclosureLetter",
      ],
    }),

    // Upload PDF and extract disclosure letter data using AI
    uploadPdfDisclosureLetter: builder.mutation<
      UploadPdfDisclosureLetterResponse,
      FormData
    >({
      query: (formData) => ({
        url: "/disclosure-letters/upload-pdf",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [
        "DisclosureLetterList",
        "DefaultDisclosureLetter",
        "DisclosureLetterCount",
      ],
    }),
  }),
});

// =============================================================================
// Export Hooks
// =============================================================================

export const {
  useListDisclosureLettersQuery,
  useGetDisclosureLetterQuery,
  useLazyGetDisclosureLetterQuery,
  useGetDefaultDisclosureLetterQuery,
  useGetDisclosureLetterCountQuery,
  useCreateDisclosureLetterMutation,
  useUpdateDisclosureLetterMutation,
  useDeleteDisclosureLetterMutation,
  useDuplicateDisclosureLetterMutation,
  useSetDefaultDisclosureLetterMutation,
  useUploadPdfDisclosureLetterMutation,
} = disclosureLetterSlice;

export default disclosureLetterSlice;
