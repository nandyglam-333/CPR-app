// pages/StudentDashboard.jsx
import React, { useEffect, useRef } from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import * as d3 from 'd3';
import './student-dashboard.css';

const studentName = 'John Doe';

const ratingProgress = [
  { month: 'Jan', rating: 1250 },
  { month: 'Feb', rating: 1320 },
  { month: 'Mar', rating: 1375 },
  { month: 'Apr', rating: 1420 },
  { month: 'May', rating: 1480 },
];

const pieData = [
  { name: 'Wins', value: 18 },
  { name: 'Losses', value: 6 },
  { name: 'Draws', value: 4 },
];

const openingStats = [
  { opening: 'Sicilian Defense', games: 10 },
  { opening: 'French Defense', games: 6 },
  { opening: "Queen's Gambit", games: 8 },
  { opening: "King's Indian Defense", games: 4 },
];

function useD3(renderChartFn, dependencies) {
  const ref = useRef();
  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => d3.select(ref.current).selectAll('*').remove();
  }, dependencies);
  return ref;
}

function LineChartD3() {
  const ref = useD3((svg) => {
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3.scalePoint()
      .domain(ratingProgress.map(d => d.month))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([1200, d3.max(ratingProgress, d => d.rating)]).nice(2)
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => x(d.month))
      .y(d => y(d.rating));

    svg.attr('viewBox', [0, 0, width, height]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('path')
      .datum(ratingProgress)
      .attr('fill', 'none')
      .attr('stroke', '#3f51b5')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, []);
  return <svg ref={ref} className="chart" />;
}

function PieChartD3() {
  const ref = useD3((svg) => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(['#4caf50', '#f44336', '#ff9800']);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const labelArc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

    const g = svg
      .attr('viewBox', [0, 0, width, height])
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arcs = pie(pieData);

    g.selectAll('path')
      .data(arcs)
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.name))
      .append('title')
      .text(d => `${d.data.name}: ${d.data.value}`);

    g.selectAll('text')
      .data(arcs)
      .enter().append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .text(d => `${d.data.name} (${d.data.value})`);
  }, []);
  return <svg ref={ref} className="chart" />;
}

function BarChartD3() {
  const ref = useD3((svg) => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };

    const x = d3.scaleBand()
      .domain(openingStats.map(d => d.opening))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(openingStats, d => d.games)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.attr('viewBox', [0, 0, width, height]);

    svg.append('g')
      .selectAll('rect')
      .data(openingStats)
      .enter().append('rect')
      .attr('x', d => x(d.opening))
      .attr('y', d => y(d.games))
      .attr('height', d => y(0) - y(d.games))
      .attr('width', x.bandwidth())
      .attr('fill', '#2196f3');

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-15)")
      .style("text-anchor", "end");

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, []);
  return <svg ref={ref} className="chart" />;
}

export default function StudentDashboard() {
  return (
    <div className='dashboard-container'>
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome, {studentName}!
        </Typography>

        <Box className="stats-cards">
          <div className="stats-card">
            <h3>72</h3>
            <p>Heart Rate (BPM)</p>
          </div>
          <div className="stats-card">
            <h3>8,450</h3>
            <p>Steps Today</p>
          </div>
          <div className="stats-card">
            <h3>5.3 km</h3>
            <p>Distance Walked</p>
          </div>
          <div className="stats-card">
            <h3>430</h3>
            <p>Calories Burned</p>
          </div>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className='dashboard-paper' elevation={3}>
              <Typography variant="h6" gutterBottom>Rating Progress</Typography>
              <LineChartD3 />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className='dashboard-paper' elevation={3}>
              <Typography variant="h6" gutterBottom>Match Outcomes</Typography>
              <PieChartD3 />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className='dashboard-paper' elevation={3}>
              <Typography variant="h6" gutterBottom>Most Played Openings</Typography>
              <BarChartD3 />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}