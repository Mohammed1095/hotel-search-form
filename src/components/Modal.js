import ReactDOM from "react-dom";
import { useEffect } from "react";
import "./Modal.css";
function Modal({ handleCloseClick }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={handleCloseClick}></div>
      <div className="modal--container">
        <button className="close-icon" onClick={handleCloseClick}>
          <ion-icon name="close-outline" className="close-outline"></ion-icon>
        </button>
        <div className="fitler-container">
          <div className="country-select select">
            <label>Country</label>
            <select>
              <option value="egypt">egypt</option>
            </select>
          </div>
          <div className="city-select select">
            <label>City</label>
            <select>
              <option value="cairo">cairo</option>
            </select>
          </div>
          <div className="currency-select select">
            <label>Currency</label>
            <select>
              <option value="egp">egp</option>
            </select>
          </div>
        </div>

        <button type="submit" className="done-btn" onClick={handleCloseClick}>
          filter
        </button>
      </div>
    </>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
