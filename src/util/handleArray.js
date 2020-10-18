/**
 * 去重，把重复元素去除
 * @param {*} array
 * @returns 去除完的数组
 */
export function getArrayUnique(array) {
  let set = new Set(array);
  let newArr = Array.from(set);
  return newArr;
}
/**
 *在数组中删除指定元素
 * @param {*} array
 * @param {*} element
 * @returns 返回array
 */
export function delEleInArray(array, element) {
  let index = Number(array.indexOf(element));
  array.splice(index, 1);
  return array;
}
/**
 * 判断是否数组存在该元素
 * @param {*} ele
 * @param {*} array
 * @returns bool
 */
export const getIsIncluded = (ele, array) => array.includes(ele);
export const isShowButton = (index, ...agrs) =>
  agrs.includes(Number(index)) ? true : false;
