/**
 * 이 파일에는 User 리듀서의 액션을 관리하는 타입들을 적었습니다.
 */

export const SEARCHING_USER_SUCCESS = "SEARCHING_USER_SUCCESS";
export const SEARCHING_USER_FAIL = "SEARCHING_USER_FAIL";

export type UserType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
};

export interface SearchingUserFail {
  type: typeof SEARCHING_USER_FAIL;
}

export interface SearchingUserSuccess {
  type: typeof SEARCHING_USER_SUCCESS;
  payload: UserType[];
}

export type UserDispatchType = SearchingUserFail | SearchingUserSuccess;
