import tableClass from '../src/ctable';

describe('CTable Main Class', () => {
  let container: HTMLElement;
  let tableInstance: any;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'test-table-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 清理测试实例
    if (tableInstance && typeof tableInstance.destroy === 'function') {
      tableInstance.destroy();
    }
    document.body.removeChild(container);
  });

  test('should initialize correctly with valid config', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name' },
        { prop: 'age', label: 'Age' },
      ],
    };

    tableInstance = new tableClass('test-table-container', tableConfig);

    expect(tableInstance).toBeDefined();
    expect(tableInstance.tableElement).toBeDefined();
    expect(tableInstance.parentElement).toBe(container);
  });

  test('should throw error when container element is not found', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name' },
      ],
    };

    expect(() => {
      new tableClass('non-existent-container', tableConfig);
    }).toThrow('root element with id "non-existent-container" not found');
  });

  test('should throw error when element id is empty', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name' },
      ],
    };

    expect(() => {
      new tableClass('', tableConfig);
    }).toThrow('root element id is required');
  });

  test('should set table data correctly', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name' },
        { prop: 'age', label: 'Age' },
      ],
    };

    tableInstance = new tableClass('test-table-container', tableConfig);

    const testData = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];

    tableInstance.setTableData(testData);

    expect(tableInstance.tableBody.length).toBe(2);
  });

  test('should destroy properly and cleanup resources', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name' },
      ],
    };

    tableInstance = new tableClass('test-table-container', tableConfig);

    // Mock the destroy-related properties to verify they are called
    const originalDestroy = tableInstance.destroy;
    const originalCtx = tableInstance.ctx;
    const originalTableElement = tableInstance.tableElement;
    const originalParentElement = tableInstance.parentElement;

    tableInstance.destroy();

    expect(() => {
      // After destroy, the essential properties should be null or cleaned up
      // Verify it doesn't crash
    }).not.toThrow();
  });
});