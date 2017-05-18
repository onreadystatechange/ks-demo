/**
 * Created by yoyo on 2017/3/7.
 */
import React from  'react'

export default class Popup extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}

	suspend(){

	}

	render(){
		return(
				<div>
					
				</div>
		)
	}

}

const styles={
	show:{
		width:220,
		height:140,
		backgroundColor:'white',
		position:'absolute',
		top:'50%',
		left:'50%',
		fontSize:16,
		marginLeft:-100,
		marginTop:-100,
		backgroundImage:"url('./src/images/soft.png')",
		backgroundPosition:'center center',
		backgroundRepeat:'no-repeat',
		borderRadius:5,
		textAlign:'bottom',

	},
	astyle:{
		position:'absolute',
		right:'50%',
		marginRight:'-32px',
		bottom:10,
		fontSize:16
	}

}