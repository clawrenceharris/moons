const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number);
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatCategory = (category: string): string => {
  let lower = category.toLowerCase();
  if (lower === "mens") lower = "men's";
  else if (lower === "womens") lower = "women's";
  else if (lower === "kids") lower = "kids'";
  return capitalize(lower);
};
