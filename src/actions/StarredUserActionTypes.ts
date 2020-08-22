/**
 * 이 파일에는 StarredUser 리듀서의 액션을 관리하는 타입들을 적었습니다.
 */

import { UserType } from "./UserActionTypes";

export const FETCHING_STARRED_USER_SUCCESS = "FETCHING_STARRED_USER_SUCCESS";
export const ADD_STARRED_USER = "ADD_STARRED_USER";
export const REMOVE_STARRED_USER = "REMOVE_STARRED_USER";
export const SEARCHING_STARRED_USER = "SEARCHING_STARRED_USER";
export const STOP_SEARCHING_MODE = "STOP_SEARCHING_MODE";

export interface AddStarredUser {
  type: typeof ADD_STARRED_USER;
  payload: UserType[];
}

export interface FetchingStarredUsersSuccess {
  type: typeof FETCHING_STARRED_USER_SUCCESS;
  payload: UserType[];
}

export interface SearchingStarredUser {
  type: typeof SEARCHING_STARRED_USER;
  payload: {
    users: UserType[];
    searchText: string;
  };
}

export interface StopSearchingMode {
  type: typeof STOP_SEARCHING_MODE;
}

export interface RemoveStarredUser {
  type: typeof REMOVE_STARRED_USER;
  payload: UserType[];
}

export type StarredUserDispatchType =
  | FetchingStarredUsersSuccess
  | AddStarredUser
  | RemoveStarredUser
  | SearchingStarredUser
  | StopSearchingMode;
