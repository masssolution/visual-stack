# Visual Stack - A Flexible Grid and Visualization Library

`Visual Stack` is a lightweight, modular JavaScript library that combines dynamic grid layouts with data visualizations. Powered by **VisualStack.js** for grid management and **D3.js** for rendering charts, `Visual Stack` allows you to create interactive and customizable dashboards with ease.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
    - [Basic Example](#basic-example)
    - [Schema Example](#schema-example)
    - [Customizing Grid Items](#customizing-grid-items)
- [API](#api)
    - [VisualStack API](#VisualStack-api)
    - [Visualization API](#visualization-api)
    - [Schema API](#schema-api)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Dynamic Grid Layouts**: Drag-and-drop and resize grid items with support for a flexible, responsive grid.
- **Data Visualizations**: Built-in chart types like bar charts, line charts, and pie charts powered by D3.js.
- **Schema-Driven Rendering**: Easily configure grid items and visualizations via a simple schema object.
- **Customizable**: Fully customizable grid layout, visualization styles, and chart settings.
- **Lightweight & Modular**: Minimal dependencies (VisualStack.js and D3.js) and small bundle size.
- **No External Fetching Libraries**: Data handling is manual, so you can integrate your own data fetching logic.

---

## Installation

To get started with `visual-stack`, you can install it via **npm** or **yarn**:

```bash
npm install visual-stack
# or
yarn add visual-stack
```

Once installed, you can import the library into your project:

```js
import VisualStack from 'visual-stack';
```

---

## Usage

### Basic Example

Here’s how to create a simple grid with a bar chart visualization:

```html
<div id="grid-container"></div>

<script type="module">
    import VisualStack from 'visual-stack';

    const grid = new VisualStack.GridContainer('#grid-container');

    // Add a grid item with a bar chart
    grid.addItem('chart-1', {
        type: 'bar-chart',
        data: [
            { label: 'A', value: 30 },
            { label: 'B', value: 80 },
            { label: 'C', value: 45 },
        ],
        width: 4,
        height: 4,
        config: {
            title: 'Sample Bar Chart',
            color: '#4caf50',
        }
    });
</script>
```

### Schema Example

With Visual Stack, you can use a schema to define your grid items and visualizations:

```js
const schema = [
    {
        id: 'chart-1',
        type: 'bar-chart',
        data: [
            { label: 'A', value: 40 },
            { label: 'B', value: 55 },
            { label: 'C', value: 30 },
        ],
        config: {
            title: 'Revenue by Product',
            color: '#ff5722',
        },
    },
    {
        id: 'chart-2',
        type: 'pie-chart',
        data: [
            { label: 'Product A', value: 35 },
            { label: 'Product B', value: 65 },
        ],
        config: {
            title: 'Market Share',
        },
    }
];

// Initialize and render grid items based on schema
const grid = new Visual Stack.GridContainer('#grid-container');
schema.forEach(item => {
    grid.addItem(item.id, item);
});
```

### Customizing Grid Items

You can customize grid items with options such as size, position, and other chart properties. For example:

```js
grid.addItem('custom-chart', {
    type: 'line-chart',
    data: [...],
    width: 6,
    height: 6,
    config: {
        title: 'Sales Growth',
        color: '#1976d2',
        axis: { x: 'Month', y: 'Revenue' }
    }
});
```

---

## API

### VisualStack API

- **GridContainer**: Initializes the grid container.

    ```js
    const grid = new VisualStack.GridContainer(selector, options);
    ```

- **addItem(itemId, config)**: Adds a new grid item to the container.

    ```js
    grid.addItem(itemId, config);
    ```

- **removeItem(itemId)**: Removes a grid item by its ID.

    ```js
    grid.removeItem(itemId);
    ```

- **updateItem(itemId, config)**: Updates the grid item configuration.

    ```js
    grid.updateItem(itemId, config);
    ```

### Visualization API

- **create(type, data, config)**: Creates a new chart of the specified type.

    ```js
    const chart = VisualStack.create('bar-chart', data, config);
    ```

    Supported Chart Types:
    - `'bar-chart'`
    - `'line-chart'`
    - `'pie-chart'`

- **updateData(data)**: Updates the data for an existing chart.

    ```js
    chart.updateData(newData);
    ```

### Schema API

- **create(config)**: Generates grid items and visualizations based on the provided schema.

    ```js
    VisualStack.Schema.create(config);
    ```

- **updateItem(itemId, data)**: Updates data for a specific grid item.

    ```js
    VisualStack.Schema.updateItem(itemId, newData);
    ```

---

## Contributing

We welcome contributions to improve Visual Stack. Here’s how you can get involved:

1. Fork the repository.
2. Clone the repository to your local machine.
3. Create a branch for your feature/bugfix.
4. Make your changes and commit them with a meaningful message.
5. Push your changes to your fork.
6. Create a pull request to merge your changes.

---

## License

Visual Stack is licensed under the Appache Liscence.

---

## Contact

If you have any questions or need help, feel free to open an issue or contact the maintainers.