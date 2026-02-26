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

## Cell Types

CTable supports multiple cell types through the `cellType` property:

### Text Cell (Default)

```javascript
const tableConfig = {
  Columns: [
    { prop: 'name', label: 'Name', width: 150, cellType: 'text' },
    { prop: 'email', label: 'Email', width: 200 }
  ]
};
```

### Checkbox Cell

```javascript
const tableConfig = {
  Columns: [
    {
      prop: 'selection',
      label: 'Select All',
      cellType: 'checkbox',
      width: 50,
      checkBoxConfig: {
        size: 16,
        backGround: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        disabledColor: '#f5f5f5',
        disabledCheckedColor: '#999'
      }
    },
    { prop: 'name', label: 'Name', width: 150 },
    { prop: 'email', label: 'Email', width: 200 }
  ]
};

// Listen for selection changes
table.on('SelectionChange', (prop, selectedRows, currentRow) => {
  console.log('Selected rows:', selectedRows);
});

table.on('SelectAll', (prop, selectedRows) => {
  console.log('All selected:', selectedRows);
});
```

### Image Cell

```javascript
const tableConfig = {
  Columns: [
    { prop: 'avatar', label: 'Avatar', width: 60, cellType: 'image' },
    { prop: 'name', label: 'Name', width: 150 },
    { prop: 'email', label: 'Email', width: 200 }
  ],
  rowStyle: { height: 50 }
};

table.setTableData([
  { avatar: 'https://example.com/avatar1.png', name: 'John', email: 'john@example.com' },
  { avatar: 'https://example.com/avatar2.png', name: 'Jane', email: 'jane@example.com' }
]);
```

### Button Cell

```javascript
const tableConfig = {
  Columns: [
    { prop: 'name', label: 'Name', width: 150 },
    {
      prop: 'action',
      label: 'Action',
      width: 100,
      cellType: 'button'
    }
  ]
};

table.on('CellClick', (rowData, column, cellValue, rowIndex) => {
  if (column.prop === 'action') {
    console.log('Button clicked for row:', rowIndex, rowData);
    // Perform your action here
  }
});
```

### Custom Cell

```javascript
const tableConfig = {
  Columns: [
    { prop: 'name', label: 'Name', width: 150 },
    {
      prop: 'status',
      label: 'Status',
      width: 120,
      cellType: 'custom'
    }
  ]
};
```

## Style Configuration

### Row Style

```javascript
const tableConfig = {
  Columns: [
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'name', label: 'Name', width: 150 }
  ],
  rowStyle: {
    height: 40,              // Row height
    backgroundColor: '#fff', // Background color
    color: '#333',           // Text color
    fontSize: '14px',        // Font size
    fontWeight: 'normal'     // Font weight
  }
};
```

### Dynamic Row Style

You can also provide a function to dynamically set row styles:

```javascript
const tableConfig = {
  Columns: [
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'status', label: 'Status', width: 100 }
  ],
  rowStyle: (rowValue, rowIndex) => {
    // Alternate row colors
    return {
      height: 35,
      backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f9f9f9',
      color: rowValue.status === 'active' ? '#4caf50' : '#f44336'
    };
  }
};
```

### Header Style

```javascript
const tableConfig = {
  Columns: [
    { prop: 'name', label: 'Name', width: 150 },
    { prop: 'email', label: 'Email', width: 200 }
  ],
  headRowStyle: {
    backgroundColor: '#4a90e2', // Header background
    height: 45                  // Header row height
  },
  headCellStyle: {
    color: '#fff',              // Header text color
    fontSize: '14px',           // Header font size
    fontWeight: 'bold'          // Header font weight
  }
};
```

### Cell Style

```javascript
const tableConfig = {
  Columns: [
    {
      prop: 'id',
      label: 'ID',
      width: 80,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: '#f5f5f5'
      }
    },
    {
      prop: 'status',
      label: 'Status',
      width: 100,
      // Dynamic cell style
      cellStyle: (columnInfo, cellValue) => {
        const colors = {
          active: '#4caf50',
          inactive: '#f44336',
          pending: '#ff9800'
        };
        return {
          backgroundColor: colors[cellValue] || '#999',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '4px'
        };
      }
    }
  ]
};
```

## Formatter

Use the `formatter` property to customize cell display values:

```javascript
const tableConfig = {
  Columns: [
    { prop: 'name', label: 'Name', width: 150 },
    {
      prop: 'birthDate',
      label: 'Birth Date',
      width: 150,
      formatter: (row, column, cellValue) => {
        if (!cellValue) return '-';
        const date = new Date(cellValue);
        return date.toLocaleDateString();
      }
    },
    {
      prop: 'status',
      label: 'Status',
      width: 100,
      formatter: (row, column, cellValue) => {
        return cellValue === 1 ? 'Active' : 'Inactive';
      }
    }
  ]
};
```

## Large Dataset Performance

CTable is optimized for handling large datasets with virtual scrolling:

```javascript
// Generate large dataset
function generateData(count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Developer', 'Designer', 'Manager', 'Analyst'][i % 4],
      department: ['Engineering', 'Design', 'Management', 'Finance'][i % 4]
    });
  }
  return data;
}

const tableConfig = {
  Columns: [
    { prop: 'id', label: 'ID', width: 80, align: 'center' },
    { prop: 'name', label: 'Name', width: 150 },
    { prop: 'email', label: 'Email', width: 200 },
    { prop: 'role', label: 'Role', width: 120 },
    { prop: 'department', label: 'Department', width: 150 }
  ],
  rowStyle: { height: 35 },
  wheelSpeed: 0.8 // Adjust scroll speed for better UX
};

const table = new CTable('table-container', tableConfig);
table.setTableData(generateData(10000)); // 10K rows rendered efficiently
```

## Responsive Container

For responsive tables, the canvas size updates automatically when the container resizes:

```html
<div id="table-container" style="width: 100%; height: 500px;"></div>

<script>
  const table = new CTable('table-container', {
    Columns: [
      { prop: 'name', label: 'Name', width: '20%' },
      { prop: 'email', label: 'Email', width: '30%' },
      { prop: 'phone', label: 'Phone', width: '20%' },
      { prop: 'address', label: 'Address', width: '30%' }
    ]
  });
</script>
```

## Error Handling

```javascript
try {
  const table = new CTable('non-existent-id', {
    Columns: []
  });
} catch (error) {
  console.error('Error:', error.message);
}

// Handle invalid container
const container = document.getElementById('container');
if (!container) {
  console.error('Container element not found');
}
```

## TypeScript Usage

CTable provides full TypeScript support with type definitions:

```typescript
import CTable from '@sufan_89/ctable';

// Define your data type
interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

const tableConfig: CTable.TableConfig = {
  Columns: [
    {
      prop: 'selection',
      label: 'Select',
      cellType: 'checkbox',
      width: 50
    },
    {
      prop: 'id',
      label: 'ID',
      width: 80,
      align: 'center'
    },
    {
      prop: 'name',
      label: 'Name',
      width: 150,
      cellStyle: (column, value) => ({
        fontWeight: value ? 'bold' : 'normal'
      })
    },
    {
      prop: 'email',
      label: 'Email',
      width: 200
    },
    {
      prop: 'status',
      label: 'Status',
      width: 100,
      cellType: 'custom',
      formatter: (row) => row.status === 'active' ? 'Active' : 'Inactive'
    }
  ] as CTable.ColumnConfig[],
  rowStyle: {
    height: 40
  },
  headRowStyle: {
    backgroundColor: '#4a90e2',
    height: 45
  },
  headCellStyle: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  showBorder: true,
  wheelSpeed: 0.8
};

const table: CTable.ITable = new CTable('table-container', tableConfig);

const tableData: UserData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', department: 'Engineering', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', department: 'Design', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', department: 'Management', status: 'inactive' }
];

table.setTableData(tableData);

// Typed event handlers
table.on('RowClick', (rowData: CTable.rowValueType) => {
  console.log('Row clicked:', rowData);
});

table.on('SelectionChange', (prop: string, selectedRows: CTable.rowValueType[], currentRow: CTable.rowValueType) => {
  console.log('Selection changed for column:', prop);
  console.log('Selected rows:', selectedRows);
});
```

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

## Performance Tips

1. **Use appropriate row height**: Smaller row heights allow more rows to be rendered in the visible area
2. **Limit column width**: Smaller column widths reduce memory usage
3. **Use wheelSpeed adjustment**: Adjust wheelSpeed based on your use case (0.5-1.0 recommended)
4. **Virtual scrolling**: CTable automatically handles virtual scrolling, only rendering visible rows
5. **Destroy unused tables**: Always call `table.destroy()` when done to free up resources

## Best Practices

```javascript
// Good: Define configuration outside the component
const TABLE_CONFIG = {
  Columns: [
    { prop: 'id', label: 'ID', width: 80, align: 'center' },
    { prop: 'name', label: 'Name', width: 150 },
    { prop: 'email', label: 'Email', width: 200 }
  ],
  rowStyle: { height: 35 },
  headRowStyle: { backgroundColor: '#4a90e2', height: 40 },
  headCellStyle: { color: '#fff', fontWeight: 'bold' },
  showBorder: true
};

// Good: Reuse table instance when possible
let table = null;

function initTable(containerId, data) {
  if (table) {
    table.destroy();
  }
  table = new CTable(containerId, TABLE_CONFIG);
  table.setTableData(data);
  return table;
}

// Good: Clean up event listeners when not needed
function cleanup() {
  table.removeEvent('RowClick');
  table.removeEvent('SelectionChange');
  table.destroy();
  table = null;
}
```

## Common Issues

### Canvas not rendering

Make sure the container element has explicit width and height:

```html
<div id="table-container" style="width: 800px; height: 500px;"></div>
```

### Scroll not working

Ensure the container has `overflow` set correctly and the wheelSpeed is appropriate:

```javascript
const tableConfig = {
  // ... other config
  wheelSpeed: 0.8 // Try adjusting this value
};
```

### Memory leaks

Always destroy the table instance when unmounting the component:

```javascript
// In a React component
useEffect(() => {
  const table = new CTable('container', config);
  table.setTableData(data);

  return () => {
    table.destroy(); // Clean up when component unmounts
  };
}, []);
```

## Browser Support

CTable supports all modern browsers that support Canvas 2D:
- Chrome/Edge 80+
- Firefox 75+
- Safari 13+

## License

MIT