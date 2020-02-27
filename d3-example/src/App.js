import React, { useEffect, useRef, useState } from "react";
import { select, line, curveCardinal } from "d3";
import "./App.css";

function App() {
  const svgRef = useRef();
  const [data, setdata] = useState([15, 25, 45, 30, 50]);

  /**
   * This method using line() of d3 library and iterating our data array on its X-axis and y-axis
   * for X-axis : we are moving ahead using index value and multiply it with 50
   * y-axis : As our svg height is 150px, we are starting Yaxis from bottom and subtracting data item as per iteration.
   * curve : for giving smooth curves in line path we use curveCardinal
   */
  const myLine = line()
    .x((value, index) => index * 50)
    .y(value => 150 - value)
    .curve(curveCardinal);

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    svg
      .selectAll("path") //select all Path
      .data([data]) // Sync our data as array of array to let d3 only our data values bcs of single line
      .join("path") // Create a path
      .attr("d", value => myLine(value)) // Create d of path with myLine() method and passing our data array
      .attr("stroke", "blue")
      .attr("fill", "None");
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
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
