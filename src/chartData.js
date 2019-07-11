import { LOW_CONFIDENCE, UP_EXP_COLOR, DOWN_EXP_COLOR } from './colors';

function getChartData(results) {
	const chartData = {
		data: [],
		colors: [],
		hoverTexts: []
	};

	results.forEach(result => {
		// we need tStatistic value to be shown
		chartData.data.push(result.tStatistic);

		// get color for this value
		let color = '';
		if (!result.expression) color = LOW_CONFIDENCE;
		else if (result.expression == 'UP') color = UP_EXP_COLOR;
		else if (result.expression == 'DOWN') color = DOWN_EXP_COLOR;
		else color = LOW_CONFIDENCE;
		chartData.colors.push(color);

		// // get hover text for this tissue bar
		// let regulationText = 'Same as Whole Fly';
		// if (result.affyCall === 'UP') regulationText = 'Up Regulated';
		// else if (result.affyCall === 'DOWN') regulationText = 'Down Regulated';
		// else regulationText = '';
		// regulationText = `${regulationText}: (signal: ${
		// 	result.mRNASignal
		// }, enrichment: ${result.enrichment})`;
		// chartData.hoverTexts.push(regulationText);
	});

	return chartData;
}

export default getChartData;
