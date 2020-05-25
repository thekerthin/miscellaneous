export const getPrototypeName = (proto): string => {
  const { constructor } = Object.getPrototypeOf(proto);
  return constructor.name as string;
};
