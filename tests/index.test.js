const main = require('../src').main;

describe('main', () => {
	test('should throw error when called with wrong signature', () => {
		expect(() => {
			// testing with all falsy values
			main('', 0, null, undefined, []);
		}).toThrowError('Call main with correct signature');
	});

	test('should render some (atleast a div) element', () => {
		const elem = document.createElement('div');
		main(elem, { root: null }, { Gene: { value: '' } }, { testing: true }, {});
		expect(elem.innerHTML).toContain('div');
	});
});
