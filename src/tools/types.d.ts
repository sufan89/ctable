declare namespace CTable {
  /*
   * 工具函数类型定义
   * */
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate?: boolean
  ): (...args: Parameters<T>) => void;
}