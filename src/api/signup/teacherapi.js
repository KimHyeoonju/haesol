import axios from "axios";

export const teacherSignup = async data => {
  try {
    const response = await axios.post(`/api/teacher/sign-up`, { data });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const duplicateId = async teacherId => {
  console.log(teacherId);
  try {
    const res = await axios.get(`/api/teacher/duplicate?id=${teacherId}`);
    return res;
  } catch (error) {
    const err = "err";
    return err;
  }
};