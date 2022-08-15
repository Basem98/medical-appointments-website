import React, { useState } from "react";

const IncomeChart = () => {
  let totalOrdersNum = 0;
  let dashOffsetVal = 0;
  const [incomeData, setIncomeData] = useState({
    Sat: 10,
    Sun: 20,
    Mon: 30,
    Tue: 9,
    Wed: 50,
    Thur: 70,
    Fri: 5,
  });
  let keyIndex = [];
  let pieColors = [
    // "#03a9f4",
    // "#cddc39",
    // "#ffee58",
    // "#d4ac0d",
    "#003f5c",
    "#58508d",
    "#bc5090",
    "#ff6361",
    "#f1a600",
    "#1e8449",
    "#2196f3",
  ];
  for (let key in incomeData) {
    totalOrdersNum += incomeData[key];
    keyIndex.push(key);
  }
  return (
    <>
      <style>
        {`
        .order-circle{
          fill: none;
          stroke-width: 70;
        }
        .order-circle:hover{
          stroke:  #99a3a4 ;
          cursor: pointer;
        }
        #pieText{
          display: none;
          border: 1px solid brown;
        }
        .order-circle:hover + #pieText{
          display: inline;
          // fill: #d4ac0d;
          font-size: .85em;
        }
      `}
      </style>
      <h4 className="mt-3">Income</h4>
      <svg viewBox="0 0 250 250">
        {Object.keys(incomeData).map((key, indx) => (
          <>
            {
              (dashOffsetVal +=
                indx === 0
                  ? 0
                  : -(
                    (incomeData[keyIndex[indx - 1]] / totalOrdersNum) *
                    100 *
                    (2 * Math.PI * 50)
                  ) / 100)
            }

            <circle
              key={indx}
              r="20%"
              cy="40%"
              cx="50%"
              className="order-circle"
              strokeDasharray={`${((incomeData[key] / totalOrdersNum) *
                100 *
                (2 * Math.PI * 50)) /
                100
                } ${2 * Math.PI * 50}`}
              stroke={pieColors[indx]}
              strokeDashoffset={dashOffsetVal}
            />

            <text x="50%" y="95%" fill="tomato" id="pieText">
              {`${key[0].toUpperCase() + key.slice(1)}: ${incomeData[key]} (${(
                (incomeData[key] / totalOrdersNum) *
                100
              ).toFixed(1)}%)`}
            </text>
          </>
        ))}
        <text y="95%">Total Income: {totalOrdersNum}</text>
      </svg>
    </>
  );
};

export default IncomeChart;
