export const calculateTotal = (items, property) => {
  return items.reduce((sum, item) => {
    console.log("calculateTotal",property , item, item[property])
    if (item[property] !== '/') {
      return sum + +item[property];
    }
    return sum;
  }, 0);
};
