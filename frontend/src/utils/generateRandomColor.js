export const generateRandomColor = (() => {
  const intuitiveColors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#FF33A8',
    '#FF8C33',
    '#33A8FF',
    '#8C33FF',
    '#33FF8C',
    '#A833FF',
    '#FFA833',
  ];

  let currentIndex = 0;

  return () => {
    const color = intuitiveColors[currentIndex];
    currentIndex = (currentIndex + 1) % intuitiveColors.length;
    return color;
  };
})();
