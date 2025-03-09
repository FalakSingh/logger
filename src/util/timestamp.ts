export const timestamp = () => {
  const date = new Date();
  return `${date.toLocaleDateString()}-[${date.toLocaleTimeString()}]`;
};
