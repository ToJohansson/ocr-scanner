import React, { useEffect, useRef } from "react";

function ModalComponent({ onClose, isOpen }) {
  const modalRef = useRef(null);
  const videoElementRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);

  function openModal() {
    if (modalRef.current) {
      modalRef.current.style.display = "block";
    }
  }

  function closeModal() {
    if (modalRef.current && videoElementRef.current) {
      modalRef.current.style.display = "none";

      const videoTracks = videoElementRef.current.srcObject.getVideoTracks();

      videoTracks.forEach((track) => {
        if (track.readyState === "live" && track.kind === "video") {
          track.stop();
        }
      });

      // Stop the OCR-processen (om det är nödvändigt)
      // isModalOpen = false; (om du använder isModalOpen tidigare)
    }
  }

  return <div ref={modalRef}>{/* JSX för modalen */}</div>;
}

export default ModalComponent;
