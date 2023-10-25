// Define the URL for the JSON data
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let data; // Define a variable to store the data

// Fetch the JSON data and log it
d3.json(dataURL).then(function(responseData) {
  data = responseData; // Store the data in the 'data' variable
  console.log(data);
  
  // Initialize the dashboard
  init();
});

// Initialize the dashboard
function init() {
  if (data) {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
  
    // Use D3 to get sample names and populate the drop-down selector
    let sampleNames = data.names;
    sampleNames.forEach((sample) => {
      dropdownMenu.append("option").text(sample).property("value", sample);
    });
  
    // Set a variable for the first sample
    let firstSample = sampleNames[0];
  
    // Build the initial plots
    buildMetadata(firstSample);
    buildBarChart(firstSample);
    buildBubbleChart(firstSample);
  } else {
    console.error("Data not loaded properly.");
  }
}

// Function that populates metadata info
function buildMetadata(sample) {
  // Use D3 to retrieve all of the data
  let metadata = data.metadata;
  
  // Filter based on the value of the sample
  let resultArray = metadata.filter((obj) => obj.id == sample);
  
  // Get the first index from the array
  let result = resultArray[0];
  
  // Clear out metadata
  let metadataPanel = d3.select("#sample-metadata");
  metadataPanel.html("");
  
  // Use Object.entries to add each key/value pair to the panel
  Object.entries(result).forEach(([key, value]) => {
    metadataPanel.append("p").text(`${key}: ${value}`);
  });
}

// Function that builds the bar chart
function buildBarChart(sample) {
  if (data) {
    // Use D3 to retrieve all of the data
    let samples = data.samples;
  
    // Filter based on the value of the sample
    let resultArray = samples.filter((obj) => obj.id == sample);
  
    // Get the first index from the array
    let result = resultArray[0];
  
    // Get the otu_ids, labels, and sample values
    let otuIds = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;
  
    // Set top ten items to display in descending order
    let topTenOtuIds = otuIds.slice(0, 10).reverse();
    let topTenOtuLabels = otuLabels.slice(0, 10).reverse();
    let topTenSampleValues = sampleValues.slice(0, 10).reverse();
  
    // Set up the trace for the bar chart
    let trace = {
      x: topTenSampleValues,
      y: topTenOtuIds.map(otuId => `OTU ${otuId}`),
      text: topTenOtuLabels,
      type: "bar",
      orientation: "h"
    };
  
    // Set up the layout
    let layout = {
      title: "Top 10 OTUs"
    };
  
    // Call Plotly to plot the bar chart
    Plotly.newPlot("bar", [trace], layout);
  } else {
    console.error("Data not loaded properly.");
  }
}

// Function that builds the bubble chart
function buildBubbleChart(sample) {
  if (data) {
    // Access samples from the global 'data' variable
    let samples = data.samples;
  
    // Filter based on the value of the sample
    let resultArray = samples.filter((obj) => obj.id == sample);
  
    // Get the first index from the array
    let result = resultArray[0];
  
    // Get the otu_ids, labels, and sample values
    let otuIds = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;
  
    // Set up the trace for the bubble chart
    let trace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "Earth"
      }
    };
  
    // Set up the layout
    let layout = {
      title: "Belly Button Biodiversity",
      xaxis: { title: "OTU ID" }
    };
  
    // Call Plotly to plot the bubble chart
    Plotly.newPlot("bubble", [trace], layout);
  } else {
    console.error("Data not loaded properly.");
  }
}

// Function to update the dashboard when a new sample is selected
function optionChanged(newSample) {
  // Call the functions to update the dashboard
  buildMetadata(newSample, data);
  buildBarChart(newSample, data);
  buildBubbleChart(newSample, data);
}

// Use D3 to select the dropdown menu
d3.select("#selDataset").on("change", function() {
  // Get the selected value from the dropdown
  const newSample = d3.select("#selDataset").property("value");
  
  // Call the optionChanged function with the selected value
  optionChanged(newSample);
});

// Call the initialize function
init();

