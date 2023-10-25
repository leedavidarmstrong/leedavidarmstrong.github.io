// Define the levels and corresponding colors for the gauge chart
const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const colors = [
  "lightgray",
  "lightgray",
  "lightgray",
  "lightgray",
  "lightgray",
  "lightgray",
  "lightgray",
  "lightgray",
  "lightgray",
  "lightgray"
];

// Function to update the gauge chart
function updateGaugeChart(washingFrequency) {
  console.log("Washing Frequency:", washingFrequency);
  // Calculate the angle for the pointer based on the washing frequency
  let levelAngle = (washingFrequency / 9) * 180;

  // Calculate the position of the pointer
  let radians = (90 - levelAngle) * (Math.PI / 180);
  let x = 0.5 * Math.cos(radians);
  let y = 0.5 * Math.sin(radians);

  // Define the path for the pointer
  let mainPath = "M -0.025 -0.05 L 0.025 -0.05 L " + x + " " + y + " Z";

  // Create the gauge chart data
  let gaugeData = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      text: washingFrequency,
      hoverinfo: "text"
    },
    {
      values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
      rotation: 90,
      text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: colors
      },
      labels: levels,
      hoverinfo: "label+text",
      hole: 0.5,
      type: "pie",
      direction: "counterclockwise",
    }
  ];

  // Define the layout for the gauge chart
  let gaugeLayout = {
    shapes: [
      {
        type: "path",
        path: mainPath,
        fillcolor: "850000",
        line: { color: "850000" }
      }
    ],
    title: "Belly Button Washing Frequency",
    height: 400,
    width: 400,
    xaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
    yaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] }
  };

  // Update the gauge chart
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}