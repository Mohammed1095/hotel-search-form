import React, { useEffect, useState } from "react";
import Select from "react-select";
import "../assets/tourism.png";
import "./Form.css";
import "./queris.css";
import Modal from "./Modal";
import starIcon from "../assets/stars-rate.svg";
import starIconEmpty from "../assets/stars-rate-empty.svg";

function Form() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [selectedNatOption, setSelectedNatOption] = useState(null);
  const [selectedDestOption, setSelectedDestOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filledStarCount, setFilledStarCount] = useState(0);

  const handleStarClick = (index) => {
    setFilledStarCount(index + 1);
  };

  const natOptions = [
    {
      label: "Egypt",
      value: "EG",
      flag: "https://flagcdn.com/64x48/eg.png",
    },
    {
      label: "Saudi Arabia",
      value: "SA",
      flag: "https://flagcdn.com/64x48/sa.png",
    },
    // Add more countries here
  ];

  const destOptions = [
    { value: "egypt", label: "Cairo-(egypt)" },
    { value: "cairo-italy", label: "Cairo Montonette-(Italy)" },
    { value: "cairo-ga", label: "Cairo(ga)-(United States of America)" },
    { value: "cairo-il", label: "Cairo(il)-(United States of America)" },
  ];

  const handleDestChange = (option) => {
    setSelectedDestOption(option);
  };
  const handleNatChange = (option) => {
    setSelectedNatOption(option);
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const handleCloseClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
      setNumberOfNights(diffDays);
    }
  }, [checkInDate, checkOutDate]);
  useEffect(() => {
    if (checkInDate && numberOfNights) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const startDate = new Date(checkInDate);
      const endDate = new Date(startDate.getTime() + numberOfNights * oneDay);
      const formattedDate = endDate.toISOString().split("T")[0];
      setCheckOutDate(formattedDate);
    }
  }, [checkInDate, numberOfNights]);
  return (
    <form className="form">
      <div className="destination-hotel-name">
        <div className="destination flex-to-gap select-container">
          <label>Destination</label>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "grey" : "blue",
                height: "6rem",
                borderRadius: "999px",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? "#0f959c6f" : "white",
                color: "#333",
              }),
              input: (baseStyles, state) => ({
                ...baseStyles,
                outline: "none",
                border: "none",
                height: "6rem",
                fontSize: "16px",
                padding: "10px",
                boxShadow: "0 0 0 0 ",
              }),
            }}
            value={selectedDestOption}
            onChange={handleDestChange}
            options={destOptions}
            placeholder="Choose your Destination"
          />
        </div>

        <div className="star-rating-input flex-to-gap">
          <div className="stars-label">star rating</div>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < filledStarCount ? starIcon : starIconEmpty}
                alt="Star"
                onClick={() => handleStarClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="in-out-nights">
        <div className="check-in flex-to-gap">
          <label htmlFor="">Check In</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => {
              setCheckInDate(e.target.value);
            }}
          />
        </div>
        <div className="check-out flex-to-gap">
          <label htmlFor="">Check Out </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => {
              setCheckOutDate(e.target.value);
            }}
          />
        </div>
        <div className="nights flex-to-gap">
          <label htmlFor="">Nights</label>
          <input
            type="number"
            name="nights"
            step="1"
            min="0"
            max="15"
            placeholder="nights"
            value={numberOfNights || ""}
            onChange={(e) => {
              setNumberOfNights(parseInt(e.target.value) || 0);
            }}
          />
        </div>
      </div>
      <div className="nationality-advanced-btn">
        <div className="nationality-rating">
          <div className="nationality flex-to-gap">
            <label>Nationality</label>
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "grey" : "blue",
                  height: "6rem",
                  borderRadius: "999px",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? "#0f959c6f" : "white",
                  color: "#333",
                }),
                input: (baseStyles, state) => ({
                  ...baseStyles,
                  outline: "none",
                  border: "none",
                  height: "6rem",
                  fontSize: "16px",
                  padding: "10px",
                  boxShadow: "0 0 0 0 ",
                }),
              }}
              options={natOptions}
              value={selectedNatOption}
              onChange={handleNatChange}
              placeholder="Select a country"
              isSearchable={true}
            />
          </div>
        </div>

        <button className="btn advanced-btn" onClick={handleClick}>
          Advanced options
        </button>
        <button
          type="submit"
          className="btn serach-btn"
          onClick={handleSearchButton}
        >
          Search
        </button>
      </div>
      {isOpen && <Modal handleCloseClick={handleCloseClick} />}
    </form>
  );
}

export default Form;
