import { React, useEffect, useRef } from "react";
import * as d3 from "d3";
import "../App.css";
import { maxX } from "../utils";

export const BarChartSupplier = (props) => {

  const width = +props.width, //hack to get int
    height = +props.height;
  const myRef = useRef();
  const divRef = useRef();

  useEffect(() => {
    doExit();
    draw();
    // eslint-disable-next-line
  }, [props]);


  const responsivefy = (svg) => {
    // Container is the DOM element, svg is appended.
    // Then we measure the container and find its
    // aspect ratio.
    const container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width"), 10),
      height = parseInt(svg.style("height"), 10),
      aspect = width / height;

    // Add viewBox attribute to set the value to initial size
    // add preserveAspectRatio attribute to specify how to scale
    // and call resize so that svg resizes on page load
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

    d3.select(window).on("resize." + container.attr("id"), resize);

    function resize() {
      const targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
    }
  };

  function doExit() {
    d3.select(divRef.current).selectAll("svg").remove();
  }

  const draw = () => {
    const data = props?.data || [];
    const maxScale = data?.reduce(maxX(props.property.yprop), 0) || 0;
    // append element
    const svg = d3
      .select(divRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    const margin = { y: 50, x: 20 };

    // axis
    const xScale = d3.scaleBand().padding(0.5);
    const yScale = d3.scaleLinear().domain([0, maxScale]); //max scale should be dynamic
    yScale.range([height, 0]);
    xScale.range([0, width]).domain(data.map((d) => d[props.property.xprop]));

    svg
      .attr("width", width + 2 * margin.x)
      .attr("height", height + 2 * margin.y)
      .call(responsivefy) // Call responsivefy to make the chart responsive
      .attr("id", "svg-bar");

    svg
      .append("text")
      .attr("x", width / 8 + margin.x)
      .attr("y", margin.y / 6)
      .attr("class", "title-bar-dark")
      .attr("text-anchor", "middle")
      .attr(props.title);

    // svg
    //   .append("text")
    //   .attr("x", width / 2 + margin.x)
    //   .attr("y", margin.y * 2)
    //   .attr("transform", `translate(0,${height - margin.y / 4})`)
    //   .attr("class", "title-bar")
    //   .text(props.xtitle);

    svg
      .append("text")
      .attr("x", -(height / 2) - margin.y)
      .attr("y", margin.x / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("class", "title-bar-dark")
      .text(props.ytitle);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.x},${margin.y})`);

    // chart.append("g").attr("class", "axis").call(d3.axisLeft(yScale));
    chart
      .append("g")
      .attr("class", "axis-dark")
      .attr("transform", `translate(0,${height})`)
      .style('font-size', 20)
      .call(d3.axisBottom(xScale));

    // chart
    //   .append("g")
    //   .attr("class", "grid-hline")
    //   .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(""));

    const path = chart.selectAll().data(data);

    path
      .enter()
      .append("rect").on('click', (e, d) => {
        props.handleBarChartClick(d);
      })
      .attr('id', (d) => d?.fornitore)
      .attr('opacity', (d) => {
        let opac = props.selected?.fornitore === d?.fornitore ? 1 : !props.selected ? 1 : 0.3;
        return opac;
      })
      .attr("class", "bg-bar")
      .attr("x", (d) => +xScale(d[props.property.xprop]))
      .attr("y", (d) => yScale(d[props.property.yprop]))
      .attr("height", (d) => height - yScale(d[props.property.yprop]))
      .attr("width", xScale.bandwidth())
      .append("title")
      .attr("x", (d) => xScale(d[props.property.xprop]))
      .attr("y", (d) => yScale(d[props.property.yprop]))
      .text((d) => `Fornitore ${d[props.property.xprop]} totale: ${d[props.property.yprop]}`)

    path
      .enter()
      .append("text")
      .attr("class", "bartext-dark")
      .attr("text-anchor", "center")

      .attr("fill", "black")
      .attr("x", (d) => xScale(d[props.property.xprop]) -25 )
      .attr("y", (d) =>
        height - yScale(d[props.property.yprop]) >= 0
          ? yScale(d[props.property.yprop]) - 10
          : yScale(d[props.property.yprop])
      )
      .text((d) => d[props.property.yprop]?.toLocaleString('it'));

    path.exit().remove();
  };

  return (
    <div ref={divRef}>
      {/* <div className="w-100 h-100 d-flex justify-content-start pr-5">
        <img src="logo.png" width="35" height="35" alt="" />
        <h5 className="pl-3 pl-sm-1">Distribuzione vaccini per fornitore</h5>
      </div> */}
      <svg ref={myRef}></svg>
    </div>
  );
};
