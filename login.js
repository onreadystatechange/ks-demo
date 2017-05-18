/**
 * Created by yoyo on 2017/3/8.
 */
import React from 'react'
import Nav from './src/components/nav/nav'
import LoginNav from './src/components/loginnav/loginnav'
export default class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}

	}

	render(){
		return(
			<div>

				<div style={{}}>
					<LoginNav />
					<div style={{minWidth:1200,margin:'0 auto',height:'100%',position:'relative'}} >
							<div style={{width:470,height:600,position:'absolute',top:180,right:250,background:'white',boxShadow:'0px 0px 13px 0px rgba(212,207,206, 0.34)'}}>
								<div style={{width:370,height:500,margin:'0 auto',}}>

									<p style={{width:'100%',height:80,fontSize:20,color:'#333333',lineHeight:'80px',marginTop:4}}>账户登录</p>
									<input style={{width:368,height:58,border:'solid 1px #bbbbbb',fontSize:18,textIndent:20}} type="text" placeholder="手机号" />
									<input style={{marginTop:30,width:368,height:58,border:'solid 1px #bbbbbb',fontSize:18,textIndent:20}} type="text" placeholder="密码" />
									<a href="javascript:;" style={{fontSize:16,color:'#999999',marginTop:20,float:'left'}}>忘记密码？</a>
									<a href="javascript:;" style={{fontSize:16,color:'#333333',marginTop:20,float:'right'}}>短信登录</a>
									<a href="javascript:;" style={{marginTop:70,fontSize:22,display:'block',background:'#6cc5d7',textAlign:'center',lineHeight:'60px',color:'white',width:370,height:60,}}>登录</a>
									<div style={{marginTop:124,width:370,height:25,fontSize:18,textAlign:'center',color:'#999999',}}>
										没有账号 ？ 现在快速<a href="javascript:;" style={{color:'#0075c2s',margin:0,padding:0,}}>注册</a>
									</div>

								</div>

							</div>
					</div>
				</div>
			</div>
		)
	}
}



// <div style={{marginTop:30,width:368,height:60,color:'#dddddd',}}>
// 	<input style={{width:256,height:58,border:'solid 1px #bbbbbb',fontSize:18,textIndent:20}} type="text" placeholder="验证码" />
// 	<input type="button" style={{width:110,height:60,border:'solid 1px #bbbbbb',borderLeft:'none',fontSize:18,background:'white'}}value="获取验证码"/>
//
// </div>