/**
 * Created by yoyo on 2017/3/7.
 */
import React from 'react'
import { Router, Route, hashHistory ,IndexRoute,IndexRedirect,Link} from 'react-router';

export default class List extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
		return(
			<div style={{width:980,float:'right' }}>
				<div style={styles.div}>
					<span style={styles.span}>排序方式</span>
					<a href="javascript:;" className = 'nk'style={styles.a}>默认</a>
					<a href="javascript:;" className = 'nk'style={styles.a}>人气</a>
					<span style={styles.icon}></span>
				</div>
				<div style={styles.div2}>
					<div style={styles.tou}></div>
					<div style={styles.cont}>
						<a href="javascript:;" style={styles.astyle}>2016年5月心理咨询师二级《理论知识》真题及解析<i style = {{color:'#c33'}}>[测试案例]</i></a>
						<span style={styles.span1}>156人参加测试</span>
					</div>
					<Link to="/AnswerInfo/:44">
						<input type="button" value="开始测试" style={styles.btn} />
					</Link>
				</div>
				<div style={styles.div2}>
					<div style={styles.tou1}></div>
					<div style={styles.cont}>
						<a href="javascript:;" style={styles.astyle}>2016年5月心理咨询师二级《理论知识》真题及解析</a>
						<span style={styles.span1}>156人参加测试</span>
					</div>
					<Link to="/AnswerInfo/:47">
						<input type="button" value="开始测试" style={styles.btn} />
					</Link>
				</div>
				<div style={styles.div2}>
					<div style={styles.tou}></div>
					<div style={styles.cont}>
						<a href="javascript:;" style={styles.astyle}>2016年5月心理咨询师二级《专业技能》真题及解析</a>
						<span style={styles.span1}>156人参加测试</span>
					</div>
					<Link to="/AnswerInfo/:50">
						<input type="button" value="开始测试" style={styles.btn}/>
					</Link>
				</div>

			</div>
		)
	}
}
const styles={
	span:{
		marginLeft:20,

	},
	div:{width:978,
		height:36,
		background:'#f9f9fa',
		border:'solid 1px #f0f0f0',
		display:'flex',
		alignItems:'center',
		justifyContent:'flex-start',
	},
	a : {
		marginLeft:20,
	},
	icon : {
		display:'block',
		width:11,
		height:10,
		marginLeft:6,
		background:"url('./../src/images/peos.png')"
	},
	astyle : {
		fontSize:14,
		color:'#333333',

	},
	span1 : {
		display:'block',
		marginTop:5,
		color:'#999999',
	},
	btn : {

		width:88,
		height:34,
		fontSize:14,
		color:'#ffffff',
		background:'#00a0b8',
		border:'none',
		cursor:'pointer'
	},
	div2 : {
		width:980,
		height:80,
		display:'flex',
		alignItems:'center',
		borderBottom:'solid 1px #f0f0f0',
		background:'white'
	},
	tou:{
		marginLeft:20,
		width:40,
		height:40,
		borderRadius:'50%',
		backgroundImage:"url('./../../src/images/true.png')"
	},
	tou1:{
		marginLeft:20,
		width:40,
		height:40,
		borderRadius:'50%',
		backgroundImage:"url('./../../src/images/false.png')"
	},
	cont : {
		marginLeft:20,
		height:40,
		width:780
	}
}