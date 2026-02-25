# ctable - Canvas Table Component

A high-performance canvas-based table component with virtual scrolling and rich features.

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

```javascript
import CTable from '@sufan_89/ctable';

const tableConfig = {
  Columns: [
    { prop: 'name', label: 'Name' },
    { prop: 'age', label: 'Age' }
  ]
};

const table = new CTable('container-id', tableConfig);
table.setTableData([
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
]);
```

## License

MIT