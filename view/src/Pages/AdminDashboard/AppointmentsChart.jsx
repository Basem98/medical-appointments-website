const AppointmentsChart = ({ weekAppointmentsData }) => {
  const svgHeight = 270;
  const highestBar = svgHeight - 50;
  let maxAppointment = 0;

  for (let key in weekAppointmentsData) {
    maxAppointment = weekAppointmentsData[key] > maxAppointment ? weekAppointmentsData[key] : maxAppointment;
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

      <h4 className="mt-3">Daily Appointments</h4>
      <svg
        // height={svgHeight}
        // width="100%"
        viewBox="0 0 250 270"
      // className="ps-0"
      >
        {Object.keys(weekAppointmentsData).map((key, indx) => (
          <g key={indx} transform={`translate(${indx * 35}, 0)`}>
            <text
              y={svgHeight - (weekAppointmentsData[key] / maxAppointment) * highestBar - 35}
              fontSize=".8em"
            >
              {weekAppointmentsData[key]}
            </text>
            <rect
              height={(weekAppointmentsData[key] / maxAppointment) * highestBar}
              width="20"
              y={svgHeight - (weekAppointmentsData[key] / maxAppointment) * highestBar - 30}
              className={
                weekAppointmentsData[key] === maxAppointment
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
