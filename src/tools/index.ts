/*
 * 转换像素单位为数字
 * */
export function translatePxToNumber(px: string | number, unit: string): number {
  if (!px) {
    return 0;
  }
  let num = 0;
  if (typeof px === "string") {
    num =
      px.indexOf(unit) > 0 ? Number(px.slice(0, px.indexOf(unit))) : Number(px);
  } else {
    num = px;
  }
  return num;
}
