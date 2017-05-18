// /**
//  * Created by yoyo on 2017/3/6.
//  */
// import React from 'react'
//
//
// export default class CountDown extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={
// 			start:7200,
// 			click:1,
// 			clearSetIn:false
// 		}
// 	}
//
// 	componentDidMount() {
// 		let start = this.state.start;
// 		this.cc = setInterval(()=>{
// 			start--;
// 			this.setState({start})
//
// 		},1000)
// 		if(!this.state.clearSetIn){
// 			this.cc && clearInterval(()=>this.cc);
// 		}
//
// 	}
// 	componentWillUnMount() {
//
// 		clearInterval(()=>this.cc)
//
// 	}
//
// 	componentWillReceiveProps() {
// 		// this.setState({start:this.props.testTime,clearSetIn:this.props.clearSetIn})
// 	}
//
// 	suspend(){
//
// 		let click=this.state.click
// 		let start=this.state.start;
// 		click++
// 		this.setState({click})
// 		if(click%2==0){
// 			clearInterval(this.cc)
//
//
// 		}else{
// 			this.cc = setInterval(()=>{
// 				start--;
// 				this.setState({start})
//
// 			},1000)
//
// 		}
//
//
// 	}
// 	render(){
// 		let hours =Math.floor(this.state.start/3600) >= 9 ? Math.floor(this.state.start/3600) : '0'+Math.floor(this.state.start/3600);
// 		let minutes = parseInt(this.state.start%3600/60) >= 9? parseInt(this.state.start%3600/60): '0'+ parseInt(this.state.start%3600/60) ;
// 		let second = this.state.start%60 >=9 ? this.state.start%60 : '0'+this.state.start%60;
// 		return(
//
// 			<div className="box">
// 				<div className="suspendBox"></div>
// 				<span className="timeBox">用时：<span className="timer">{hours}:{minutes}:{second}</span></span>
// 				<input type="button" value={(this.state.click)%2==0 ? '开始':'暂停'} className="suspend" onClick={()=>this.suspend()}/>
// 				<div className="bigBox" style={{display:(this.state.click)%2==0 ? 'block':'none',zIndex:999999,}}>
// 					<div style={styles.show} ><a href="javascript:" style={styles.astyle} onClick={()=>this.suspend()}>点击继续</a></div>
// 				</div>
// 			</div>
//
// 		)
// 	}
// div
// }
//
// const styles={
// 	show:{
// 		width:220,
// 		height:140,
// 		backgroundColor:'white',
// 		position:'absolute',
// 		top:'50%',
// 		left:'50%',
// 		fontSize:16,
// 		marginLeft:-100,
// 		marginTop:-100,
// 		backgroundImage:"url('./src/images/soft.png')",
// 		backgroundPosition:'center center',
// 		backgroundRepeat:'no-repeat',
// 		borderRadius:5,
// 		textAlign:'bottom',
//
// 	},
// 	astyle:{
// 		position:'absolute',
// 		right:'50%',
// 		marginRight:'-32px',
// 		bottom:10,
// 		fontSize:16,
// 		zIndex:999999,
// 	}
// }
