import { UserType } from "../actions/UserActionTypes";

// 유저의 이름을 기준으로 배열을 정렬하기 위한 함수
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
