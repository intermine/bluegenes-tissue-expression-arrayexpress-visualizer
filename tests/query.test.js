const imjs = require('imjs');
const queryExpData = require('../src/queryData').default;

describe('query', () => {
	const mockData = {
		gene: 'KRAG',
		serviceUrl: 'http://www.humanmine.org/human'
	};
	test('should return a promise that resolves with correct result json', () => {
		const queryRes = queryExpData(mockData.gene, mockData.serviceUrl, imjs);

		return queryRes.then(res => {
			expect(res).toHaveProperty('atlasExpression');
			expect(res.atlasExpression).toBeInstanceOf(Array);

			const firstVal = res.atlasExpression[0];
			expect(firstVal).toHaveProperty('condition');
			expect(firstVal).toHaveProperty('expression');
			expect(firstVal).toHaveProperty('tStatistic');
			expect(firstVal).toHaveProperty('pValue');
			expect(firstVal).toHaveProperty('objectId');
		});
	});

	test('should throw error when data corresponding to organism is not found', () => {
		const dataWithInvalidGeneId = Object.assign({}, mockData, {
			gene: 'KAG' // some wrong gene
		});

		const queryRes = queryExpData(
			dataWithInvalidGeneId.gene,
			dataWithInvalidGeneId.serviceUrl,
			imjs
		);

		return expect(queryRes).rejects.toBe('No data found!');
	});
});
