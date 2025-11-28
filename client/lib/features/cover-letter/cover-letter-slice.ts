import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CoverLetterFormatData,
  CoverLetterTheme,
  PersonalInfo,
  LetterContent,
} from "./cover-letter-format";

// =============================================================================
// Types
// =============================================================================

export interface CoverLetterListItem {
  _id: string;
  title: string;
  isDefault: boolean;
  status: "draft" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface CoverLetter extends CoverLetterFormatData {
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

export interface ListCoverLettersResponse {
  data: CoverLetterListItem[];
  pagination: Pagination;
}

export interface GetCoverLetterResponse {
  data: CoverLetter;
}

export interface GetDefaultCoverLetterResponse {
  data: CoverLetter | null;
}

export interface CreateCoverLetterResponse {
  data: {
    _id: string;
  };
}

export interface UpdateCoverLetterResponse {
  data: CoverLetter;
}

export interface DeleteCoverLetterResponse {
  data: {
    _id: string;
  };
}

export interface DuplicateCoverLetterResponse {
  data: {
    _id: string;
  };
}

export interface SetDefaultCoverLetterResponse {
  data: {
    _id: string;
  };
}

export interface CoverLetterCountResponse {
  count: number;
}

export interface ListCoverLettersQuery {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "title";
  sortOrder?: "asc" | "desc";
  search?: string;
  status?: "draft" | "completed";
}

export interface CreateCoverLetterPayload {
  title: string;
  isDefault?: boolean;
  status?: "draft" | "completed";
  theme?: CoverLetterTheme;
  personalInfo: PersonalInfo;
  letterContent: LetterContent;
}

export interface UpdateCoverLetterPayload {
  id: string;
  data: Partial<CreateCoverLetterPayload>;
}

export interface DuplicateCoverLetterPayload {
  id: string;
  title?: string;
}

export interface UploadPdfCoverLetterResponse {
  data: {
    _id: string;
  };
}

// =============================================================================
// RTK Query API Slice
// =============================================================================

const coverLetterSlice = createApi({
  reducerPath: "coverLetter",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/proxy/api/v1",
  }),
  tagTypes: [
    "CoverLetter",
    "CoverLetterList",
    "DefaultCoverLetter",
    "CoverLetterCount",
  ],
  endpoints: (builder) => ({
    // List all cover letters for the authenticated user
    listCoverLetters: builder.query<
      ListCoverLettersResponse,
      ListCoverLettersQuery | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set("page", String(params.page));
        if (params?.limit) searchParams.set("limit", String(params.limit));
        if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
        if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
        if (params?.search) searchParams.set("search", params.search);
        if (params?.status) searchParams.set("status", params.status);

        const queryString = searchParams.toString();
        return {
          url: queryString
            ? `/cover-letters?${queryString}`
            : "/cover-letters",
          method: "GET",
        };
      },
      providesTags: ["CoverLetterList"],
    }),

    // Get a single cover letter by ID
    getCoverLetter: builder.query<GetCoverLetterResponse, string>({
      query: (id) => ({
        url: `/cover-letters/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "CoverLetter", id }],
    }),

    // Get the user's default cover letter
    getDefaultCoverLetter: builder.query<GetDefaultCoverLetterResponse, void>({
      query: () => ({
        url: "/cover-letters/default",
        method: "GET",
      }),
      providesTags: ["DefaultCoverLetter"],
    }),

    // Get cover letter count
    getCoverLetterCount: builder.query<CoverLetterCountResponse, void>({
      query: () => ({
        url: "/cover-letters/count",
        method: "GET",
      }),
      providesTags: ["CoverLetterCount"],
    }),

    // Create a new cover letter
    createCoverLetter: builder.mutation<
      CreateCoverLetterResponse,
      CreateCoverLetterPayload
    >({
      query: (payload) => ({
        url: "/cover-letters",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [
        "CoverLetterList",
        "DefaultCoverLetter",
        "CoverLetterCount",
      ],
    }),

    // Update a cover letter
    updateCoverLetter: builder.mutation<
      UpdateCoverLetterResponse,
      UpdateCoverLetterPayload
    >({
      query: ({ id, data }) => ({
        url: `/cover-letters/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CoverLetter", id },
        "CoverLetterList",
        "DefaultCoverLetter",
      ],
    }),

    // Delete a cover letter
    deleteCoverLetter: builder.mutation<DeleteCoverLetterResponse, string>({
      query: (id) => ({
        url: `/cover-letters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "CoverLetterList",
        "DefaultCoverLetter",
        "CoverLetterCount",
      ],
    }),

    // Duplicate a cover letter
    duplicateCoverLetter: builder.mutation<
      DuplicateCoverLetterResponse,
      DuplicateCoverLetterPayload
    >({
      query: ({ id, title }) => ({
        url: `/cover-letters/${id}/duplicate`,
        method: "POST",
        body: title ? { title } : {},
      }),
      invalidatesTags: ["CoverLetterList", "CoverLetterCount"],
    }),

    // Set a cover letter as default
    setDefaultCoverLetter: builder.mutation<
      SetDefaultCoverLetterResponse,
      string
    >({
      query: (id) => ({
        url: `/cover-letters/${id}/default`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CoverLetter", id },
        "CoverLetterList",
        "DefaultCoverLetter",
      ],
    }),

    // Upload PDF and extract cover letter data using AI
    uploadPdfCoverLetter: builder.mutation<
      UploadPdfCoverLetterResponse,
      FormData
    >({
      query: (formData) => ({
        url: "/cover-letters/upload-pdf",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [
        "CoverLetterList",
        "DefaultCoverLetter",
        "CoverLetterCount",
      ],
    }),
  }),
});

// =============================================================================
// Export Hooks
// =============================================================================

export const {
  useListCoverLettersQuery,
  useGetCoverLetterQuery,
  useLazyGetCoverLetterQuery,
  useGetDefaultCoverLetterQuery,
  useGetCoverLetterCountQuery,
  useCreateCoverLetterMutation,
  useUpdateCoverLetterMutation,
  useDeleteCoverLetterMutation,
  useDuplicateCoverLetterMutation,
  useSetDefaultCoverLetterMutation,
  useUploadPdfCoverLetterMutation,
} = coverLetterSlice;

export default coverLetterSlice;
