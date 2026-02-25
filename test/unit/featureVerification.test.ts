import tableClass from '../../src/ctable';

describe('CTable Feature Verification Tests', () => {
  let container: HTMLElement;
  let tableInstance: any;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'feature-test-container';
    container.style.width = '800px';
    container.style.height = '600px';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 清理测试实例
    if (tableInstance && typeof tableInstance.destroy === 'function') {
      tableInstance.destroy();
    }
    document.body.removeChild(container);
  });

  test('should verify destroy method exists and works', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name', width: 150 },
      ],
    };

    tableInstance = new tableClass('feature-test-container', tableConfig);

    // Verify the destroy method exists
    expect(typeof tableInstance.destroy).toBe('function');

    // Call destroy and verify it executes without error
    expect(() => {
      tableInstance.destroy();
    }).not.toThrow();

    // After destroy, critical properties should be null
    expect(tableInstance.ctx).toBeNull();
    expect(tableInstance.tableElement).toBeNull();
    expect(tableInstance.parentElement).toBeNull();
  });

  test('should verify iterative flatTableColumns implementation', () => {
    const tableConfig = {
      Columns: [
        {
          prop: 'group1',
          label: 'Group 1',
          children: [
            { prop: 'col1', label: 'Column 1', width: 100 },
            {
              prop: 'nestedGroup',
              label: 'Nested Group',
              children: [
                { prop: 'col2', label: 'Column 2', width: 100 },
                { prop: 'col3', label: 'Column 3', width: 100 },
              ]
            },
            { prop: 'col4', label: 'Column 4', width: 100 },
          ]
        },
        { prop: 'col5', label: 'Column 5', width: 100 },
      ],
    };

    tableInstance = new tableClass('feature-test-container', tableConfig);

    // The flatTableColumns method should have been applied during initialization
    // Count expected leaf nodes: col1, col2, col3, col4, col5 = 5 total
    expect(tableInstance.tableColumns.length).toBe(5);

    // Verify each column is a leaf node (no children or empty children)
    tableInstance.tableColumns.forEach(column => {
      expect(!column.children || column.children.length === 0).toBeTruthy();
    });
  });

  test('should verify enhanced error handling', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name', width: 150 },
      ],
    };

    // Test that error is thrown for invalid element
    expect(() => {
      new tableClass('', tableConfig); // Empty ID
    }).toThrow('root element id is required');

    expect(() => {
      new tableClass('nonexistent', tableConfig); // Non-existent element
    }).toThrow('root element with id "nonexistent" not found');
  });

  test('should verify improved cellValueType types', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name', width: 150 },
        { prop: 'details', label: 'Details', width: 200 },
      ],
    };

    tableInstance = new tableClass('feature-test-container', tableConfig);

    // Test various data types that should be supported
    const testData = [
      {
        name: 'Test Item',
        details: { id: 1, info: 'Additional details' } // Object type
      },
      {
        name: 'Array Test',
        details: ['item1', 'item2'] // Array type
      },
      {
        name: 'Boolean Test',
        details: true // Boolean type
      },
      {
        name: 'Number Test',
        details: 42 // Number type
      },
      {
        name: 'String Test',
        details: 'Simple string' // String type
      },
      {
        name: 'Null Test',
        details: null // Null type
      }
    ];

    expect(() => {
      tableInstance.setTableData(testData);
    }).not.toThrow();

    expect(tableInstance.tableBody.length).toBe(testData.length);
  });

  test('should verify improved wheel event handling', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name', width: 150 },
        { prop: 'longText', label: 'Long Text', width: 1000 }, // Wide column to enable horizontal scroll
      ],
    };

    tableInstance = new tableClass('feature-test-container', tableConfig);

    const testData = Array.from({ length: 50 }, (_, i) => ({
      name: `Item ${i}`,
      longText: `Very long text for item ${i} that requires horizontal scrolling`
    }));

    tableInstance.setTableData(testData);

    // Initially, no scrolling
    expect(tableInstance.offsetInfo.scrollTop).toBe(0);
    expect(tableInstance.offsetInfo.scrollLeft).toBe(0);

    // Simulate scroll
    tableInstance.offsetRender({ scrollTop: 150, scrollLeft: 100 });

    expect(tableInstance.offsetInfo.scrollTop).toBe(150);
    expect(tableInstance.offsetInfo.scrollLeft).toBe(100);
  });
});