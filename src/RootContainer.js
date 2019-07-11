import React from 'react';
import Loading from './loading';
import queryData from './queryData';
import ExpressionChart from './chart';
import getChartData from './chartData';

class RootContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			loading: true
		};
	}

	componentDidMount() {
		const {
			entity: { value },
			serviceUrl
		} = this.props;

		queryData(value, serviceUrl).then(res => {
			const { atlasExpression } = res;
			this.setState({
				chartData: getChartData(atlasExpression),
				loading: false
			});
		});
	}

	render() {
		if (this.state.loading)
			return (
				<div className="rootContainer">
					<Loading />
				</div>
			);

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
