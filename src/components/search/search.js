/**
 * Created by yoyo on 2017/3/7.
 */
import React from 'react'

export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
		return(
			<div style={{width:980,height:40,float:'right'}}>
				<input type="text" style={{width:835,height:38,border:'solid 1px #00a0b8',textIndent:'20px',fontSize:'16px',color:'#999999'}} />
				<input type="button" value='搜索' style={{border:'none',width:140,height:40,backgroundColor:'#00a0b8',fontSize:16,color:'#ffffff',textAlign:'center',lineHeight:'40px',cursor:'pointer'}}/>
			</div>
		)
	}
}