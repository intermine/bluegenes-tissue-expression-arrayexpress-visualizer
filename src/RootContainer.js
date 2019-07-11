import React from 'react';
import ExpressionChart from './chart';
import queryData from './queryData';
import getChartData from './chartData';

class RootContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { chartData: null };
	}

	componentDidMount() {
		const {
			entity: { value },
			serviceUrl
		} = this.props;

		queryData(value, serviceUrl).then(res => {
			const { atlasExpression } = res;
			this.setState({ chartData: getChartData(atlasExpression) });
		});
	}

	render() {
		return (
			<div className="rootContainer">
				{this.state.chartData && (
					<ExpressionChart chartData={this.state.chartData} />
				)}
			</div>
		);
	}
}

export default RootContainer;
