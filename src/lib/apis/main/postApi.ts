import { API_PATH, MAIN_ENDPOINTS } from "@/lib/constants/api-endpoints";
import restClient from "@/lib/restClient";
import { Post } from "@/types/post";

export const PostApi = {
  getDetail: (postId: number) =>
    restClient.get<Post>(
      `${API_PATH.MAIN}${MAIN_ENDPOINTS.POST.DETAIL(postId)}`,
    ),
};
