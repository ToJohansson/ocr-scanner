import React from "react";
/**
 * Popup Window
 *
 * props:
 *       - onCloseCamera är en funktion som sätter ett state i App
 *         till true eller false
 *
 * @param {object} props
 * @returns
 */
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
