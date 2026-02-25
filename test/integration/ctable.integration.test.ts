import tableClass from '../../src/ctable';

describe('CTable Integration Tests', () => {
  let container: HTMLElement;
  let tableInstance: any;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'integration-test-container';
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

  test('should handle full table lifecycle', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name', width: 150 },
        { prop: 'age', label: 'Age', width: 100 },
        { prop: 'email', label: 'Email', width: 200 },
      ],
    };

    // Initialize table
    tableInstance = new tableClass('integration-test-container', tableConfig);

    // Verify initialization
    expect(tableInstance).toBeDefined();
    expect(tableInstance.tableElement).toBeDefined();

    // Set data
    const testData = [
      { name: 'John Doe', age: 30, email: 'john@example.com' },
      { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
      { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
    ];

    tableInstance.setTableData(testData);

    // Verify data was processed
    expect(tableInstance.tableBody.length).toBe(3);
    expect(tableInstance.viewRows.length).toBeGreaterThan(0);

    // Test event subscription
    const mockCallback = jest.fn();
    tableInstance.on('RowClick', mockCallback);

    // Verify event listener was registered
    expect(tableInstance.tableEvent).toBeDefined();

    // Test re-render
    expect(() => {
      tableInstance.reRender();
    }).not.toThrow();
  });

  test('should handle checkbox interactions', () => {
    const tableConfig = {
      Columns: [
        {
          prop: 'selection',
          label: 'Select',
          cellType: 'checkbox',
          width: 50
        },
        { prop: 'name', label: 'Name', width: 150 },
        { prop: 'age', label: 'Age', width: 100 },
      ],
    };

    tableInstance = new tableClass('integration-test-container', tableConfig);

    const testData = [
      { name: 'John Doe', age: 30 },
      { name: 'Jane Smith', age: 25 },
    ];

    tableInstance.setTableData(testData);

    // Verify checkbox column was handled
    const checkboxCols = tableInstance.tableColumns.filter((col: any) =>
      col.columnInfo.cellType === 'checkbox'
    );

    expect(checkboxCols.length).toBeGreaterThan(0);
  });

  test('should handle scrolling properly', () => {
    const tableConfig = {
      Columns: [
        { prop: 'id', label: 'ID', width: 100 },
        { prop: 'name', label: 'Name', width: 200 },
        { prop: 'description', label: 'Description', width: 500 },
      ],
      wheelSpeed: 0.8
    };

    tableInstance = new tableClass('integration-test-container', tableConfig);

    // Add more data to enable scrolling
    const largeTestData = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`
    }));

    tableInstance.setTableData(largeTestData);

    // Verify that we have more data than view can hold
    expect(tableInstance.tableBody.length).toBe(100);
    expect(tableInstance.viewRows.length).toBeLessThan(100);

    // Simulate scroll
    const originalOffset = {...tableInstance.offsetInfo};
    tableInstance.offsetRender({ scrollTop: 100, scrollLeft: 50 });

    // Verify scroll was applied
    expect(tableInstance.offsetInfo.scrollTop).toBe(100);
    expect(tableInstance.offsetInfo.scrollLeft).toBe(50);
  });

  test('should properly destroy and cleanup', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name', width: 150 },
        { prop: 'age', label: 'Age', width: 100 },
      ],
    };

    tableInstance = new tableClass('integration-test-container', tableConfig);

    // Subscribe to an event to verify it gets cleaned up
    const mockCallback = jest.fn();
    tableInstance.on('RowClick', mockCallback);

    // Store references to check if they're cleaned up
    const originalElements = {
      parentElement: tableInstance.parentElement,
      tableElement: tableInstance.tableElement,
      ctx: tableInstance.ctx
    };

    // Perform destroy
    tableInstance.destroy();

    // Verify destruction
    expect(tableInstance.ctx).toBeNull();
    expect(tableInstance.tableElement).toBeNull();
    expect(tableInstance.parentElement).toBeNull();
    expect(tableInstance.tableBody.length).toBe(0);
    expect(tableInstance.tableColumns.length).toBe(0);
    expect(tableInstance.viewRows.length).toBe(0);
  });
});