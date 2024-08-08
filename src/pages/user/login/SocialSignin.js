import {
  fetchUserInfo,
  googleSignin,
  googleToken,
  socialLogin,
  socialSignin,
} from "api/login/social";
import { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import kakao from "../../../images/ri_kakao-talk-fill.svg";
import naver from "../../../images/simple-icons_naver.svg";
import LoginGoogle from "./LoginGoogle";
import { setCookie } from "utils/cookie";
import base64 from "base-64";

const SocialSignin = () => {
  const handleGoogleSuccess = async response => {
    // console.log(response);
    const token = response.access_token;
    const res = await fetchUserInfo(token);
    console.log(res);
    // console.log(token);
    // 토큰 파싱
    // const resp = await googleToken(token);
    const reqData = {
      id: res.id,
      providerType: 0,
    };
    const socialType = {
      type: google,
    };
    // console.log(reqData);
    const result = await socialLogin(reqData, socialType);
    console.log(result);
    if (result.data.parentsId === -1) {
      alert("자식코드,번호 보내야함");
    }
    if (result.data.parentsId !== -1) {
      let acTken = result.data.accessToken;
      const payload = JSON.parse(
        base64.decode(acTken.split(".")[1]),
      ).signedUser;
      const signedUser = JSON.parse(payload);
      setCookie("userRole", signedUser.role);
      alert(signedUser.role);
    }
    console.log(result);
  };

  const handleGoogleFailure = error => {
    // 로그인 실패 로직
    console.log(error);
    alert("로그인에 실패하였습니다");
  };

  const handleKkoSuccess = async response => {
    // 로그인 성공 확인
    console.log(response);

    const reqData = {
      id: response.profile.id,
      providerType: 2,
    };
    console.log(reqData);
    const result = await socialLogin(reqData);
    console.log(result);
    if (result.data.parentsId === -1) {
      alert("자식코드,번호 보내야함");
    }
    if (result.data.parentsId !== -1) {
      alert("로그인되는 코드 필요");
    }
  };

  const handleKkoFailure = error => {
    // 로그인 실패 처리
    console.log(error);
    alert("로그인에 실패하였습니다");
  };

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const handleClick = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  const handleNaverLogin = async data => {
    const reqData = {
      id: data,
    };
    const result = await socialLogin(reqData);
    console.log(result);
  };

  // useEffect(() => {
  //   let code = new URL(window.location.href).searchParams.get("code");
  //   // console.log(code);
  //   if (code) {
  //     handleNaverLogin(code);
  //   }
  // }, []);

  return (
    <div className="login-wrap-panel-social">
      <div className="login-panel-social-title">간편 로그인</div>
      <div className="login-panel-social-list">
        <div
          className="login-panel-social-naver"
          onClick={() => {
            handleClick();
          }}
        >
          <img src={naver} />
        </div>
        {/* <NaverLogin
          clientId={process.env.REACT_APP_NAVER_CLIENT_ID}
          callbackUrl={process.env.REACT_APP_NAVER_REDIRECT_URI}
          onSuccess={handleOnSuccess}
          onError={handleOnError}
          render={({ onClick }) => (
            <div className="login-panel-social-naver" onClick={onClick}>
              <img src={naver} />
            </div>
          )}
        /> */}
        <KakaoLogin
          token={process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY}
          onSuccess={handleKkoSuccess}
          onFailure={handleKkoFailure}
          render={({ onClick }) => (
            <div className="login-panel-social-kakao" onClick={onClick}>
              <img src={kakao} />
            </div>
          )}
        />
        {/* <LoginGoogle
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
        /> */}
      </div>
    </div>
  );
};

export default SocialSignin;
