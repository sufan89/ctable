# Development Guide for ctable

This document provides guidance for developers who wish to contribute to the ctable project.

## Project Structure

```
├── src/                    # Source code
│   ├── core/              # Core table components (cells, rows)
│   ├── event/             # Event handling system
│   ├── scrollBar/         # Scrollbar implementation
│   ├── tableBody/         # Table body rendering
│   ├── tableHeader/       # Table header rendering
│   ├── tableStyle/        # Styling system
│   ├── tools/             # Utility functions
│   ├── index.d.ts         # Public type definitions
│   └── ctable.ts          # Main table class
├── test/                  # Test suite
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   ├── setup.ts           # Test environment setup
│   └── ...
├── dist/                  # Build output (generated)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Build configuration
```

## Key Components

### 1. Main Table Class (`src/ctable.ts`)
The central class that coordinates all table functionality:
- Manages the canvas element and drawing context
- Handles data binding and rendering
- Coordinates scrolling and events
- Maintains the table lifecycle

### 2. Event System (`src/event/`)
Handles all user interactions:
- Mouse events (click, hover, drag)
- Keyboard events
- Custom table events
- Event propagation

### 3. Rendering Components (`src/core/`, `src/tableHeader/`, `src/tableBody/`)
- `cell.ts`: Individual cell rendering and interaction
- `row.ts`: Row composition and rendering
- `headerRow.ts`: Header-specific rendering
- `bodyRow.ts`: Body-specific rendering

### 4. Styling System (`src/tableStyle/`)
Manages visual appearance of the table components.

### 5. Scrollbar System (`src/scrollBar/`)
Implements both horizontal and vertical scrolling mechanisms.

## Architecture Patterns

### Event-Driven Architecture
The table uses an event-driven model:
- Components publish events through the event bus
- Listeners subscribe to relevant events
- Loose coupling between components

### Canvas-Based Rendering
- Efficient rendering using HTML5 Canvas
- Virtual scrolling for performance with large datasets
- Custom drawing routines for table elements

### Type-Safe Design
- Comprehensive TypeScript interfaces
- Strict typing for all properties and methods
- Type definitions for all public APIs

## Development Workflow

### 1. Setting Up the Environment
```bash
# Clone the repository
git clone <repository-url>
cd ctable

# Install dependencies
npm install

# Run tests to verify everything works
npm test
```

### 2. Making Changes
1. Create a new branch for your feature/bug fix
2. Make your changes following the code style
3. Write or update tests as needed
4. Run tests to ensure everything passes
5. Submit a pull request

### 3. Code Style Guidelines
- Use TypeScript for all new code
- Follow existing naming conventions
- Maintain consistent formatting (we use Prettier)
- Write meaningful comments for complex logic
- Add JSDoc comments for public APIs

### 4. Testing Guidelines
- Write unit tests for new functionality
- Ensure existing tests continue to pass
- Test edge cases and error conditions
- Consider performance implications of changes

## Common Tasks

### Adding a New Cell Type
1. Create a new cell class extending the base cell interface
2. Implement the required rendering methods
3. Add the cell type to the `cellType` enum
4. Register the cell type in the appropriate factory
5. Add tests for the new cell type

### Adding a New Event
1. Define the event in the `TableEventName` type
2. Implement the event firing mechanism
3. Add documentation for the new event
4. Add tests for the event

### Optimizing Performance
1. Profile rendering performance with large datasets
2. Consider virtualization strategies
3. Minimize canvas redraws
4. Optimize frequently-called functions

## Best Practices

### Memory Management
- Always implement cleanup in the `destroy()` method
- Remove event listeners when no longer needed
- Break circular references
- Clear timeouts/intervals when destroying components

### Performance
- Implement debounced event handlers where appropriate
- Optimize frequently-executed code paths
- Consider the impact of changes on large datasets
- Use iterative approaches instead of recursion where possible

### Accessibility
- Ensure keyboard navigation works properly
- Consider screen reader compatibility
- Maintain sufficient color contrast
- Provide appropriate focus indicators

## Troubleshooting

### Common Issues
- Memory leaks from uncalled destroy methods
- Performance issues with large datasets
- Event handler conflicts
- Canvas rendering inconsistencies

### Debugging Tips
- Enable canvas debugging tools in browsers
- Use the browser's performance profiler
- Add logging to trace execution paths
- Check the console for warnings/errors

## Building and Deploying

### Local Development
```bash
# Watch for changes and rebuild automatically
npm run watch

# Build for production
npm run build
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Extending the Project

### Adding New Features
1. Consider the architectural fit of the feature
2. Identify the minimal set of changes needed
3. Maintain backward compatibility where possible
4. Update documentation appropriately
5. Add comprehensive tests

### Performance Considerations
- Profile the impact of new features
- Consider virtualization for new rendering features
- Implement progressive loading for large datasets
- Optimize rendering algorithms

## Release Process

1. Ensure all tests pass
2. Update version number following semantic versioning
3. Update changelog with notable changes
4. Create a new build
5. Publish to package registry
6. Create a GitHub release with release notes

## Questions?

For questions about the project:
- Check the documentation and existing issues
- Create a new issue for bugs or feature requests
- Consider contributing improvements to the documentation