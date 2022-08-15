import React, { useState } from "react";
const AppointmentsChart = () => {
  const svgHeight = 270;
  const highestBar = svgHeight - 50;
  let maxAppointment = 0;
  const [appointmentsData, setAppointmentsData] = useState({
    Sat: 10,
    Sun: 20,
    Mon: 30,
    Tue: 9,
    Wed: 50,
    Thur: 70,
    Fri: 5,
  });
  for (let key in appointmentsData) {
    maxAppointment = appointmentsData[key] > maxAppointment ? appointmentsData[key] : maxAppointment;
  }
  return (
    <>
      <style>
        {` 
          .spark-bar{
            fill: #aaa;
          }
          .spark-bar-tallest{
            fill: blue;
          }
          .spark-bar:hover, .spark-bar:focus, .spark-bar-tallest:hover, .spark-bar-tallest:focus{
          fill: black !important;
          cursor: pointer;
          }
        `}
      </style>

      <h4 className="mt-3">Appointments</h4>
      <svg
        // height={svgHeight}
        // width="100%"
        viewBox="0 0 250 270"
      // className="ps-0"
      >
        {Object.keys(appointmentsData).map((key, indx) => (
          <g key={indx} transform={`translate(${indx * 35}, 0)`}>
            <text
              y={svgHeight - (appointmentsData[key] / maxAppointment) * highestBar - 35}
              fontSize=".8em"
            >
              {appointmentsData[key]}
            </text>
            <rect
              height={(appointmentsData[key] / maxAppointment) * highestBar}
              width="20"
              y={svgHeight - (appointmentsData[key] / maxAppointment) * highestBar - 30}
              className={
                appointmentsData[key] === maxAppointment
                  ? "spark-bar-tallest"
                  : "spark-bar"
              }
            ></rect>
            <text y={svgHeight - 10} fontSize=".85em">
              {key}
            </text>
          </g>
        ))}
      </svg>
    </>
  );
};

export default AppointmentsChart;
