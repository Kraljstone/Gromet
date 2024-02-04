export const calculateTotal = (items, property) => {
  return items.reduce((sum, item) => {
    if (item[property] !== '/') {
      return sum + +item[property];
    }
    return sum;
  }, 0);
};
