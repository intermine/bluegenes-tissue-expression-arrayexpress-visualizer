import React from 'react';
import Chart from 'chart.js';
import { DOWN_EXP_COLOR, UP_EXP_COLOR } from './colors';

class ExpressionChart extends React.Component {
	componentDidMount() {
		const { chartData } = this.props;
		if (!chartData) return;
		this.chart = new Chart(this.graph, {
			type: 'horizontalBar',
			data: {
				labels: chartData.tissueNames,
				datasets: [
					{
						label: [],
						data: chartData.data,
						backgroundColor: chartData.colors,
						borderWidth: 2
					}
				]
			},
			options: {
				title: {
					text: 'Tissue Expression (ArrayExpress)',
					display: true,
					fontSize: 18,
					position: 'top',
					fontStyle: 'bold',
					fontColor: '#000'
				},
				legend: {
					position: 'right',
					labels: {
						// returns legends shown at the side
						generateLabels() {
							return [
								{
									text: 'Down Regulated',
									fillStyle: DOWN_EXP_COLOR,
									strokeStyle: '#000',
									lineWidth: 1,
									hidden: false,
									index: 0
								},
								{
									text: 'Low Confidence',
									fillStyle: '#fff',
									strokeStyle: '#000',
									lineWidth: 1,
									hidden: false,
									index: 1
								},
								{
									text: 'Up Regulated',
									fillStyle: UP_EXP_COLOR,
									strokeStyle: '#000',
									lineWidth: 1,
									hidden: false,
									index: 1
								}
							];
						}
					},
					// define onClick to just override default onClick
					onClick() {},
					// highlight that particular set of data on hover
					onHover(ev, label) {
						const dataset = this.chart.data.datasets[0];
						dataset.borderColor = dataset.backgroundColor.map(color => {
							return label.fillStyle === color ? color : '#ffffff';
						});
						this.chart.update();
					},
					// on hover out, make everyone equal in highlight removing all borders
					onLeave() {
						this.chart.data.datasets[0].borderColor = [];
						this.chart.update();
					}
				},
				tooltips: {
					callbacks: {
						label(tooltipItem) {
							return chartData && chartData.hoverTexts[tooltipItem.index];
						}
					},
					backgroundColor: '#ffffff',
					bodyFontColor: '#000000',
					titleFontColor: '#000000',
					titleFontSize: 16,
					bodyFontSize: 14,
					borderColor: '#dadada',
					borderWidth: 1
				},
				scales: {
					yAxes: [
						{
							scaleLabel: {
								display: true,
								labelString: 'Tissue Name',
								fontSize: 16,
								fontStyle: 'italic',
								fontColor: '#000'
							}
						}
					],
					xAxes: [
						{
							scaleLabel: {
								display: true,
								labelString: 'Expression (t-statistic)',
								fontSize: 16,
								fontStyle: 'italic',
								fontColor: '#000'
							}
						}
					]
				},
				maintainAspectRatio: true,
				responsive: true
			}
		});
	}

	componentDidUpdate() {
		const { chartData } = this.props;
		if (!chartData) return;
		this.chart.data.labels = chartData.tissueNames;
		this.chart.data.datasets[0].data = chartData.data;
		this.chart.data.datasets[0].backgroundColor = chartData.colors;
		this.chart.update();
	}

	render() {
		return (
			<canvas
				height={
					(this.props.chartData && this.props.chartData.tissueNames.length) > 30
						? `${this.props.chartData.tissueNames.length * 4}px`
						: ''
				}
				className="graph"
				ref={r => {
					this.graph = r;
				}}
			/>
		);
	}
}

export default ExpressionChart;
