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
			loading: true,
			error: false
		};
	}

	componentDidMount() {
		const {
			entity: { value },
			serviceUrl,
			testing
		} = this.props;

		// don't calculate anything if in testing phase
		if (testing) return;

		queryData(value, serviceUrl)
			.then(res => {
				const { atlasExpression } = res;
				this.setState({
					chartData: getChartData(atlasExpression),
					loading: false
				});
			})
			.catch(error => this.setState({ error, loading: false }));
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
				{this.state.chartData && !this.state.error ? (
					<ExpressionChart chartData={this.state.chartData} />
				) : (
					<span className="error">{this.state.error}</span>
				)}
			</div>
		);
	}
}

export default RootContainer;
