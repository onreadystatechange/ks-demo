/**
 * Created by yoyo on 2017/3/3.
 */
import React from 'react'

export default class Answer extends React.Component{
	constructor(props){

		super(props);
		// let toggle=this._transf();
		// let values=this._value();
		this.state={
			values:'',
			toggle:true,
			showAnswer:false
		}
	}
	// _transf(){
	// 	let length=conts.length;
	// 	let toggle=[];
	// 	for(let i = 0;i < length;i++){
	// 		toggle.push({change:true})
	// 	}
	// 	return toggle
	// }
	// _value(){
	// 	let length=conts.length;
	// 	let values=[];
	// 	for(let i = 0;i < length;i++){
	// 		values.push({value:''})
	// 	}
	// 	return values
	// }


	componentWillReceiveProps(){
		this.setState({ showAnswer:this.props.showAnswer})
	}


	submit(i){
		let toggle = !this.state.toggle;

		// let values = this.state.values;
		// for(let x in toggle) {
		// 	if(x == i) {
		// 		toggle[i].change = !toggle[i].change
		// 		// values[i].value  = i.target.value
		// 	}
		// }


		// this.setState({value: i.target.value});

		// let conts=this.refs.myTextInput.val()
		// console.log(conts)
		// console.log(i.target.value)
		// this.setState({value:i.target.value});

		this.setState({toggle});
	}

	modify(i){
		let toggle = !this.state.toggle;
		// for(let x in toggle) {
		// 	if(x == i) {
		// 		toggle[i].change = !toggle[i].change
		// 	}
		// }
		this.setState({toggle});
	}

	_getValue(e){
		let values = this.state.values
		// for(let x in values) {
		// 	if(x == i) {
		// 		values[i].value = e.target.value
		// 	}
		// }
		values = e.target.value;
		this.setState({values})
	}

	_getRightAnswer(){
		return(
			<span className=" myAnswer" style = {{marginBottom:'10px'}}><p className="my">正确答案：</p><p style={{wordWrap: 'break-word',lineHeight:'26px'}} className ="rightAnswer" data-id = {this.props.dataId}></p></span>
		)
	}

	show(){
		return(
			<div  style = {{width:'920px'}} data-id = {this.props.dataId} data-key = {this.props.dataItem.orderNum} className = "answerWrapper controlsroll" data-type = {this.props.dataType}>
				<div className="answer">
					<p className="di"><span>{this.props.dataItem.orderNum}</span> [简答题]</p>
					<p className="ti">{this.props.dataItem.title}<span>?({this.props.dataItem.score})分</span></p>
				</div>
				<div className="submit">
					<div className="edit" style={{display:this.state.toggle ? 'block' : 'none' }}>

						<textarea className="show input" type="text" value = {this.state.values} onChange={(e) => this._getValue(e)} style={{display:this.state.showAnswer ? 'none' : 'block' ,lineHeight:'26px',fontSize:'14px'}}/>

						<input className="form" type="button" value="提交" onClick={()=>this.submit()} style={{display:this.state.showAnswer ? 'none' : 'block' }}/>
					</div>
					<div className="showAnswer" style={{display:this.state.toggle ? 'none' : 'block' }}>
						<span className=" myAnswer" style = {{}}><p className="my">我的回答：</p><p style={{wordWrap: 'break-word',lineHeight:'26px',fontSize:'14px'}} >{this.state.values}</p></span>
						<input className="form" type="button" value="修改" onClick={()=>this.modify()} style={{display:this.state.showAnswer ? 'none' : 'block' }} />
					</div>
					{this.state.showAnswer?this._getRightAnswer():''}
				</div>
			</div>
		)
	}

	render(){
		return(
			<div>
				{this.show()}
			</div>
		)
	}

}


