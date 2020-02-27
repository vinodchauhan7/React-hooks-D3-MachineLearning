import React, { useEffect, useRef, useState } from "react";
import { select } from "d3";
import "./App.css";

function App() {
  const svgRef = useRef();

  const [data, setdata] = useState([10, 20, 30, 40, 50]);

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "red")
      .attr("fill", "None");
  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default App;
