import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const IncomeChart = ({ weekIncomeData }) => {
  const svgHeight = 270;
  const highestPoint = svgHeight - 50;
  let maxCustomerNum = 0;

  for (let key in weekIncomeData) {
    maxCustomerNum =
      weekIncomeData[key] > maxCustomerNum ? weekIncomeData[key] : maxCustomerNum;
  }
  return (
    <>
      <h4 className="mt-3">Daily Income in L.E</h4>
      <svg viewBox="0 0 250 270">
        {Object.keys(weekIncomeData).map((key, indx) => (
          <>
            <circle
              key={uuidv4()}
              cx={indx === 0 ? 10 : indx * 35}
              cy={240 - (weekIncomeData[key] / maxCustomerNum) * highestPoint}
              fill="#ff4136"
              strokeWidth="1"
              r="5"
            ></circle>
            <text
              key={uuidv4()}
              x={indx * 35}
              y={240 - (weekIncomeData[key] / maxCustomerNum) * highestPoint - 10}
              fontSize=".8em"
            >
              {weekIncomeData[key]}
            </text>
            <text key={uuidv4()} x={indx * 35} y="250" fontSize=".85em">
              {key}
            </text>
          </>
        ))}
      </svg>
    </>
  );
};

export default IncomeChart;
