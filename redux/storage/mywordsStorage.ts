type Categories = {
  id: string;
  name: string;
};

type Words = {
  id: string;
  categoryId: string;
  [key: string]: string;
};

export const categoriesStorage = (): Categories[] => {
  try {
    const serializedState = localStorage.getItem('mywordsCategories');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

export const wordsStorage = (): Words[] => {
  try {
    const serializedState = localStorage.getItem('mywordsWords');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};
