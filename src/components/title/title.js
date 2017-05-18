/**
 * Created by yoyo on 2017/3/7.
 */
import React from 'react'
import { Router, Route, hashHistory ,IndexRoute,IndexRedirect,Link,RouteHandler} from 'react-router';

export default class Title extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userId:this.props.userId
		}
	}
	render(){
		return(
			<div style={{width:1200,margin:'0 auto',background:'white',height:420,marginBottom:20,}}>
				<div style={{width:1200,height:86,display:'flex',alignItems:'center',justifyContent:'center'}}>
					<p style={{fontSize:24,color:'#333333'}}>2016年5月心理咨询师二级《理论知识》真题及解析</p>
				</div>
				<div style={{width:1140,position:'relative',height:334,margin:'0 auto',display:'flex',alignItems:'center' ,justifyContent:'flex-start',borderTop:'solid 1px #cccccc'}}>
					<img src="./../src/images/2016.jpg" width="390" height="274" />
					<div style={{height:274,width:300,}}>
						<p className="hed">总分 ：125分</p>
						<p className="hed">合格分数 ：75分</p>
						<p className="hed">作答时间 ：120分钟</p>
						<p className="hed">年份 ：2016年</p>
					</div>
					<Link to={{ pathname: '/AnswerPage/'+this.props.userId}}>
						<div style={{width:146,position:'absolute',bottom:30,right:10,height:40,backgroundColor:'#6cc5d7',borderRadius:'2px',textAlign:'center',color:'#ffffff',fontSize:'18px',
						lineHeight:'40px',alignSelf:'flex-end',marginBottom:30,marginLeft:400,
					}}>全真机考</div>
					</Link>
				</div>
			</div>
		)
	}
}