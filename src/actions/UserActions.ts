import {
  SEARCHING_USER_FAIL,
  SEARCHING_USER_SUCCESS,
  USER_LOADING_FALSE,
  USER_LOADING_TRUE,
  UserDispatchType,
  UserType,
} from "./UserActionTypes";

import { Dispatch } from "redux";
import axios from "axios";

// Github user api로부터 최대 100명까지의 유저를 검색해주는 함수입니다.
export const searchUsersWithName = (name: string) => async (
  dispatch: Dispatch<UserDispatchType>
) => {
  if (!name) return;
  dispatch({
    type: USER_LOADING_TRUE,
  });
  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${name}+in:user&page=1&per_page=100`
    );
    const data = response.data;
    const users = data.items as UserType[];
    dispatch({
      type: USER_LOADING_FALSE,
    });
    return dispatch({
      type: SEARCHING_USER_SUCCESS,
      payload: users,
    });
  } catch (err) {
    dispatch({
      type: USER_LOADING_FALSE,
    });
    return dispatch({
      type: SEARCHING_USER_FAIL,
    });
  }
};
