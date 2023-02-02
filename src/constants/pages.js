import { translate } from '../tools/language';

export const PAGES_MENU = language => [
	[translate('menu.news'), `/${language}/news`],
	[translate('menu.report'), `/${language}/report`],
	[translate('menu.letter'), `/${language}/letter`],
	// [translate('menu.candidates'), `/${language}/candidates`],
	[translate('menu.about'), `/${language}/about`],
];
