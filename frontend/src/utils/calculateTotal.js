export const calculateTotal = (items, property) => {
  return items.reduce((sum, item) => sum + +item[property], 0);
};