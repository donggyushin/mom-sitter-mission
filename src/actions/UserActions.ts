import {
  SEARCHING_USER_FAIL,
  SEARCHING_USER_SUCCESS,
  UserDispatchType,
  UserType,
} from "./UserActionTypes";

import { Dispatch } from "redux";
import axios from "axios";

export const searchUsersWithName = (name: string) => async (
  dispatch: Dispatch<UserDispatchType>
) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${name}+in:user&page=1&per_page=100`
    );
    const data = response.data;
    const users = data.items as UserType[];
    return dispatch({
      type: SEARCHING_USER_SUCCESS,
      payload: users,
    });
  } catch (err) {
    return dispatch({
      type: SEARCHING_USER_FAIL,
    });
  }
};
