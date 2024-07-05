import React from "react";

const GenderSelect = ({ children }) => {
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          className="fieleds-section-input"
          type="text"
          placeholder={children}
        ></input>
      </div>
    </div>
  );
};

export default GenderSelect;