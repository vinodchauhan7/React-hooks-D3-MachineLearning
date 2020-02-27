import React, { useEffect, useRef, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  axisRight
} from "d3";
import "./App.css";

function App() {
  const svgRef = useRef();
  const [data, setdata] = useState([15, 25, 45, 30, 50, 65, 75]);

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);

    /**
     * As we know our svg by default is 300 X 150 size
     * ScaleLinear help us to set the range from 0 to end. Ex: start to end (0 to 300)
     * also it help us on which value basis we want to move forward or Backword.
     * domain : it helps us to reach start or end of our range.
     * range : It decide where we want to reach based on our domain value.
     */
    const xScale = scaleLinear()
      .domain([0, data.length - 1]) //data total length will help us to reach 300px from 0 values
      .range([0, 300]);

    const yScale = scaleLinear()
      .domain([0, 150]) // from 0 to 150 value we will go bottom to up range(150 - 0) in y axis
      .range([150, 0]);

    /**
     * This method using line() of d3 library and iterating our data array on its X-axis and y-axis
     * for X-axis : we are moving ahead using index value and multiply it with 50
     * y-axis : As our svg height is 150px, we are starting Yaxis from bottom and subtracting data item as per iteration.
     * curve : for giving smooth curves in line path we use curveCardinal
     */
    const myLine = line()
      .x((value, index) => xScale(index)) //set our xScale
      .y(yScale) //set our yScale
      .curve(curveCardinal);

    //This xAxis will create the number on x-Axis in the svg acc to data.length
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index);

    //svg will creat the x-axis numbering on the className=".x-axis" and translate to bottom of svg.
    svg
      .selectAll(".x-axis")
      .style("transform", "translate(0px,150px)")
      .call(xAxis);

    //This yAxis will create the number on y-Axis in the svg on the height basis.
    const yAxis = axisRight(yScale);
    svg
      .selectAll(".y-axis")
      .style("transform", "translate(300px,0px)")
      .call(yAxis);

    //Make a Path
    svg
      .selectAll(".line") //select all lin
      .data([data]) // Sync our data as array of array to let d3 only our data values bcs of single line
      .join("path") // Create a path
      .attr("class", "line") // add a class line in Path
      .attr("d", value => myLine(value)) // Create d of path with myLine() method and passing our data array
      .attr("stroke", "blue")
      .attr("fill", "None");
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button
        onClick={() => setdata([...data, Math.floor(Math.random() * 16) + 5])}
      >
        Add Data
      </button>
      <br />
      <button onClick={() => setdata(data.map(value => value + 5))}>
        Update Y-Axis
      </button>
    </React.Fragment>
  );
}

export default App;
