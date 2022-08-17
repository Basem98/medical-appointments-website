const PieChart = ({ chartName, pieData }) => {
  let totalPieData = 0;
  let dashOffsetVal = 0;

  let keyIndex = [];
  let pieColors = [
    // "#03a9f4",
    // "#cddc39",
    // "#ffee58",
    // "#d4ac0d",
    "#003f5c",
    "#58508d",
    "#f1a600",
    "#1e8449",
    "#2196f3",
    "#ff6361",
    "#bc5090",
  ];
  for (let key in pieData) {
    totalPieData += pieData[key];
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
          opacity: 0.5;
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
      <h4 className="mt-3">{chartName}</h4>
      <svg viewBox="0 0 250 250">
        {Object.keys(pieData).map((key, indx) => (
          <>
            {
              (dashOffsetVal +=
                indx === 0
                  ? 0
                  : -(
                    (pieData[keyIndex[indx - 1]] / totalPieData) *
                    100 *
                    (2 * Math.PI * 50)
                  ) / 100)
            }
            <text y="5%">Total: {totalPieData}</text>

            <circle
              key={indx}
              r="20%"
              cy="50%"
              cx="50%"
              className="order-circle"
              strokeDasharray={`${((pieData[key] / totalPieData) *
                100 *
                (2 * Math.PI * 50)) /
                100
                } ${2 * Math.PI * 50}`}
              stroke={pieColors[indx]}
              strokeDashoffset={dashOffsetVal}
            />

            <text x="30%" y="95%" fill="tomato" id="pieText">
              {`${key[0].toUpperCase() + key.slice(1)}: ${pieData[key]} (${(
                (pieData[key] / totalPieData) *
                100
              ).toFixed(1)}%)`}
            </text>
          </>
        ))}
      </svg>
    </>
  );
};

export default PieChart;
