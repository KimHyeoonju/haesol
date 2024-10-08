import jwtAxios from "api/jwtUtil";
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
export const getStudentInfo = async studentPk => {
  const accessToken = getCookie("accessToken");

  try {
    const response = await axios.get(`/api/student/detail?pk=${studentPk}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 학생 한 명 정보 수정
export const modifyStudentInfo = async data => {
  const accessToken = getCookie("accessToken");
  // console.log("정보 : ", data);

  try {
    const response = await jwtAxios.put("/api/student", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 학생 성적 조회 중간고사: 1
export const getStudentGrade1 = async studentPk => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/Score/getScore?studentPk=${studentPk}&exam=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    // console.log("에러입니다. 데모데이터입니다. ", error);
    return {
      statusCode: null,
      resultMsg: null,
      resultData: null,
      code: 1,
      msg: "성적조회성공",
      data: {
        list: [
          {
            name: "영어",
            exam: 1,
            mark: 81,
            scoreId: 13,
            subjectClassRank: 1,
            studentPk: 4,
            classAvg: 81,
            gradeAvg: 81,
            subjectGradeRank: 1,
            classStudentCount: 2,
            classRank: 2,
            gradeRank: 2,
            gradeStudentCount: 2,
          },
        ],
        studentPk: 4,
        latestGrade: 1,
        latestSemester: 2,
        latestYear: "2024",
        exam: 0,
      },
    };
  }
};
// 성적 조회 기말:2
export const getStudentGrade2 = async studentPk => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/Score/getScore?studentPk=${studentPk}&exam=2`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 지정한 학기 성적 불러오기 중간
export const getStudentGradeSelect1 = async (studentPk, grade, semester) => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/Score/getScoreDetail?studentPk=${studentPk}&grade=${grade}&semester=${semester}&exam=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
// 지정한 학기 성적 불러오기 기말
export const getStudentGradeSelect2 = async (studentPk, grade, semester) => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/Score/getScoreDetail?studentPk=${studentPk}&grade=${grade}&semester=${semester}&exam=2`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
// 성적 입력하기
export const postStudentGradeScore = async scoreData => {
  const accessToken = getCookie("accessToken");
  console.log(scoreData);
  try {
    const response = await jwtAxios.post(`/api/Score`, scoreData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 전자서명 보내기
export const postSign = async formData => {
  const accessToken = getCookie("accessToken");
  console.log("사인에 뭐 들어가니 : ", formData);
  try {
    const response = await jwtAxios.post(
      `/api/user/parents/signature`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 전자서명 다운로드
// export const downloadSign = () => {
//   try {
// const response = await axios.get(
// `/api/user/parents/download/${signPk}`
// )
//   } catch (error) {
//     console.log(error)

//   }
// }

// 전자서명 get
export const getSign = async studentPk => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/user/parents/get-signature?studentPk=${studentPk}&year=2024&semester=${semester}&examSign=${examSign}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getScoreDetail = async data => {
  const res = await jwtAxios.get(
    `/api/Score/getScoreDetail?studentPk=${data.studentPk}&grade=${data.grade}&semester=${data.semester}&exam=${data.exam}`,
  );
  console.log(res);
  return res.data.data;
};
