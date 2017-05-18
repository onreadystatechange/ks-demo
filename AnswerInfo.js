/**
 * Created by yoyo on 2017/3/9.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Checks from './src/components/checks/Checks';
import MultiSelect from './src/components/checks/MultiSelect';
import Header from './src/components/header/Header';
import ToppicName from './src/components/header/topicName';
import Answer from './src/components/answer/answer';
import AnswerSheet from './src/components/answerSheet/AnswerSheet';
import CountDown from './src/components/countDown/countDown';
import Http from './src/https/http';
import Title from './src/components/title/title';
import Introduce from './src/components/introduce/introduce';
export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userId:this.props.userId
		}
	}


	componentWillMount() {

	}

	componentDidMount() {
		console.log(this.props.params.userId)
	}

	componentWillUnmount() {

		this.cc && clearInterval(this.cc)
	}

	render() {
		return(
			<div style = {wrapper}>
				<Title userId = {this.props.params.userId}/>
				<Introduce />
			</div>
		)

	}
}

const wrapper ={
	margin:'0 auto',
	width:'1200px',
	position:'relative'
};



