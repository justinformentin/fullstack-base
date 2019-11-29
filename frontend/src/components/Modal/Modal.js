import React, { useState, useEffect, useRef, Fragment } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ isModalVisible, hide, options, children }) => {
  function handleOverlayClicked(e) {
    if (e.target.className !== "modal-container") {
      return;
    }
    if (options === undefined) {
      hide();
    } else {
      options.overlayClose !== false && hide();
      options.onOverlayClicked && options.onOverlayClicked();
    }
  }

  return isModalVisible
    ? createPortal(
        <Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-container"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={handleOverlayClicked}
          >
            <div className="modal-wrapper modal-animated">
              <div className="modal-content">
                {options !== undefined &&
                options.closeButton === false ? null : (
                  <div className="modal-header">
                    {options !== undefined && options.title !== undefined && (
                      <div className="modal-title">{options.title}</div>
                    )}
                    <button
                      type="button"
                      className="modal-close-button"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={hide}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
                <div className="modal-body">{children}</div>
              </div>
            </div>
          </div>
        </Fragment>,
        document.body
      )
    : null;
};

export default Modal;

export const useModal = options => {
  const [hasToggledBefore, setHasToggledBefore] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const isModalVisibleRef = useRef(isModalVisible);
  isModalVisibleRef.current = isModalVisible;
  let animationDelay;

  function toggle() {
    animationDelay = setTimeout(() => {
      setIsModalVisible(!isModalVisibleRef.current);
      clearTimeout(animationDelay);
    }, 10);
    setIsShown(!isShown);
    setHasToggledBefore(true);
  }

  function handleKeyDown(event) {
    if (event.keyCode !== 27 || (options && options.keyboardClose === false))
      return;
    toggle();
    options && options.onEscapeKeyDown && options.onEscapeKeyDown();
  }

  useEffect(() => {
    if (isShown) {
      options && options.onShow && options.onShow();
      document.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("modal-open");
    }
    if (!isShown && hasToggledBefore) {
      if (options && options.onHide) {
        options.onHide();
      }
      document.body.classList.remove("modal-open");
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isShown]);

  return [
    {
      isShown,
      isModalVisible,
      hide: toggle,
      options
    },
    toggle
  ];
};

useModal.PropTypes = {
  options: PropTypes.shape({
    title: PropTypes.string,
    closeButton: PropTypes.bool,
    overlayClose: PropTypes.bool,
    onOverlayClicked: PropTypes.func,
    keyboardClose: PropTypes.func,
    onEscapeKeyDown: PropTypes.func,
    onShow: PropTypes.func,
    onHide: PropTypes.func
  })
};

function shortid() {
  return ("0000" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)).slice(
    -6
  );
}
