D.js Interactive Dashboards Workflow

Interactive data visualizations and dashboards using D.js.
---

Purpose

Creates sophisticated, interactive data visualizations using D.js for dashboards, reports, and data analysis.

Use for:- TELOS consulting dashboards (project dependencies, constraint analysis)
- Blog post data visualizations (statistics, trends, relationships)
- Network diagrams (system architecture, organizational relationships)
- Interactive reports and presentations

This is NOT for:- Static diagrams → Use TechnicalDiagrams or Mermaid workflows
- Editorial illustrations → Use Essay workflow
- Simple infographics → Use other visualization workflows

---

Supported Visualization Types

Charts & Graphs
- Bar Charts- Comparisons, rankings, distributions
- Line Charts- Trends over time, performance metrics
- Scatter Plots- Correlations, clusters, outliers
- Area Charts- Cumulative values, stacked comparisons
- Pie/Donut Charts- Proportions, percentages

Network & Relationships
- Force-Directed Graphs- Project dependencies, team relationships
- Tree Diagrams- Hierarchies, organizational structures
- Chord Diagrams- Entity relationships, data flow
- Sankey Diagrams- Flow visualization, process mapping

Advanced
- Heatmaps- Intensity, density, correlation matrices
- Geographic Maps- Location data, regional analysis
- Timeline Visualizations- Project milestones, historical data
- Custom Dashboards- Multi-chart compositions

---

Color Palette (PAI Standard)

Primary Colors:```
Deep Purple: AC   - Brand accent
Deep Teal:   B   - Secondary accent
Charcoal:    DDD   - Text and lines
```

Data Visualization Colors:- Sequential scales for continuous data: `d.interpolateViridis`, `d.interpolatePlasma`
- Categorical scales for discrete data: `d.schemeCategory`, `d.schemeSet`
- Maintain accessibility with sufficient contrast

Typography:- System fonts: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`
- Label sizes: px for axes, px for titles
- Consistent spacing and alignment

---

Implementation Approach

Standard Workflow

```javascript
function createVisualization(data, config) {
  // . Setup SVG container
  const svg = d.select('chart');
  svg.selectAll("").remove(); // Clear previous render

  // . Define dimensions with margins
  const width = , height = ;
  const margin = { top: , right: , bottom: , left: };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // . Create scales
  const xScale = d.scaleLinear()
    .domain([, d.max(data, d => d.value)])
    .range([, innerWidth]);

  // . Create axes
  const xAxis = d.axisBottom(xScale);

  // . Bind data and create elements
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // . Add interactive features
  g.selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', d => xScale(d.value))
    .attr('cy', height / )
    .attr('r', )
    .on('mouseover', showTooltip)
    .on('mouseout', hideTooltip);
}
```

Integration Patterns

Direct DOM Manipulation (Recommended):- Dselects and imperatively manipulates DOM elements
- Works in any JavaScript context
- Full control over rendering

Declarative Rendering:- Dcalculates scales and layouts
- Framework renders via templating
- Suitable for simpler visualizations

---

Interactive Features

Tooltips

```javascript
const tooltip = d.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', );

function showTooltip(event, d) {
  tooltip.transition()
    .duration()
    .style('opacity', .);
  tooltip.html(`Value: ${d.value}`)
    .style('left', (event.pageX + ) + 'px')
    .style('top', (event.pageY - ) + 'px');
}
```

Zoom & Pan

```javascript
const zoom = d.zoom()
  .scaleExtent([., ])
  .on('zoom', (event) => {
    g.attr('transform', event.transform);
  });

svg.call(zoom);
```

Transitions & Animations

```javascript
circles.transition()
  .duration()
  .delay((d, i) => i )
  .attr('r', d => radiusScale(d.value))
  .style('fill', d => colorScale(d.category))
  .ease(d.easeBounceOut);
```

Responsive Design

```javascript
// Handle container resizing
const resizeObserver = new ResizeObserver(entries => {
  const { width, height } = entries[].contentRect;
  redrawVisualization(width, height);
});

resizeObserver.observe(document.querySelector('chart-container'));
```

---

TELOS Dashboard Patterns

Project Dependency Network

```javascript
// Force-directed graph for project dependencies
const simulation = d.forceSimulation(nodes)
  .force('link', d.forceLink(links).id(d => d.id))
  .force('charge', d.forceManyBody().strength(-))
  .force('center', d.forceCenter(width / , height / ));

// Visualize blockers as red nodes
nodes.forEach(node => {
  node.color = node.isBlocker ? 'DFF' : 'AC';
});
```

Constraint Theory Visualization

```javascript
// Bottleneck analysis with bar chart
const constraints = [
  { name: 'Resource A', impact: , isBottleneck: true },
  { name: 'Resource B', impact: , isBottleneck: false },
  // ...
];

// Highlight bottlenecks in contrasting color
bars.attr('fill', d => d.isBottleneck ? 'DFF' : 'B');
```

Progress Dashboard

```javascript
// Multi-metric dashboard
const metrics = {
  currentCustomers: ,
  targetCustomers: ,
  growthRate: .,
  blockers: };

// Create gauge chart for progress
const progress = (metrics.currentCustomers / metrics.targetCustomers) ;
createGaugeChart(progress);
```

---

Best Practices

Data Validation
```javascript
// Always validate and clean data first
const cleanData = data.filter(d =>
  d.value !== null &&
  d.value !== undefined &&
  !isNaN(d.value)
);
```

Performance Optimization
- <elements: Use SVG (optimal)
- -,elements: Consider canvas rendering
- >,elements: Implement virtual scrolling or aggregation

Accessibility
```javascript
// Add ARIA labels and semantic markup
svg.attr('role', 'img')
   .attr('aria-label', 'Bar chart showing project metrics');

// Add keyboard navigation
circles.attr('tabindex', )
       .on('keypress', handleKeyPress);
```

Error Handling
```javascript
// Graceful error handling
try {
  const svg = d.select('chart');
  if (svg.empty()) {
    throw new Error('Chart container not found');
  }

  if (!Array.isArray(data) || data.length === ) {
    throw new Error('Invalid or empty data');
  }

  renderVisualization(data);
} catch (error) {
  console.error('Visualization error:', error);
  showErrorMessage('Unable to render chart. Please check your data.');
}
```

---

Output Formats

HTML Artifact
- Complete standalone HTML file
- Embedded D.js library (CDN or inline)
- Responsive container
- Interactive controls

Code Snippet
- Reusable JavaScript function
- Configurable parameters
- Documentation comments

Dashboard Page
- Multi-chart layout
- Coordinated interactions
- Shared data filtering
- Export/download functionality

---

Quick Start Examples

Bar Chart
```javascript
// Simple bar chart
const data = [, , , , , ];

d.select('chart')
  .selectAll('div')
  .data(data)
  .join('div')
  .style('width', d => `${d }px`)
  .style('height', 'px')
  .style('background', 'AC')
  .text(d => d);
```

Network Diagram
```javascript
// Project dependency network
const nodes = [
  { id: 'A', label: 'API' },
  { id: 'B', label: 'Database' },
  { id: 'C', label: 'Frontend' }
];

const links = [
  { source: 'A', target: 'B' },
  { source: 'C', target: 'A' }
];

createForceDirectedGraph(nodes, links);
```

---

D.js Resources

Core Concepts:- Selections: `d.select()`, `d.selectAll()`
- Data binding: `.data()`, `.join()`
- Scales: `d.scaleLinear()`, `d.scaleBand()`, `d.scaleOrdinal()`
- Axes: `d.axisBottom()`, `d.axisLeft()`
- Shapes: `d.line()`, `d.arc()`, `d.area()`

Layout Algorithms:- Force simulation: `d.forceSimulation()`
- Hierarchies: `d.hierarchy()`, `d.tree()`
- Chord: `d.chord()`
- Sankey: `d.sankey()`

Official Documentation:- https://djs.org/
- https://observablehq.com/@d/gallery

---

Execution

. Gather data requirements and determine visualization type
. Choose appropriate chart/graph pattern
. Set up HTML structure with D.js
. Implement visualization with standard color palette
. Add interactivity (tooltips, zoom, transitions)
. Validate accessibility and responsiveness
. Output as HTML artifact or code snippet

---

Validation

Must have:- [ ] Clean, professional appearance
- [ ] Standard color palette applied
- [ ] Interactive features working
- [ ] Responsive to container size
- [ ] Accessible (ARIA labels, keyboard nav)
- [ ] Data validation in place
- [ ] Error handling for edge cases

Must NOT have:- [ ] Generic color schemes
- [ ] Static-only presentation when interactivity makes sense
- [ ] Missing axis labels or legends
- [ ] Overflow or cropped elements
