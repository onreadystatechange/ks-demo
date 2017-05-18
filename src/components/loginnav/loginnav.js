/**
 * Created by yoyo on 2017/3/8.
 */
import React from 'react'
export default class LoginNav extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={styles.navStyle}>
				<div style={styles.navCont}>
					<div style={styles.logo}>LOGO</div>
					<span style={styles.textInfo}>欢迎登录**心理咨询系统</span>
					
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
	textInfo:{
		display:'inline-block',
		width:500,
		height:20,

		marginLeft:20,
		color:'#333333',

	},
	loginDiv:{
		width:50,
		height:30,

		textAlign:'center',
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
		marginLeft:950,
	},
	registerDiv:{
		width:50,
		height:30,

		textAlign:'center',
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
	},
	astyle:{
		color:'#6cc5d7',
	}
}