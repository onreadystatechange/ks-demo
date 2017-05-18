/**
 * Created by yoyo on 2017/3/7.
 */
import React from 'react'

export default class Navigation extends React.Component{
	constructor(props){
		super(props);
		this.state={
			color:'#b2dee9'
		}
	}
	changeColor(){
		this.setState({color:'white'})
	}

	render(){
		return(
			<div style={{width:200,height:177,float:'left',backgroundColor:'white'}}>
				<div style={{width:200,height:4,backgroundColor:'#b2dee9'}}></div>
				<div style={{width:200,height:96,}}>
					<a href="javascript:;"  style={{display:'block',textIndent:30,width:200,backgroundColor:this.state.color,height:40,marginBottom:9 ,fontSize:18,color:'#666666',display:'flex',alignItems:'center'}}>首页</a>
					<a href="javascript:;" style={{display:'block',width:140,height:38,margin:'0 auto',fontSize:18,color:'#333333'}}>我的题库</a>
					<a href="javascript:;" className='na' onClick={()=>this.changeColor()}>开始做题</a>
					<a href="javascript:;" className='na' onClick={()=>this.changeColor()}>我的记录</a>
				</div>
			</div>
		)
	}
}
