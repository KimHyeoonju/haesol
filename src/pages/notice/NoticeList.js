import styled from "@emotion/styled";
import "../../scss/notice/noticeList.css";

import { getNoticeList, getNoticeListTea } from "api/notice/noticeapi";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import { useEffect, useState } from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { openModal, updateModalDate } from "slices/modalSlice";
import { getCookie } from "utils/cookie";
import StudentClassInfo from "pages/student/StudentClassInfo";

const NoticeListWrapStyle = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  /* background-color: #f3f9fa; */
  min-height: calc(100vh - 328px);
  padding: 0 30px;
`;

const NoticeListStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const NoticeList = () => {
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  const studentPk = getCookie("studentPk");

  // 네비게이트
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/notice/edit`);
  };

  // 알림장 state
  const state = 1;

  const [noticeList, setNoticeList] = useState([]);

  // 알림장 데이터 연동
  const noticeListData = async () => {
    try {
      let response;
      if (loginUserType === "ROLE_TEACHER") {
        response = await getNoticeListTea(); // 선생님용 API 호출
      } else if (loginUserType === "ROLE_PARENTS") {
        response = await getNoticeList(studentPk); // 학부모용 API 호출
      }

      if (response?.data?.result?.notice) {
        const noticeData = Array.isArray(response.data.result.notice)
          ? response.data.result.notice
          : [response.data.result.notice];

        // createdAt의 날짜 부분만 추출하여 새로운 객체에 저장
        const formattedNoticeData = noticeData.map(item => ({
          ...item,
          createdAt: item.createdAt.split(" ")[0], // 날짜 부분만 추출
        }));

        setNoticeList(formattedNoticeData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    noticeListData();
  }, [loginUserType, state]); // loginUserType과 state를 의존성 배열에 추가

  const dispatch = useDispatch();
  /** 모달 호출 */
  const showModal = (selectModalType, createdAt, title, content, notice_id) => {
    /** (선택) 들어갈 내용 수정 */

    const data = {
      headerText: `준비물 - ${createdAt}`,
      bodyText: [content],
      buttonText: ["전송", "취소"],
      modalRes: [22, { to: "010-3024-9887", message: content }],
    };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    dispatch(openModal(selectModalType));
    // console.log("모달 결과 출력 내용 확인 : ", modalRes);
  };

  const modalState = useSelector(state => state.modalSlice);

  const handleDelete = async (e, selectModalType, notice_id) => {
    e.stopPropagation();
    const data = {
      headerText: ["삭제"],
      bodyText: ["해당 내용을 삭제하시겠습니까?"],
      buttonText: ["삭제", "취소"],
      modalRes: [44, notice_id],
    };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };
  useEffect(
    () => {
      noticeListData();
    },
    [modalState.modalRes[0]],
    state,
  );

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <div className="main-core">
        <NoticeListWrapStyle>
          <div className="student-list-title">
            <StudentClassInfo />
            <p>알림장 목록</p>
          </div>
          <div className="user-info-wrap">
            {/* <!-- 탭 선택 부분 --> */}
            <div className="user-info-tap">
              <div className="property" style={{ marginLeft: "-0px" }}>
                <div
                  className="div-wrapper"
                  onClick={() => {
                    navigate(`/notice/item`);
                  }}
                >
                  <div className="info-subtitle">준비물</div>
                </div>
                <div className="notice-frame">
                  <div className="text-wrapper">알림장</div>
                </div>
              </div>

              {loginUserType === "ROLE_TEACHER" ? (
                <div
                  className="alart-button"
                  onClick={() => {
                    handleEditClick();
                  }}
                >
                  <button>알림 작성</button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="notice-select">
            <div className="notice-select-inner">날짜</div>
            <div className="notice-select-inner">내용</div>
          </div>
          <NoticeListStyle>
            <div className="notice-frame">
              {noticeList.map((item, index) => (
                <div
                  className="item"
                  key={index}
                  onClick={() => {
                    showModal(
                      "BasicModal",
                      item.createdAt,
                      item.title,
                      item.content,
                      item.notice_id,
                    );
                  }}
                >
                  <div className="grid-inner">
                    <div className="grid-inner-item">
                      <div className="grid-inner-item-text">
                        {item.createdAt}
                      </div>
                    </div>
                    <div className="grid-inner-item">
                      <div className="grid-inner-item-text">{item.title}</div>
                      <div
                        className="delete-button"
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(e, "BasicModal", item.notice_id);
                        }}
                      >
                        <RiDeleteBack2Fill size="2.5rem" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </NoticeListStyle>
        </NoticeListWrapStyle>
      </div>
      <Footer />
    </>
  );
};

export default NoticeList;
