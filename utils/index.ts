export const langs = [
  {
    short: 'eng',
    name: 'English'
  },
  {
    short: 'pol',
    name: 'Polski'
  },
  {
    short: 'ger',
    name: 'Deutsch'
  },
  {
    short: 'ned',
    name: 'Nederlande'
  },
  {
    short: 'spa',
    name: 'Español'
  },
  {
    short: 'fra',
    name: 'Français'
  },
  {
    short: 'ita',
    name: 'Italiano'
  }
];

export const shuffleCards = (array: Array<any>) => {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
};
