/**
 * Created by yoyo on 2017/3/7.
 */
import React from 'react'
import { Router, Route, hashHistory ,IndexRoute,IndexRedirect,Link} from 'react-router';
export default class Nav extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}


	render(){
		return(
			<div style={styles.navStyle}>
				<div style={styles.navCont}>
					<div style={styles.logo}>LOGO</div>
					<span style={styles.span}>真题</span>
					<img src="./../../src/images/panda.jpg" style={{marginLeft:900,width:50,height:50,borderRadius:'50%'}}/>
					<div style={styles.loginDiv}><a href="javascript:" style={{display:'block',width:30,height:30,background:"url('./../../src/images/select.png') no-repeat center center"}}>  </a></div>
					<Link to = '/'><div style={styles.registerDiv}><span href="javascript:" style={styles.astyle}>退出登录</span></div></Link>
				</div>
			</div>
		)
	}
}
const styles={
	navStyle:{
		backgroundColor:'white',

		minWidth:1200,
	},
	navCont:{
		width:1200,
		height:80,
		margin:'0 auto',
		display:'flex',
		alignItems:'center',

	},
	logo:{
		width:80,
		height:40,
		backgroundColor:'gray',
		display:'flex',
		alignItems:'center',
		justifyContent:'center',

	},
	span:{
		marginLeft:20,
		color:'#333333',

	},
	loginDiv:{
		width:30,
		height:30,

		textAlign:'center',
		display:'flex',
		alignItems:'center',
		justifyContent:'center',

	},
	registerDiv:{
		width:70,
		height:30,

		textAlign:'center',
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
	},
	astyle:{
		color:'#999999',
		fontSize:14,
		cursor:'pointer'
	}
}