export const LANGUAGE_CODES = {
  Ukr: 'ua',
  Eng: 'en',
};

export const LANGUAGES = [
  {
    label: 'УКР',
    value: LANGUAGE_CODES.Ukr,
  },
  {
    label: 'ENG',
    value: LANGUAGE_CODES.Eng,
  },
];

export const LANGUAGE_MENU = url => language => LANGUAGES.map(({ label, value}) => {
  let a = url.split('/')
  a[1] = value
  let href = a.join('/')

  return [label, href];
});
