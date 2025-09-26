const formatDate = (date) => {
  if (!date) return "Present"; // Handle empty or null dates

  const options = { year: "numeric", month: "long" };
  return new Date(date).toLocaleDateString(undefined, options);
};

export default formatDate;
