import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ResumeFormatData } from "@/lib/resume-format";

// =============================================================================
// Types
// =============================================================================

export interface TemplateSettings {
  templateId: string;
  fontFamily?: string;
  fontSize?: {
    name?: string;
    sectionTitle?: string;
    itemTitle?: string;
    body?: string;
    small?: string;
  };
  sectionGap?: number;
  paragraphGap?: number;
  lineHeight?: number;
  accentColor?: string;
}

export interface ResumeListItem {
  _id: string;
  title: string;
  isDefault: boolean;
  templateSettings?: {
    templateId: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Resume extends Omit<ResumeFormatData, "contact"> {
  _id: string;
  userId: string;
  title: string;
  isDefault: boolean;
  templateSettings?: TemplateSettings;
  contact: ResumeFormatData["contact"];
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  items: number;
  limit: number;
  page: number;
  totalPages: number;
}

export interface ListResumesResponse {
  data: ResumeListItem[];
  pagination: Pagination;
}

export interface GetResumeResponse {
  data: Resume;
}

export interface GetDefaultResumeResponse {
  data: Resume | null;
}

export interface CreateResumeResponse {
  data: {
    _id: string;
  };
}

export interface UpdateResumeResponse {
  data: Resume;
}

export interface DeleteResumeResponse {
  data: {
    _id: string;
  };
}

export interface DuplicateResumeResponse {
  data: {
    _id: string;
  };
}

export interface SetDefaultResumeResponse {
  data: {
    _id: string;
  };
}

export interface ResumeCountResponse {
  count: number;
}

export interface ListResumesQuery {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "title";
  sortOrder?: "asc" | "desc";
  search?: string;
}

export interface CreateResumePayload {
  title: string;
  isDefault?: boolean;
  templateSettings?: TemplateSettings;
  sectionTitles?: ResumeFormatData["sectionTitles"];
  contact: ResumeFormatData["contact"];
  skills?: ResumeFormatData["skills"];
  experiences?: ResumeFormatData["experiences"];
  educations?: ResumeFormatData["educations"];
  certifications?: ResumeFormatData["certifications"];
  projects?: ResumeFormatData["projects"];
  references?: ResumeFormatData["references"];
  languages?: ResumeFormatData["languages"];
  volunteers?: ResumeFormatData["volunteers"];
  publications?: ResumeFormatData["publications"];
}

export interface UpdateResumePayload {
  id: string;
  data: Partial<CreateResumePayload>;
}

export interface DuplicateResumePayload {
  id: string;
  title?: string;
}

export interface UploadPdfResumeResponse {
  data: {
    _id: string;
  };
}

// =============================================================================
// RTK Query API Slice
// =============================================================================

const resumeSlice = createApi({
  reducerPath: "resume",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/proxy/api/v1",
  }),
  tagTypes: ["Resume", "ResumeList", "DefaultResume", "ResumeCount"],
  endpoints: (builder) => ({
    // List all resumes for the authenticated user
    listResumes: builder.query<ListResumesResponse, ListResumesQuery | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set("page", String(params.page));
        if (params?.limit) searchParams.set("limit", String(params.limit));
        if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
        if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
        if (params?.search) searchParams.set("search", params.search);

        const queryString = searchParams.toString();
        return {
          url: queryString ? `/resumes?${queryString}` : "/resumes",
          method: "GET",
        };
      },
      providesTags: ["ResumeList"],
    }),

    // Get a single resume by ID
    getResume: builder.query<GetResumeResponse, string>({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Resume", id }],
    }),

    // Get the user's default resume
    getDefaultResume: builder.query<GetDefaultResumeResponse, void>({
      query: () => ({
        url: "/resumes/default",
        method: "GET",
      }),
      providesTags: ["DefaultResume"],
    }),

    // Get resume count
    getResumeCount: builder.query<ResumeCountResponse, void>({
      query: () => ({
        url: "/resumes/count",
        method: "GET",
      }),
      providesTags: ["ResumeCount"],
    }),

    // Create a new resume
    createResume: builder.mutation<CreateResumeResponse, CreateResumePayload>({
      query: (payload) => ({
        url: "/resumes",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ResumeList", "DefaultResume", "ResumeCount"],
    }),

    // Update a resume
    updateResume: builder.mutation<UpdateResumeResponse, UpdateResumePayload>({
      query: ({ id, data }) => ({
        url: `/resumes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Resume", id },
        "ResumeList",
        "DefaultResume",
      ],
    }),

    // Delete a resume
    deleteResume: builder.mutation<DeleteResumeResponse, string>({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ResumeList", "DefaultResume", "ResumeCount"],
    }),

    // Duplicate a resume
    duplicateResume: builder.mutation<DuplicateResumeResponse, DuplicateResumePayload>({
      query: ({ id, title }) => ({
        url: `/resumes/${id}/duplicate`,
        method: "POST",
        body: title ? { title } : {},
      }),
      invalidatesTags: ["ResumeList", "ResumeCount"],
    }),

    // Set a resume as default
    setDefaultResume: builder.mutation<SetDefaultResumeResponse, string>({
      query: (id) => ({
        url: `/resumes/${id}/default`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Resume", id },
        "ResumeList",
        "DefaultResume",
      ],
    }),

    // Upload PDF and extract resume data using AI
    uploadPdfResume: builder.mutation<UploadPdfResumeResponse, FormData>({
      query: (formData) => ({
        url: "/resumes/upload-pdf",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ResumeList", "DefaultResume", "ResumeCount"],
    }),
  }),
});

// =============================================================================
// Export Hooks
// =============================================================================

export const {
  useListResumesQuery,
  useGetResumeQuery,
  useLazyGetResumeQuery,
  useGetDefaultResumeQuery,
  useGetResumeCountQuery,
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useDuplicateResumeMutation,
  useSetDefaultResumeMutation,
  useUploadPdfResumeMutation,
} = resumeSlice;

export default resumeSlice;
