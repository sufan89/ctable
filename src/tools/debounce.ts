/**
 * 函数防抖工具
 * @param func 需要防抖的函数
 * @param wait 等待时间（毫秒）
 * @param immediate 是否立即执行
 * @returns 防抖处理后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    const callNow = immediate && !timeoutId;

    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, wait) as unknown as number;

    if (callNow) {
      func.apply(this, args);
    }
  };
}