import { API_PATH, MAIN_ENDPOINTS } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import { APIResponse } from "@/types/common";
import { Post, PostListResponse, PostUpdateRequest, PostCreateRequest } from "@/types/post";


export const PostApi = {
  // GET /api/posts/{postId}
  getDetail: (postId: number) =>
    restClient.get<Post>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.DETAIL(postId)}`,
    ),

  // POST /api/posts
  create: (data: PostCreateRequest) =>
    restClient.post<PostCreateRequest, APIResponse>(
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
    keyword?: string,
    filter?: "TITLE" | "CONTENT" | "WRITER",
  ) =>
    restClient.get<PostListResponse>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.LIST_BY_STEP(projectStepId)}`,
      {
        queryParams: {
          page: String(page),
          ...(keyword && { keyword }),
          ...(filter && { filter }),
        },
      },
    ),
};
