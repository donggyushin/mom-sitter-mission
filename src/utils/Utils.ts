import { UserType } from "../actions/UserActionTypes";

// 유저의 이름을 기준으로 배열을 정렬하기 위한 함수
/**
 * 사용자 이름 순으로 정렬합니다. 정렬 순서는 한글, 영어, 기타 유니코드 순입니다.
 */
export const compareUser = (a: UserType, b: UserType) => {
  const a_userName = a.login.toLowerCase();
  const b_userName = b.login.toLowerCase();

  const a_first_letter = a_userName.substr(0, 1);
  const b_first_letter = b_userName.substr(0, 1);

  const hangleCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const englishCheck = /^[a-zA-Z]*$/;

  // 앞에 글자가 한글이고 뒤에글자가 한글일 경우
  if (hangleCheck.test(a_first_letter) && hangleCheck.test(b_first_letter)) {
    if (a_userName < b_userName) {
      return -1;
    }
    if (a_userName > b_userName) {
      return 1;
    }
    return 0;
  } else if (
    hangleCheck.test(a_first_letter) &&
    !hangleCheck.test(b_first_letter)
  ) {
    // 앞에 글자가 한글이고 뒤에글자가 그 외일 경우
    return -1;
  }

  // 앞에글자가 영어이고 뒤에글자가 한글일 경우
  if (englishCheck.test(a_first_letter) && hangleCheck.test(b_first_letter)) {
    return 1;
  } else if (
    englishCheck.test(a_first_letter) &&
    englishCheck.test(b_first_letter)
  ) {
    // 앞에글자가 영어이고 뒤에글자도 영어일 경우
    if (a_userName < b_userName) {
      return -1;
    }
    if (a_userName > b_userName) {
      return 1;
    }
    return 0;
  } else if (englishCheck.test(a_first_letter)) {
    // 앞에 글자가 영어이고 뒤에 글자는 그 외일 경우
    return -1;
  }

  // 앞에글자가 기호이고 뒤에글자가 기호일 경우
  if (
    !hangleCheck.test(a_first_letter) &&
    !englishCheck.test(a_first_letter) &&
    !hangleCheck.test(b_first_letter) &&
    !englishCheck.test(b_first_letter)
  ) {
    if (a_userName < b_userName) {
      return -1;
    }
    if (a_userName > b_userName) {
      return 1;
    }
    return 0;
  } else if (
    !hangleCheck.test(a_first_letter) &&
    !englishCheck.test(a_first_letter)
  ) {
    // 앞에 글자가 기호이고 뒤에 글자가 그 외일 경우
    return 1;
  }

  // 뒤에께 우선 순위가 낮을 경우 음수 리턴
  // 뒤에께 우선 순위가 높을 경우 양수 리턴
  if (a_userName < b_userName) {
    return -1;
  }
  if (a_userName > b_userName) {
    return 1;
  }
  return 0;
};
