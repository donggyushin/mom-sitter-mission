import { UserType } from "../actions/UserActionTypes";

export const compareUser = (a: UserType, b: UserType) => {
  const a_userName = a.login.toLowerCase();
  const b_userName = b.login.toLowerCase();
  if (a_userName < b_userName) {
    return -1;
  }
  if (a_userName > b_userName) {
    return 1;
  }
  return 0;
};
