import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

function GraphOne({data}) {
  
  const createGraph = () => {

    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    var svg = d3
      .select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis and Y axis
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    x.domain(
      d3.extent(data, (d) => {
        return d.Question_no;
      })
    );

    y.domain([-3, 7]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .style("font-size", 20)
      .text("User Question Progess Chart");
    // X label

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 480)
      .attr("text-anchor", "middle")
      .style("font-size", 17)
      .text("Questions");

    // Y label

    svg
      .append("text")
      .attr("x", 200)
      .attr("y", -100)
      .attr("text-anchor", "middle")
      .attr("transform", "translate(60," + height + ")rotate(-90)")
      .style("font-size", 17)
      .text("Score per Question");

    // add the Linex
    var valueLine = d3
      .line()
      .x((d) => {
        return x(d.Question_no);
      })
      .y((d) => {
        return y(d.Score);
      });
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);
  };
  useEffect(() => {
    createGraph();
  }, []);
  return <svg></svg>;
}

export default GraphOne;
