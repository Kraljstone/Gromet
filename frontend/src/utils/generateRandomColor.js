// Add randomColor to each row
export const generateRandomColor = (usedColors = []) => {
  const baseHue = Math.floor(Math.random() * 360); // Random hue value

  // Function to check the difference between two hues
  const hueDifference = (hue1, hue2) => {
    const diff = Math.abs(hue1 - hue2);
    return Math.min(diff, 360 - diff);
  };

  // Check if the generated color is too close to any used color
  const isColorTooClose = (color) => {
    return usedColors.some((usedColor) => hueDifference(usedColor, color) < 30);
  };

  // Generate a color and ensure it's distinct from used colors
  let randomColor;
  do {
    randomColor = `hsl(${baseHue + Math.random() * 60},${
      30 + Math.random() * 40
    }%,${50 + Math.random() * 10}%)`;
  } while (isColorTooClose(randomColor));

  return randomColor;
};
