import styled from "@emotion/styled";
import { getStudentInfo } from "api/student/studentapi";
import PhoneInputFields from "pages/student/PhoneInputFields";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { openModal, updateModalDate } from "slices/modalSlice";
import { getCookie } from "utils/cookie";
import "../../scss/parents/childedit.css";
import catPicture from "../../images/box-cat.jpg";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import HeaderMemu from "components/layout/header/HeaderMenu";
import Footer from "components/layout/Footer";

const MyShildInfo = styled.div`
  .no-data {
    color: gray;
    padding-left: 0px !important;
  }

  .no-padding {
    padding-left: 0px !important;
  }

  .no-edit-class {
    pointer-events: none;
    background-color: #efece8 !important;
  }

  .gender-style {
    margin-left: 0px !important;
    input {
      width: 25px !important;
    }
    /* width: auto; */
  }

  .prev-class-item-span {
    border-right: 0px !important;
    width: 157px !important;
    /* border-left: 0px; */
  }

  .prev-class-item {
    padding: 10px 0;
    border-left: solid 3px #886348;
  }
`;

const MyChildInfo = () => {
  const studentPk = getCookie("studentPk");
  // 네비게이트
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modalSlice);

  /** 성적 확인 페이지로 이동 */
  const handleClick = () => {
    navigate(`/grade/${getCookie("studentPk")}`);
  };

  /** 차트 페이지로 이동 */
  const handleChart = () => {
    navigate(`/grade/chart/${getCookie("studentPk")}`);
  };

  const [studentBirth, setStudentBirth] = useState("");
  const [connet, setConnet] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [studentAddr, setStudentAddr] = useState("");
  const [parentId, setParentId] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentEtc, setStudentEtc] = useState("");
  const [studentZoneCode, setStudentZoneCode] = useState("");
  const [parentName, setParentName] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPic, setStudentPic] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [prevEtcList, setPrevEtcList] = useState([]);
  const [studentCreatedAt, setStudentCreatedAt] = useState("");
  const [studentDetail, setStudentDetail] = useState("");

  /** 학생 정보 불러오기 */
  const getChildInfo = async () => {
    const res = await getStudentInfo(getCookie("studentPk"));
    console.log("불러오기 결과값 : ", res.data);

    // 학생 데이터 저장
    setStudentBirth(res.data.studentBirth);
    setConnet(res.data.connet);
    setTeacherName(res.data.teacherName);
    setStudentAddr(res.data.studentAddr);
    setParentId(res.data.parentId);
    setParentPhone(res.data.parentPhone);
    setStudentClass(res.data.studentClass);
    setStudentEtc(res.data.studentEtc);
    setStudentZoneCode(res.data.studentZoneCode);
    setParentName(res.data.parentName);
    setStudentGender(res.data.studentGender);
    setStudentName(res.data.studentName);
    setStudentPic(res.data.studentPic);
    setStudentPhone(res.data.studentPhone);
    setPrevEtcList(res.data.prevEtcList);
    setStudentCreatedAt(res.data.studentCreatedAt);
    setStudentDetail(res.data.studentDetail);
  };

  /** 최초 랜더링 */
  useEffect(() => {
    getChildInfo();
    console.log("권한 : ", getCookie("userRole"));
  }, []);

  const [postCode, setPostCode] = useState("우편번호");
  const [address, setAddress] = useState("주소");
  const handleAddClick = e => {
    e.preventDefault();
    // 주소찾기 팝업
    new daum.Postcode({
      oncomplete: function (data) {
        var roadAddr = data.roadAddress;
        var extraRoadAddr = "";
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        setStudentZoneCode(data.zonecode);
        setStudentAddr(roadAddr);
      },
    }).open();
  };

  /** 취소 기능 */
  const modifyCancel = selectModalType => {
    const data = {
      bodyText: ["수정한 내용을 되돌리겠습니까?"],
      modalRes: [43],
      buttonText: ["예", "아니오"],
    };

    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  /** 모달 종료 후 갱신 */
  useEffect(() => {
    if (modalState.modalRes[0] === false) {
      getChildInfo();
    }
  }, [modalState.modalRes[0]]);

  /** 비밀번호 수정 모달 호출 */
  const showModal = selectModalType => {
    const data = { bodyText: [parentId], buttonText: ["수정", "취소"] };
    dispatch(updateModalDate(data));

    dispatch(openModal(selectModalType));
  };

  /** 저장 기능 */
  const saveInfo = selectModalType => {
    // 기본 이메일과 중복 확인
    const data = {
      bodyText: ["정보를 수정하시겠습니까?"],
      modalRes: [
        13,
        {
          studentName: studentName,
          studentPhone: studentPhone,
          studentZoneCode: studentZoneCode,
          studentAddr: studentAddr,
          studentDetail: studentDetail,
          studentPk: getCookie("studentPk"),
        },
      ],
      buttonText: ["수정", "취소"],
    };
    dispatch(updateModalDate(data));

    dispatch(openModal(selectModalType));
  };

  const StudentsInfoStyle = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 120px;
    width: 100%;
    height: 100%;
  `;

  const StudentsImeStyle = styled.div`
    width: 100%;
    height: 100%;
    .img-contain {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <MyShildInfo>
        <div className="main-core child-edit-wrap">
          <div className="student-list-title">
            <span>개인 정보 수정</span>
          </div>
          {/* <!-- 신상정보 전체 레이아웃 --> */}
          <div className="user-info-wrap">
            {/* <!-- 탭 선택 부분 --> */}
            <div className="user-info-tap">
              <div className="property">
                <div className="frame">
                  <div className="text-wrapper">신상 정보</div>
                </div>
                <div
                  className="div-wrapper"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <div className="info-subtitle">성적 확인</div>
                </div>
                <div
                  className="div-wrapper"
                  onClick={() => {
                    handleChart();
                  }}
                >
                  <div className="info-subtitle">차트</div>
                </div>
                {/* <div className="info-button re-pw-btn">
                <button
                  onClick={() => {
                    showModal("PasswordChangeModal");
                  }}
                  className="re-pw-btn"
                >
                  비밀번호 수정
                </button>
              </div> */}
              </div>

              <div className="info-button">
                <button
                  onClick={e => {
                    saveInfo("BasicModal");
                  }}
                >
                  저장
                </button>
                <button
                  onClick={() => {
                    modifyCancel("BasicModal");
                  }}
                >
                  취소
                </button>
              </div>
            </div>
            {/* <!-- 입력 부분 --> */}
            <div className="info-contain-top">
              <div className="info-item-top">
                <div className="info-title">
                  <span>학생명</span>
                  <input
                    type="text"
                    name="text"
                    value={studentName}
                    placeholder="이름을 입력해주세요"
                    onChange={e => {
                      setStudentName(e.target.value);
                    }}
                  />
                  <div className="form-check gender-style ">
                    <input
                      className="no-edit-class"
                      type="text"
                      name="text"
                      value={studentGender}
                    />
                  </div>
                </div>
                <div className="info-title">
                  <span>생년월일</span>
                  <input
                    type="date"
                    name="date"
                    value={studentBirth}
                    className="no-edit-class"
                    // onChange={e => {
                    //   setStudentBirth(e.target.value);
                    // }}
                  />
                </div>
                <div className="info-title">
                  <span>전화번호</span>

                  <PhoneInputFields
                    placeholder="전화번호를 입력하세요"
                    phoneNum={studentPhone}
                    setPhoneNum={setStudentPhone}
                  />
                </div>
              </div>
              <div className="info-item-right">
                <div className="info-title">
                  <span>학부모명</span>
                  <input
                    type="text"
                    name="text"
                    placeholder=""
                    value={parentName}
                    className="no-edit-class"
                    // onChange={e => {
                    //   setParentName(e.target.value);
                    // }}
                  />
                </div>
                <div className="info-title">
                  <span>관계</span>
                  <select
                    className="no-edit-class"
                    name="family-info"
                    value={connet}
                    // onChange={e => {
                    //   setConnet(e.target.value);
                    // }}
                  >
                    <option value="none" disabled selected>
                      == 항목을 선택하세요 ==
                    </option>
                    <option value="부">부</option>
                    <option value="모">모</option>
                    <option value="조부">조부</option>
                    <option value="조모">조모</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div className="info-title">
                  <div className="info-title">
                    <span>학부모 전화번호</span>
                    <input
                      type="text"
                      name="text"
                      placeholder=""
                      value={parentPhone}
                      className="no-edit-class"
                    />
                  </div>
                </div>
              </div>
              <div className="info-img">
                {studentPic !== null ? (
                  <StudentsImeStyle>
                    <img
                      src={`http://112.222.157.156:5121/pic/student/${studentPk}/${studentPic}`}
                      alt="StudentImg"
                    />
                  </StudentsImeStyle>
                ) : (
                  <StudentsImeStyle>
                    <img src={catPicture} alt="귀야운 고양이"></img>
                  </StudentsImeStyle>
                )}
              </div>
            </div>
            <div className="info-contain-mid">
              <div className="info-item-mid">
                <div className="info-title">
                  <span>주소</span>
                  <div className="add-form">
                    <div>
                      <input
                        type="text"
                        name="text"
                        placeholder={postCode}
                        value={studentZoneCode}
                        readOnly
                      ></input>
                      <button
                        type="button"
                        onClick={e => {
                          handleAddClick(e);
                        }}
                      >
                        우편번호 찾기
                      </button>
                    </div>
                    <input
                      type="text"
                      name="text"
                      placeholder={address}
                      className="info-add"
                      value={studentAddr}
                      readOnly
                    />
                    <input
                      type="text"
                      name="text"
                      value={studentDetail}
                      placeholder="상세주소를 입력해주세요."
                      className="info-add"
                      onChange={e => {
                        setStudentDetail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="info-title"></div>
              </div>
            </div>

            <div className="info-contain-top">
              <div className="info-none-modify">
                <div className="info-title">
                  <span>최초 등록일</span>
                  <div>{studentCreatedAt}</div>
                </div>
              </div>
            </div>
            <div className="info-contain-top">
              <div className="info-none-modify">
                <div className="info-title">
                  <span>아이디</span>
                  <div>{parentId}</div>
                </div>
              </div>
            </div>
            <div className="info-contain-top">
              <div className="info-none-modify">
                <div className="info-title">
                  <span>현재 학급</span>
                  <div>
                    {studentClass} | 담임 : {teacherName}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="info-contain-top">
            <div className="info-none-modify">
              <div className="info-title">
                <span className="prev-class-item-span">이전 학급</span>
                <div className="prev-class-item">
                  {prevEtcList.length > 0 ? (
                    prevEtcList.map((item, index) => (
                      <>
                        <div key={index} className="no-padding">
                          {item.uclass} | 담임 : {item.teacherName}
                        </div>
                        <div key={index} className="no-padding">
                          {item.uclass} | 담임 : {item.teacherName}
                        </div>
                      </>
                    ))
                  ) : (
                    <div className="no-data">정보 없음</div>
                  )}
                </div>
              </div>
            </div>
          </div> */}
            <div className="info-contain-top">
              <div className="info-none-modify" id="info-none-modify-last">
                <div className="info-title">
                  <span>기타사항</span>
                  <div>
                    {studentEtc === null || studentEtc === "" ? (
                      <div className="no-data">정보 없음</div>
                    ) : (
                      studentEtc
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyShildInfo>
      <Footer />
    </>
  );
};

export default MyChildInfo;
