import logo from "../../images/logo_b.png";
import showpasslogo from "../../images/showpass.svg";
import "../../scss/signup/signup.scss";
import HomeAdressFields from "./HomeAdressFields";
import IdInputField from "./IdInputField";
import InputFields from "./InputFields";
import PassInputField from "./PassInputField";
import UserSelect from "./UserSelect";

const SignupTeacher = ({ handleSelect, handleSelectTeacher, userType }) => {
  return (
    <div className="signup-wrap">
      <div className="signup-wrap-inner br20">
        <div className="signip-wrap-inner-content">
          <div className="signup-top">
            <img className="siginup-logo" src={logo}></img>
            <UserSelect
              handleSelect={handleSelect}
              handleSelectTeacher={handleSelectTeacher}
              userType={userType}
            />
          </div>
          <form>
            <div className="signup-main">
              <IdInputField></IdInputField>
              <PassInputField></PassInputField>
              <InputFields></InputFields>
              <InputFields></InputFields>
              <HomeAdressFields>상세주소</HomeAdressFields>
              <div className="btwrap">
                <button className="signupbt">회원가입</button>
                <button className="cancelbt">취소</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupTeacher;