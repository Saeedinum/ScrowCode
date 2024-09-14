export const compareArrays = (
  original: string[],
  updated: string[],
): { addedElements: string[]; removedElements: string[] } => {
  const originalCount: { [key: string]: number } = {};
  const updatedCount: { [key: string]: number } = {};
  const addedElements: string[] = [];
  const removedElements: string[] = [];
  for (const el of original) {
    originalCount[el] = (originalCount[el] || 0) + 1;
  }

  for (const el of updated) {
    updatedCount[el] = (updatedCount[el] || 0) + 1;
  }

  for (const el of updated) {
    if (!originalCount[el] || updatedCount[el] > originalCount[el]) {
      addedElements.push(el);
      originalCount[el] = (originalCount[el] || 0) + 1;
    }
  }
  for (const el of original) {
    if (!updatedCount[el] || originalCount[el] > updatedCount[el]) {
      removedElements.push(el);
      updatedCount[el] = (updatedCount[el] || 0) + 1;
    }
  }

  return { addedElements, removedElements };
};
