import React from "react";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={props.handlePopupBtn}>
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
