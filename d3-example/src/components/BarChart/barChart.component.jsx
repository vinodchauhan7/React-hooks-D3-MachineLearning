import React, { useEffect, useState, useRef } from "react";
import { select, axisBottom, axisRight, scaleBand, scaleLinear } from "d3";

import "./barChart.styles.css";

const BarChart = () => {
  const svgRef = useRef();
  const [data, setData] = useState([15, 25, 45, 30, 50, 60, 75]);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([0, 100, 150])
      .range(["green", "yellow", "red"]);

    const xAxis = axisBottom(xScale).ticks(data.length);

    const yAxis = axisRight(yScale);

    svg
      .selectAll(".x-axis")
      .style("transform", "translate(0px,150px)")
      .call(xAxis);

    svg
      .selectAll(".y-axis")
      .style("transform", "translate(300px,0px)")
      .call(yAxis);

    svg
      .selectAll("bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", colorScale)
      .attr("transform", "scale(1,-1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("height", value => 150 - yScale(value));
  }, [data]);

  return (
    <React.Fragment>
      <div className="barContainer">
        <h1>Animated Bar Charts with user interactivity</h1>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <div className="buttons">
          <button onClick={() => setData(data.map(value => value + 5))}>
            Update data
          </button>
          <button
            onClick={() => setData([...data, Math.round(Math.random() * 100)])}
          >
            Add data
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BarChart;
