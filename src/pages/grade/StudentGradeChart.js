import {
  getScore,
  getScoreDetail,
  getStudentGrade1,
  getStudentGrade2,
  getStudentInfo,
} from "api/student/studentapi";
import Chart from "components/chart/Chart";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { openModal, updateModalDate } from "slices/modalSlice";

const StudentGradeChart = () => {
  // const initArr = [
  //   {
  //     평균: "",
  //     내점수: 0,
  //     학급평균: 0,
  //     학년평균: 0,
  //   },
  // ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { studentPk } = useParams();
  const [studentClass, setStudentClass] = useState("");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [semester, setSemester] = useState("");
  const [exam, setExam] = useState("");
  const [recentExam, setRecentExam] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [count, setCount] = useState("");
  const [inquiry, setInquiry] = useState(false);

  const showModal = selectModalType => {
    const data = {
      bodyText: ["학년,학기,시험을 선택해주세요"],
      modalRes: [16],
      buttonCnt: 1,
    };
    dispatch(updateModalDate(data));
    const modalRes = dispatch(openModal(selectModalType));
  };

  const handleOnGrade = () => {
    navigate(`/grade/${studentPk}`);
  };
  const handleGradeChange = e => {
    setGrade(e.target.value);
  };
  const handleSemesterChange = e => {
    setSemester(e.target.value);
  };
  const handleExamChange = e => {
    setExam(e.target.value);
  };

  const handleClick = async () => {
    if (!grade || !semester || !exam) {
      showModal("BasicModal");
      return;
    } else {
      const reqData = {
        studentPk: studentPk,
        grade: grade,
        semester: semester,
        exam: exam,
      };
      const result = await getScoreDetail(reqData);
      setRecentExam(result);
      setCount(
        `${result.classRank.classStudentCount} / ${result.classRank.gradeStudentCount}`,
      );
      setShowChart(true);
    }
  };
  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{studentClass}</span>
        <p>{studentName} 여기 페이지 이름</p>
      </div>
      <div className="user-info-wrap">
        {/* <!-- 탭 선택 부분 --> */}
        <div className="user-info-tap">
          <div className="property">
            <div className="div-wrapper">
              <div
                className="info-subtitle"
                onClick={() => navigate("/studentinfo")}
              >
                신상 정보
              </div>
            </div>
            <div className="div-wrapper">
              <div className="text-wrapper" onClick={() => handleOnGrade()}>
                성적 확인
              </div>
            </div>
            <div className="frame">
              <div className="info-subtitle">차트</div>
            </div>
          </div>
          <div className="info-button">
            <button
              onClick={() => {
                handleClick();
                setInquiry(true);
              }}
            >
              조회
            </button>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-top">
            <div className="info-title" id="info-grade-select">
              <span style={{ width: "161px" }}>학기 선택</span>
              <div className="select-grade" style={{ width: "60%" }}>
                <select
                  name="grade"
                  onChange={e => {
                    handleGradeChange(e);
                  }}
                  value={grade}
                >
                  <option value="" hidden>
                    학년
                  </option>
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                  <option value="4">4학년</option>
                  <option value="5">5학년</option>
                  <option value="6">6학년</option>
                </select>
                <select
                  name="semester"
                  onChange={e => {
                    handleSemesterChange(e);
                  }}
                  value={semester}
                >
                  <option value="" hidden>
                    학기
                  </option>
                  <option value="1">1학기</option>
                  <option value="2">2학기</option>
                </select>
                <select
                  name="exam"
                  onChange={e => {
                    handleExamChange(e);
                  }}
                  value={exam}
                >
                  <option value="" hidden>
                    시험
                  </option>
                  <option value="1">중간고사</option>
                  <option value="2">기말고사</option>
                </select>
              </div>
              <div
                className="total-student"
                style={{
                  margin: "0 auto",
                  justifyContent: "left",
                }}
              >
                <p style={{ height: "100%", width: "auto" }}>
                  반/학년 전체 인원
                </p>
                <input readOnly value={count} />명
              </div>
            </div>
          </div>
        </div>
      </div>
      {showChart ? (
        <Chart recentExam={recentExam.list} inquiry={inquiry}>
          평균 성적
        </Chart>
      ) : null}
    </div>
  );
};

export default StudentGradeChart;
