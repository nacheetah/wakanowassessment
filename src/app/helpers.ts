export const mapToArrayFn = (obj: any): any[] => {
  const placeholderArray = [];
  for (const key in obj) {
    placeholderArray.push({
      key,
      value: obj[key],
      type: key == 'name' ? 'text' : 'email',
    });
  }
  return placeholderArray;
};
