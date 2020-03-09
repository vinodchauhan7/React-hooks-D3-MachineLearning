import React, { useRef, useEffect } from "react";
import { select, arc, pie, interpolate } from "d3";
import "./gChart.styles.css";

function GaugeChart({ data }) {
  const svgRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    const arcGenerator = arc()
      .innerRadius(75)
      .outerRadius(150);

    const pieGenerator = pie()
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI)
      .sort(null);

    const instructions = pieGenerator(data);

    svg
      .selectAll(".slice")
      .data(instructions)
      .join("path")
      .attr("class", "slice")
      .attr("fill", (instruction, index) => (index === 0 ? "#eee" : "#ffcc00"))
      .style("transform", "translate(150px, 100px)")
      .transition()
      .attrTween("d", function(nextInstruction, index) {
        const initialInstruction = pieGenerator([0, 1])[index];
        const interpolator = interpolate(
          this.lastInstruction || initialInstruction,
          nextInstruction
        );
        this.lastInstruction = interpolator(1);
        return function(t) {
          return arcGenerator(interpolator(t));
        };
      });

    // draw the gauge
  }, [data]);

  return (
    <div className="gContainer">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default GaugeChart;
