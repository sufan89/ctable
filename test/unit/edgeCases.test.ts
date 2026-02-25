import tableClass from '../../src/ctable';

describe('CTable Performance and Edge Cases', () => {
  let container: HTMLElement;
  let tableInstance: any;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'perf-test-container';
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

  test('should handle empty data gracefully', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name', width: 150 },
        { prop: 'age', label: 'Age', width: 100 },
      ],
    };

    tableInstance = new tableClass('perf-test-container', tableConfig);

    // Set empty data
    tableInstance.setTableData([]);

    expect(tableInstance.tableBody.length).toBe(0);
    expect(tableInstance.viewRows.length).toBe(0);
  });

  test('should handle deeply nested columns', () => {
    const tableConfig = {
      Columns: [
        {
          prop: 'group1',
          label: 'Group 1',
          children: [
            {
              prop: 'subgroup1',
              label: 'Subgroup 1',
              children: [
                { prop: 'col1', label: 'Column 1', width: 100 },
                { prop: 'col2', label: 'Column 2', width: 100 },
              ]
            },
            {
              prop: 'subgroup2',
              label: 'Subgroup 2',
              children: [
                { prop: 'col3', label: 'Column 3', width: 100 },
                { prop: 'col4', label: 'Column 4', width: 100 },
              ]
            }
          ]
        }
      ],
    };

    tableInstance = new tableClass('perf-test-container', tableConfig);

    // Verify flatTableColumns handles deeply nested structure
    expect(tableInstance.tableColumns.length).toBe(4); // 4 leaf columns
  });

  test('should handle very large datasets efficiently', () => {
    const tableConfig = {
      Columns: [
        { prop: 'id', label: 'ID', width: 100 },
        { prop: 'name', label: 'Name', width: 200 },
      ],
    };

    tableInstance = new tableClass('perf-test-container', tableConfig);

    // Create large dataset
    const largeData = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`
    }));

    // Measure performance
    const startTime = performance.now();
    tableInstance.setTableData(largeData);
    const endTime = performance.now();

    // The operation should complete reasonably quickly
    expect(endTime - startTime).toBeLessThan(5000); // Less than 5 seconds

    expect(tableInstance.tableBody.length).toBe(10000);
  });

  test('should handle rapid data changes', () => {
    const tableConfig = {
      Columns: [
        { prop: 'name', label: 'Name', width: 150 },
        { prop: 'age', label: 'Age', width: 100 },
      ],
    };

    tableInstance = new tableClass('perf-test-container', tableConfig);

    // Rapidly change data multiple times
    for (let i = 0; i < 5; i++) {
      const testData = Array.from({ length: 10 }, (_, j) => ({
        name: `Test ${i}-${j}`,
        age: 20 + j
      }));

      tableInstance.setTableData(testData);
    }

    expect(tableInstance.tableBody.length).toBe(10);
  });

  test('should handle column configuration edge cases', () => {
    const tableConfig = {
      Columns: [
        { prop: 'normal', label: 'Normal Col', width: 100 },
        { prop: '', label: 'Empty Prop Col', width: 100 }, // Edge case: empty prop
        { prop: 'special', label: '', width: 100 }, // Edge case: empty label
        { prop: 'undefinedWidth', label: 'Undefined Width' }, // No width specified
      ],
    };

    tableInstance = new tableClass('perf-test-container', tableConfig);

    // Should handle edge cases gracefully
    expect(tableInstance.tableColumns.length).toBeGreaterThan(0);
  });
});