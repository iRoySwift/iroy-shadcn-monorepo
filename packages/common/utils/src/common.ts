/**
 * 获取嵌套对象值
 * @param obj
 * @param path
 * @param defaultValue
 * @returns console.log(getNestedValue(obj, "home.title")); // 输出: "标题"
 */
export function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? path;
}
