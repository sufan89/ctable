# Changelog

All notable changes to the ctable project will be documented in this file.

## [Unreleased]

## [1.0.0-beta.1] - 2026-02-25

### Added
- Initial release of ctable - a canvas-based table component
- Virtual scrolling for high-performance rendering with large datasets
- Multi-level header support with nested columns
- Checkbox selection functionality
- Customizable styling for cells, rows, and headers
- Comprehensive event system with support for cell/row clicks
- TypeScript type definitions for full type safety
- Resource management with destroy method to prevent memory leaks
- Performance optimizations with iterative algorithms
- Function debouncing for smoother event handling
- Comprehensive test suite with unit and integration tests

### Changed
- Improved error handling with better canvas context validation
- Optimized flatTableColumns method to use iterative approach instead of recursion
- Enhanced event system with better resource cleanup
- Refined type definitions for better compile-time checks
- Updated build system with modern tooling

### Fixed
- Memory leak issues by implementing proper resource cleanup
- Potential stack overflow in deeply nested column structures
- Type compatibility issues between interfaces and implementations
- Various small bugs identified during testing

### Security
- Implemented proper DOM sanitization for content rendering
- Added input validation for all configurable parameters

[Unreleased]: https://github.com/sufan89/ctable/compare/v1.0.0-beta.1...HEAD
[1.0.0-beta.1]: https://github.com/sufan89/ctable/releases/tag/v1.0.0-beta.1