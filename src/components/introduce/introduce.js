/**
 * Created by yoyo on 2017/3/7.
 */
import React from 'react'

export default class Introduce extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}


	render(){
		return(
			<div style={{width:1200,margin:'0 auto',background:'white',height:420,marginBottom:20,marginTop:30}}>
				<div style={{width:1140,margin:'0 auto',height:420,}}>
					<p style={{display:'inline-block',margin:0,fontSize:20,color:'#00a0b8',width:1140,marginTop:30,padding:0,marginBottom:18,}}>题型介绍</p>
					<div style={{width:1140,borderTop:'solid 1px #cccccc'}}>
						<p className="introduce" style={{marginTop:30,}}>判断题</p>
						<p className="introduce">一、判断题。（共30题，每题1分。）</p>
						<p className="introduce">单项选择题</p>
						<p className="introduce">二、单项选择题。（共30题，每题1分。从下列各题列出的4个备选答案中，选出1个正确答案。多选、错选、不选均不得分 ）</p>
						<p className="introduce">多项选择题</p>
						<p className="introduce">三、多项选择题。（共20题，每题2分。从下列各题列出的4个备选答案中，选出2至3个正确答案。多选、少选、不选均不得分 ）</p>
					</div>

				</div>

			</div>
		)
	}
}