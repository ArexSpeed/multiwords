type ThemeType = 'light' | 'dark';

type UserLanguageType = {
  short: string;
  name: string;
};

//load Storage
export const themeStorage = (): ThemeType => {
  try {
    const serializedState = localStorage.getItem('theme');
    if (serializedState === null) {
      return 'light';
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return 'light';
  }
};

export const userStorage = (): UserLanguageType => {
  const initState = {
    short: 'eng',
    name: 'English'
  };
  try {
    const serializedState = localStorage.getItem('userLanguage');
    if (serializedState === null) {
      return initState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initState;
  }
};

export const learnLanguageStorage = () => {
  const initState = {
    eng: true,
    pol: true,
    ger: true,
    ned: true,
    spa: true,
    fra: true,
    ita: true
  };
  try {
    const serializedState = localStorage.getItem('learnLanguage');
    if (serializedState === null) {
      return initState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initState;
  }
};

export const dicoLanguageStorage = () => {
  const initState = {
    eng: true,
    pol: true,
    ger: true,
    ned: true,
    spa: true,
    fra: true,
    ita: true
  };
  try {
    const serializedState = localStorage.getItem('dicoLanguage');
    if (serializedState === null) {
      return initState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initState;
  }
};
