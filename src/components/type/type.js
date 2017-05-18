/**
 * Created by yoyo on 2017/3/7.
 */
import React from 'react'

export default class type extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}


	render(){
		return(
			<div style={styles.div}>
				<div style={styles.div1}>
					<span style={{fontSize:14,color:'#999999'}}>科目</span>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>全部</a>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>心理咨询师（三）</a>
				</div>
				<div style={styles.div1}>
					<span style={{fontSize:14,color:'#999999'}}>分类</span>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>全部</a>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>职业道德和理论知识</a>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>专业技能</a>
				</div>
				<div style={styles.div1}>
					<span style={{fontSize:14,color:'#999999'}}>类型</span>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>全部</a>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>模拟题</a>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>预测题</a>
				</div>

				<div style={styles.div1}>
					<span style={{fontSize:14,color:'#999999'}}>年份</span>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>全部</a>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>2017</a>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>2016</a>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>2015</a>
					<a href="javascript:;" className = 'nk'style={styles.astyle}>2014</a>
				</div>


			</div>
		)
	}

}
const styles={
	div : {
		width:980,
		height:156,
		margin:'0 auto',
		background:'white',
		marginTop:'10px',
		marginBottom:'20px',
		float:'right'
	},
	div1 : {
		width:940,
		height:39,
		margin:'0 auto',
		display:'flex',
		alignItems:'center'
	},
	astyle:{
		display:'block',
		fontSize:14,
		color:'#333333',
		marginLeft:20,
	}
}