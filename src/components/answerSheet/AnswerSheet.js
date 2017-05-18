// /**
//  * Created by yoyo on 2017/3/6.
//  */
// import React from 'react'
//
// export default class AnswerSheet extends React.Component{
//
// 	constructor(props){
// 		super(props);
// 		let questions=this._getquestions();
// 		let answers=this._answers();
// 		let selected=this._seleted();
// 		let getSelected = this._getSeleted();
// 		this.state={
// 			questions,
// 			answers,
// 			selected,
// 			getSelected,
// 			clickNum:this.props.clickNum
// 		}
// 	}
//
// 	_getquestions(){
// 		let questions=[];
// 		for(let i=2;i<26;i++){
// 			questions.push(i)
// 		}
// 		return questions;
// 	}
//
//
//
// 	_answers(){
// 		let answer=[];
// 		for(let i=1;i<2;i++){
// 			answer.push(i)
// 		}
// 		return answer;
// 	}
//
// 	_seleted(){
// 		let selected=[];
// 		for(let i=26;i<34;i++){
// 			selected.push(i)
// 		}
// 		return selected;
// 	}
//
// 	_getSeleted(){
// 		let getSelected = [];
// 		for(let i = 0; i< 33;i++){
// 			getSelected.push(false)
// 		}
// 		return getSelected;
// 	}
//
// 	componentDidMount(){
//
// 	}
//
// 	componentWillUnmount(){
// 		PubSub.unsubscribe(this.pubsub_token);
// 	}
//
// 	questionsMap(){
// 		return this.state.questions.map((items,i)=>{
// 			return(
// 				<div className="questionsNo" key={i} style = {{backgroundColor:this.state.getSelected[i]?'#6cc5d7':'#fff'}}>
// 					{items}
// 				</div>
// 			)
// 		})
//
// 	}
//
// 	answersMap(){
// 		return this.state.answers.map((items,i)=>{
// 			return(
// 				<div className="questionsNo" key={i} style = {{backgroundColor:this.state.getSelected[i]?'#6cc5d7':'#fff'}}>
// 					{items}
// 				</div>
// 			)
// 		})
// 	}
//
// 	selectedMap(){
// 		return this.state.selected.map((items,i)=>{
// 			return(
// 				<div className="questionsNo" key={i} style = {{backgroundColor:this.state.getSelected[i]?'#6cc5d7':'#fff'}}>
// 					{items}
// 				</div>
// 			)
// 		})
// 	}
// 	render(){
// 		return(
// 			<div>
// 				<div className="explain">
// 					<span className="explainFont">答题卡</span>
//
//
//
// 				</div>
//
//
//
// 				<div className="AnswerCont">
//
// 					<div className="contBox">
// 						<span className="contFont">多项选择题</span>
// 						<div className="questionBox">
// 							 {this.answersMap()}
// 						</div>
// 					</div>
// 					<div className="contBox">
// 						<span className="contFont">单项选择题</span>
// 						<div className="questionBox">
// 							{this.questionsMap()}
// 						</div>
// 					</div>
// 					<div className="contBox">
// 						<span className="contFont">简答题</span>
//
// 						<div className="questionBox">
// 							{this.selectedMap()}
// 						</div>
//
// 					</div>
//
// 				</div>
// 			</div>
// 		)
// 	}
// }