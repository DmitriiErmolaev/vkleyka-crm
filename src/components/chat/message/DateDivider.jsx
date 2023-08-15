import React from 'react';
import "../../../assets/chat/date-divider.scss";

const DateDivider = ({date}) => {
  return (
    <li className="date-divider">
      <div className="date-container">
        <span className="date-text">
          {date}
        </span>
      </div>
    </li>
  );
};

export default DateDivider;
