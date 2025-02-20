import { API_PATH, MAIN_ENDPOINTS } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import { APIResponse } from "@/types/common";
import {
  Post,
  PostListResponse,
  PostUpdateRequest,
  PostCreateRequest,
  LinkResponse,
  FileMetadataDto,
  CreatePostResponse,
} from "@/types/post";
import {
  CommentRequest,
  UpdateCommentRequest,
  DeleteCommentRequest,
} from "@/types/comment";

export const PostApi = {
  // GET /api/posts/{postId}
  getDetail: (postId: number) =>
    restClient.get<Post>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.DETAIL(postId)}`,
    ),

  // POST /api/posts
  create: (data: PostCreateRequest) =>
    restClient.post<PostCreateRequest, { data: CreatePostResponse }>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.BASE}`,
      data,
    ),

  // PUT /api/posts/{postId}
  update: (postId: number, data: PostUpdateRequest) =>
    restClient.put<PostUpdateRequest, APIResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.DETAIL(postId)}`,
      data,
    ),

  // DELETE /api/posts/{postId}/{registerId}
  delete: (postId: number, registerId: number) =>
    restClient.delete<APIResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.DETAIL(postId)}/${registerId}`,
    ),

  // GET /api/posts/steps/{projectStepId}
  getListByStep: (
    projectStepId: number,
    page: number,
    keyword: string = "",
    filter?: "ALL" | "TITLE" | "CONTENT" | "WRITER",
    sort?: "LATEST" | "OLDEST",
  ) =>
    restClient.get<PostListResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.LIST_BY_STEP(projectStepId)}`,
      {
        queryParams: {
          page: String(page),
          keyword,
          ...(filter && { filter }),
          ...(sort && { sort }),
        },
      },
    ),

  // POST /api/posts/{postId}/comments
  createComment: (postId: number, data: CommentRequest) =>
    restClient.post<CommentRequest, APIResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.DETAIL(postId)}/comments`,
      data,
    ),

  // PATCH /api/posts/{postId}/comments/{commentId}
  updateComment: (
    postId: number,
    commentId: number,
    data: UpdateCommentRequest,
  ) =>
    restClient.patch<UpdateCommentRequest, APIResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.DETAIL(postId)}/comments/${commentId}`,
      data,
    ),

  // DELETE /api/posts/{postId}/comments/{commentId}
  deleteComment: (
    postId: number,
    commentId: number,
    data: DeleteCommentRequest,
  ) =>
    restClient.delete<DeleteCommentRequest, APIResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.DETAIL(postId)}/comments/${commentId}`,
      data,
    ),

  // GET /api/posts/{postId}/links
  getLinks: (postId: number) =>
    restClient.get<LinkResponse[]>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.LINKS.LIST(postId)}`,
    ),

  // DELETE /api/posts/{postId}/links/{linkId}
  deleteLink: (postId: number, linkId: number) =>
    restClient.delete(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.LINKS.DELETE(postId, linkId)}`,
    ),

  // GET /api/posts/{postId}/files
  getFiles: (postId: number) =>
    restClient.get<FileMetadataDto[]>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.FILES.LIST(postId)}`,
    ),

  // DELETE /api/posts/{postId}/files/{fileId}
  deleteFile: (postId: number, fileId: number) =>
    restClient.delete(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.FILES.DELETE(postId, fileId)}`,
    ),
};

export async function uploadFiles(
  postId: number,
  formData: FormData,
): Promise<FileMetadataDto[]> {
  const response = await fetch(`${API_PATH.MAIN}/api/posts/${postId}/files`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("파일 업로드에 실패했습니다");
  }

  return response.json();
}
