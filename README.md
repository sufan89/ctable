# ctable - Canvas Table Component

A high-performance canvas-based table component with virtual scrolling and rich features.

## Features

- Virtual scrolling for high performance with large datasets
- Multi-level headers support
- Checkbox selection
- Custom cell rendering
- Mouse and keyboard interaction
- Proper resource management and cleanup

## Installation

```bash
npm install @sufan_89/ctable
```

## Usage

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title>CTable Example</title>
</head>
<body>
  <div id="table-container" style="width: 800px; height: 600px;"></div>
  <script type="module">
    import CTable from './dist/ctable.js'; // Or from npm package

    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name', width: 150 },
        { prop: 'age', label: 'Age', width: 100 },
        { prop: 'email', label: 'Email', width: 200 }
      ]
    };

    const table = new CTable('table-container', tableConfig);

    const tableData = [
      { name: 'John Doe', age: 30, email: 'john@example.com' },
      { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
      { name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
    ];

    table.setTableData(tableData);
  </script>
</body>
</html>
```

### Advanced Configuration

```javascript
import CTable from '@sufan_89/ctable';

const tableConfig = {
  Columns: [
    {
      prop: 'selection',
      label: 'Select',
      cellType: 'checkbox',
      width: 50
    },
    {
      prop: 'name',
      label: 'Name',
      width: 150,
      cellStyle: {
        backgroundColor: '#f5f5f5',
        color: '#333',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif'
      }
    },
    {
      prop: 'age',
      label: 'Age',
      width: 80,
      align: 'center'
    },
    {
      prop: 'details',
      label: 'Details',
      children: [
        { prop: 'city', label: 'City', width: 120 },
        { prop: 'country', label: 'Country', width: 120 }
      ]
    }
  ],
  rowStyle: {
    backgroundColor: '#fff',
    height: 30
  },
  headRowStyle: {
    backgroundColor: '#007acc',
    height: 40
  },
  headCellStyle: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  wheelSpeed: 0.8, // Customize scroll speed
  showBorder: true
};

const table = new CTable('table-container', tableConfig);
table.setTableData(yourDataArray);

// Add event listeners
table.on('RowClick', (rowData) => {
  console.log('Row clicked:', rowData);
});

table.on('CellClick', (cellData) => {
  console.log('Cell clicked:', cellData);
});
```

### Multi-Level Headers

CTable supports multi-level headers through the `children` property:

```javascript
const multiLevelConfig = {
  Columns: [
    {
      prop: 'personal',
      label: 'Personal Info',
      children: [
        { prop: 'name', label: 'Full Name', width: 150 },
        { prop: 'age', label: 'Age', width: 80 }
      ]
    },
    {
      prop: 'contact',
      label: 'Contact Info',
      children: [
        { prop: 'email', label: 'Email', width: 200 },
        { prop: 'phone', label: 'Phone', width: 150 }
      ]
    }
  ]
};
```

### Event Handling

CTable provides various events for interaction:

```javascript
// Row events
table.on('RowClick', (row) => console.log('Row clicked:', row));
table.on('HeaderRowClick', (headerRow) => console.log('Header row clicked:', headerRow));

// Cell events
table.on('CellClick', (cell) => console.log('Cell clicked:', cell));
table.on('HeaderCellClick', (headerCell) => console.log('Header cell clicked:', headerCell));

// Selection events
table.on('SelectionChange', (prop, selectedRows, currentRow) => {
  console.log('Selection changed:', prop, selectedRows, currentRow);
});
table.on('SelectAll', (prop, selectedRows) => {
  console.log('All selected:', prop, selectedRows);
});
```

### Resource Management

Properly destroy the table instance when no longer needed:

```javascript
// When you're done with the table
table.destroy();

// This will clean up:
// - All event listeners
// - DOM elements
// - References to prevent memory leaks
```

## API Reference

### Constructor

```typescript
new CTable(containerId: string, config: TableConfig)
```

### TableConfig Interface

```typescript
interface TableConfig {
  Columns: ColumnConfig[];
  headRowStyle?: IRowStyle | GetHeaderRowStyle;
  headCellStyle?: ICellStyle | GetHeaderCellStyle;
  rowStyle?: IRowStyle | GetRowStyle;
  baseFont?: baseFont;
  showBorder?: boolean;
  wheelSpeed?: number;
}
```

### ColumnConfig Interface

```typescript
interface ColumnConfig {
  prop: string;                 // Unique identifier for the column
  label?: string;               // Display label
  width?: string | number;      // Column width
  fixed?: "left" | "right";     // Fixed positioning
  align?: "start" | "end" | "center" | "left" | "right"; // Text alignment
  children?: ColumnConfig[];    // Nested columns for multi-level headers
  formatter?: Function;         // Format function for cell values
  sortable?: true | "custom" | false; // Sorting capability
  cellType?: cellType;          // Cell type (text, button, checkbox, custom, img)
  showToolTip?: true | false;   // Tooltip configuration
  checkBoxConfig?: CheckBoxStyle | GetCheckBoxStyle; // Checkbox styling
  headCellDisabled?: boolean | Function; // Disable header cell
  rowCellDisabled?: boolean | Function;  // Disable row cells
  cellStyle?: ICellStyle | GetCellStyle; // Custom cell styling
}
```

### Methods

- `setTableData(data: Array<rowValueType>)` - Sets the table data
- `reRender()` - Re-renders the table
- `on(eventName, callback, callOnce?)` - Adds an event listener
- `removeEvent(eventName)` - Removes an event listener
- `destroy()` - Cleans up resources and destroys the table instance

### Events

- `'CellClick'` - Triggered when a cell is clicked
- `'RowClick'` - Triggered when a row is clicked
- `'HeaderRowClick'` - Triggered when a header row is clicked
- `'HeaderCellClick'` - Triggered when a header cell is clicked
- `'SelectionChange'` - Triggered when selection changes
- `'SelectAll'` - Triggered when all items are selected

## Testing

The project includes comprehensive unit and integration tests to ensure reliability and functionality.

### Running Tests

To run all tests:

```bash
npm test
```

To run unit tests only:

```bash
npm run test:unit
```

To run integration tests only:

```bash
npm run test:integration
```

To run tests in watch mode:

```bash
npm run test:watch
```

### Test Structure

The tests are organized in the `test/` directory:

- `test/unit/` - Unit tests for individual components and functions
- `test/integration/` - Integration tests for combined components
- `test/fixtures/` - Test data and fixtures

### Test Coverage

Tests cover:

- Core table functionality
- Event handling and user interactions
- Edge cases and error handling
- Performance considerations
- Resource cleanup and destruction
- Type safety validations

## Building

To build the project:

```bash
npm run build
```

To build in watch mode:

```bash
npm run watch
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT