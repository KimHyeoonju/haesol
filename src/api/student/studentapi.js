import axios from "axios";
import { getCookie } from "utils/cookie";

// 학생 리스트 불러오는 api
export const getStudentList = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get("/api/student", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
// 학생 한 명 정보 불러오기
export const getStudentInfo = async stu_id => {
  const accessToken = getCookie("accessToken");
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.get(
      `/api/student/detail?pk=${stu_id}`,
      header,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // console.log("response : ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 학생 한 명 정보 수정
export const modifyStudentInfo = async stu_id => {
  const accessToken = getCookie("accessToken");
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.get(
      `/api/student/detail?pk=${stu_id}`,
      header,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 학생 성적 조회
export const getStudentGrade = async stuId => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(`/api/Score/getScore?stuId=${stuId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
