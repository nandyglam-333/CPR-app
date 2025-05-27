// pages/CoachDashboard.jsx
import React, { useEffect, useRef } from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import * as d3 from 'd3';
import './student-dashboard.css';

const coachName = 'Coach Emma';

const studentSummary = [
  { name: 'John Doe', rating: 1480 },
  { name: 'Jane Smith', rating: 1390 },
  { name: 'Emily Johnson', rating: 1325 },
  { name: 'Chris Brown', rating: 1435 },
];

const teamResults = [
  { outcome: 'Wins', value: 34 },
  { outcome: 'Losses', value: 10 },
  { outcome: 'Draws', value: 6 },
];

const monthlySessions = [
  { month: 'Jan', sessions: 12 },
  { month: 'Feb', sessions: 15 },
  { month: 'Mar', sessions: 10 },
  { month: 'Apr', sessions: 18 },
  { month: 'May', sessions: 14 },
];

const avgRatings = [
  { level: 'Beginner', avg: 1200 },
  { level: 'Intermediate', avg: 1350 },
  { level: 'Advanced', avg: 1485 },
];

function useD3(renderFn, deps) {
  const ref = useRef();
  useEffect(() => {
    renderFn(d3.select(ref.current));
    return () => d3.select(ref.current).selectAll('*').remove();
  }, deps);
  return ref;
}

function StudentRatingsChart() {
  const ref = useD3((svg) => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };

    const x = d3.scaleBand()
      .domain(studentSummary.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(studentSummary, d => d.rating)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.attr('viewBox', [0, 0, width, height]);

    svg.append('g')
      .selectAll('rect')
      .data(studentSummary)
      .enter().append('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.rating))
      .attr('height', d => y(0) - y(d.rating))
      .attr('width', x.bandwidth())
      .attr('fill', '#4caf50');

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-15)')
      .style('text-anchor', 'end');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, []);
  return <svg ref={ref} className="chart" />;
}

function TeamPieChart() {
  const ref = useD3((svg) => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(['#2196f3', '#f44336', '#ff9800']);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const labelArc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

    const g = svg.attr('viewBox', [0, 0, width, height])
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arcs = pie(teamResults);

    g.selectAll('path')
      .data(arcs)
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.outcome))
      .append('title')
      .text(d => `${d.data.outcome}: ${d.data.value}`);

    g.selectAll('text')
      .data(arcs)
      .enter().append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('class', 'pie-label')
      .text(d => `${d.data.outcome} (${d.data.value})`);
  }, []);
  return <svg ref={ref} className="chart" />;
}

function MonthlySessionsChart() {
  const ref = useD3((svg) => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const x = d3.scalePoint()
      .domain(monthlySessions.map(d => d.month))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(monthlySessions, d => d.sessions)]).nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => x(d.month))
      .y(d => y(d.sessions));

    svg.attr('viewBox', [0, 0, width, height]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('path')
      .datum(monthlySessions)
      .attr('fill', 'none')
      .attr('stroke', '#1976d2')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, []);
  return <svg ref={ref} className="chart" />;
}

function AvgRatingChart() {
  const ref = useD3((svg) => {
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const x = d3.scaleBand()
      .domain(avgRatings.map(d => d.level))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(avgRatings, d => d.avg)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.attr('viewBox', [0, 0, width, height]);

    svg.append('g')
      .selectAll('rect')
      .data(avgRatings)
      .enter().append('rect')
      .attr('x', d => x(d.level))
      .attr('y', d => y(d.avg))
      .attr('height', d => y(0) - y(d.avg))
      .attr('width', x.bandwidth())
      .attr('fill', '#ff9800');

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, []);
  return <svg ref={ref} className="chart" />;
}

export default function CoachDashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {coachName}!
      </Typography>

      <Box className="stats-cards">
        <div className="stats-card">
          <h3>58</h3>
          <p>Students Coached</p>
        </div>
        <div className="stats-card">
          <h3>50%</h3>
          <p>Avg Win Ratio</p>
        </div>
        <div className="stats-card">
          <h3>4.6 ★</h3>
          <p>Avg Player Rating</p>
        </div>
        <div className="stats-card">
          <h3>22</h3>
          <p>Active Players</p>
        </div>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className='dashboard-paper' elevation={3}>
            <Typography variant="h6" gutterBottom>Student Rating Overview</Typography>
            <StudentRatingsChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className='dashboard-paper' elevation={3}>
            <Typography variant="h6" gutterBottom>Team Match Outcomes</Typography>
            <TeamPieChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className='dashboard-paper' elevation={3}>
            <Typography variant="h6" gutterBottom>Monthly Sessions</Typography>
            <MonthlySessionsChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className='dashboard-paper' elevation={3}>
            <Typography variant="h6" gutterBottom>Avg Rating by Level</Typography>
            <AvgRatingChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}