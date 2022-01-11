// Check if two objects are the same by properties and value

const deepCompareObj = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  const keys = Object.keys(obj1);

  for (const key of keys) {
    if (!(key in obj2)) return false;

    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

export default deepCompareObj;
