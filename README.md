# PrimeIT
PrimeIT test task

# Hierarchical Table Visualization with Filtering

## Overview

This is a small web application that visualizes a table with hierarchical row and column headers, as well as an interactive filtering area. The application allows the user to collapse/expand the hierarchy of the table and filter the data via dropdown menus.

The table structure includes a mock dataset, which is updated dynamically based on the filters selected by the user. The data visualization provides two different table styles (e.g. zebra stripes and plain black-and-white borders) and a button to switch between these styles.

## Features

- **Hierarchical Row and Column Headers**:
    - Expandable and collapsible headers both horizontally (columns) and vertically (rows).
    - Collapse/Expand functionality is indicated by icons (arrows, plus/minus).

- **Filtering**:
    - Dropdown menus for filtering data by multiple dimensions (e.g., Article, Region, Version, Legal Entity, etc.).
    - Each filter has at least 2 selections.
    - Visual states for dropdowns (e.g., clicked, highlighted).
    - Filtered data is updated and displayed instantly upon selection.

- **Dynamic Table Data**:
    - Data is retrieved dynamically through mock functions like `retrieveData()`, `filterChanged()`, and `collapseExpand()`.

- **Multiple Styles**:
    - Switch between at least two different table styles (e.g., zebra stripes or plain).
    - A button to toggle between styles.

- **Additional Visualization**:
    - Hover effects, icons for collapsing/expanding elements, and custom visualizations can be added.

## Data Structure

The data is organized in a hierarchical format with several dimensions. Each dimension (e.g., Article, Region, Legal Entity, etc.) contains elements, and the data is stored as key-value pairs.

### Example Dataset:

```json
{
  "columns": [
    {
      "name": "Article",
      "elements": ["All Articles", "Bikes", "Motorbikes"]
    },
    {
      "name": "Region",
      "elements": ["Europe", "Great Britain", "Germany"]
    },
    {
      "name": "Legal Entity",
      "elements": ["11", "12", "13", "All Entities"]
    },
    {
      "name": "Version",
      "elements": ["Actual", "Budget"]
    },
    {
      "name": "Currency",
      "elements": ["LC", "USD", "EUR"]
    },
    {
      "name": "Measure",
      "elements": ["Units", "Unit Price", "Gross Revenue"]
    }
  ],
  "data": [
    { "key": ["Motorbikes", "Germany", "11", "Actual", "LC", "Units"], "value": 276521 },
    { "key": ["Bikes", "Great Britain", "12", "Budget", "USD", "Gross Revenue"], "value": 987654 }
  ]
}
