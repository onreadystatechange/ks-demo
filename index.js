
/**
 * Created by yjy on 2017/3/6.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Index from './main';
import { Router, Route, hashHistory ,IndexRoute,IndexRedirect} from 'react-router';
import LoginNav from './src/components/loginnav/loginnav'
import AnswerPage from './answerPage'
import AnswerInfo from './AnswerInfo'
import Http from './src/https/http';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            passWord:'',
            psdFormShow:false,
            phoneNumRight:true,
            codeNumClick:false,
            ifcodeNumClick:false,
            numberSeconds:60,   //秒数
            frequency:1 ,  //次数
            changePassWordShow:false,
            message:'',
            errorShow:false,
            reduceHttp:true,
            findMyPsw:false,
            phoneNum:1
        }
    }



    componentDidMount() {
        document.addEventListener('keydown',function(e){
            if(e.keyCode == 13){
                this._btnClick();
            }
        }.bind(this))
        let loginBg = document.getElementsByClassName('loginBg');
        let bdHeight = document.body.scrollHeight;
        loginBg[0].style.height = bdHeight + 'px';
    }


    _checkUserInput(e){
        let userName = e.target.value;
        this.setState({userName});
    }

    _checkPsInput(e){
        let passWord = e.target.value;
        this.setState({passWord});
    }

    _changePsd(){
        let psdFormShow = this.state.psdFormShow;
        let userName = this.state.userName;
        let passWord = this.state.passWord;
        userName = '';
        passWord = '';
        psdFormShow =  !psdFormShow;
        this.setState({
            psdFormShow,
            userName,
            passWord
        })
    }

    _codeNumClick(){
        let ifCodeNumClick = this.state.ifcodeNumClick;
        let numberSeconds = this.state.numberSeconds;
        let findMyPsw = this.state.findMyPsw;
        // let frequency = this.state.frequency;
        if(this.state.reduceHttp){
            Http.post('/user/sendCode',{userNumber:this.state.userName,businessType:'1'},(data) =>{
                console.log(data)
                if(data.result == 1 ){
                    this.setState({
                        message:data.message,
                        errorShow:true
                    });
                }else{
                    ifCodeNumClick = true;
                    findMyPsw = true;
                    this.setState({
                        ifCodeNumClick,
                        findMyPsw
                    });
                    this.timer = setInterval(() =>{
                        numberSeconds --;
                        if(numberSeconds <= 0){
                            // frequency++;
                            this.timer && clearInterval(this.timer)
                            ifCodeNumClick = false;
                            this.setState({
                                ifCodeNumClick,
                                numberSeconds,
                                reduceHttp:true
                                // frequency
                            })
                        }else{
                            this.setState({
                                numberSeconds,
                                reduceHttp:false
                            })
                        }
                    },1000);
                }
            });
        }
    }

    _changePsdBtnClick(){
        let userName = this.state.userName;
        let passWord = this.state.passWord;
        Http.post('/user/validateCode',{userNumber:userName,businessType:'1',code:passWord},(data) => {
            if(data.result == 1 ){
                this.setState({
                    message:data.message,
                    errorShow:true
                });
            }else{
                this.setState({
                    phoneNum:userName
                });
                this._changePsWordShow()
            }
        })
    }

    _btnClick(){
        let userName = this.state.userName;
        let passWord = this.state.passWord;
        console.log(userName,passWord)
        Http.post('user/login', {userNumber:userName,password:passWord}, (data) => {
            if(data.result == 0){
                hashHistory.push('/Index')
            }else{
                layer.alert(data.message,{title:false})
            }
            console.log(data);
        })
        // if(userName != '1234' && passWord != '1234'){
        //     alert('账号或密码错误，请重新输入')
        // }else{
        //     hashHistory.push('/Index')
        // }
    }

    _changePsWordShow(){
        let changePassWordShow = this.state.changePassWordShow;
        let userName = this.state.userName;
        let passWord = this.state.passWord;
        let errorShow = this.state.errorShow;
        errorShow = false;
        userName = '';
        passWord = '';
        changePassWordShow = !changePassWordShow;
        this.setState({
            changePassWordShow,
            userName,
            passWord,
            errorShow
        })
    }

    onPhoneNumChange(e){
        let userName = this.state.userName;
        let phoneNumRight = this.state.phoneNumRight;
        let codeNumClick = this.state.codeNumClick;
        userName = e.target.value;
        this.setState({
            userName,
            errorShow:false
        })
        let regTestPhone = /^1[34578]\d{9}$/;
        if(regTestPhone.test(userName)){
            phoneNumRight = true;
            codeNumClick = true;
            this.setState({
                phoneNumRight,
                codeNumClick,
            })
        }else{
            phoneNumRight = false;
            codeNumClick = false;
            this.setState({
                phoneNumRight,
                codeNumClick
            })
        }
    }

    renderFormLogin(){
        return !this.state.psdFormShow?(
            <form action="" id="form1" name="form1" method="post" style={formStyle.from}>
                <div style={{minWidth:1200,margin:'0 auto',height:700,}}>
                    <div style={{width:400,height:483,position:'absolute',top:'50%',marginTop:'-240px',right:'50%',marginRight:'-200px',borderRadius:'5px',background:'white',boxShadow:'0px 0px 62px 0px rgba(5,48,37, 0.07)'}}>
                        <div style={{width:318,margin:'0 auto',}}>
                            <p style={{width:'100%',marginTop:60,textAlign:'center',fontSize:22,color:'#45c7d5',letterSpacing:'1px'}}>欢迎登录心理咨询考试系统</p>
                            <p style={{width:'100%',marginTop:40,height:16,fontSize:16,color:'#444c62',letterSpacing:'1px'}}>账户登录</p>
                            <input onChange = {(e) => this._checkUserInput(e)} value={this.state.userName} style={{background:"#ffffff url('./src/images/phone.png') 12px center no-repeat ",marginTop:30,width:318,height:40,border:'solid 1px #e3e7ed',fontSize:14,textIndent:36}} type="text" placeholder="手机号" />
                            <input onChange = {(e) => this._checkPsInput(e)}  value={this.state.passWord} style={{background:"#ffffff url('./src/images/password.png') 12px center no-repeat ",marginTop:30,width:318,height:40,border:'solid 1px #e3e7ed',fontSize:14,textIndent:36}} type="password" placeholder="密码" />
                            <a href="javascript:;" style={{fontSize:14,color:'#999999',marginTop:30,float:'right',letterSpacing:'1px'}} onClick = {() => {this._changePsd()}}>忘记密码？</a>

                            <a onClick={()=>this._btnClick()}href="javascript:;" style={{marginTop:85,fontSize:18,display:'block',background:'#45c7d5',textAlign:'center',lineHeight:'42px',color:'white',width:318,height:42,letterSpacing:'1px'}} className = "btn">登录</a>
                        </div>
                    </div>
                </div>
            </form>
        ):(
            <form action="" id="form2" name="form2" method="post" style={formStyle.from}>
                <div style={{minWidth:1200,margin:'0 auto',height:700}}>
                    <div style={{width:400,height:483,position:'absolute',top:'50%',marginTop:'-240px',right:'50%',marginRight:'-200px',borderRadius:'5px',background:'white',boxShadow:'0px 0px 62px 0px rgba(5,48,37, 0.07)'}}>
                        <div style={{width:318,margin:'0 auto'}} className = "clearfix">
                            <div className = "clearfix" style = {{marginBottom:'50px'}}>
                                <a href="javascript:;" style ={{color:'#45c7d5',float:'right',marginTop:'36px'}} onClick = {() =>{this._changePsd()}}>
                                    <img src="./src/images/goBack.png" style = {{display:'block',float:'left',widtt:'14px'}}>
                                    </img>
                                    <i style ={{fontSize:'14px',marginLeft:'10px',float:'right',letterSpacing:'1px'}}>
                                        返回登陆
                                    </i>
                                </a>
                            </div>

                            <div style = {{padding:'0px 33px 0px 33px'}} className = "clearfix">

                                <div style = {{float:'right',textAlign:'center',fontSize:'16px'}} className = {this.state.changePassWordShow?"active":"default"} >
                                    <div style = {{marginBottom:'26px',fontSize:'22px'}}>
                                        02
                                    </div>
                                    <div  style = {{letterSpacing:'1px',width:'85px'}}>
                                        重置密码
                                    </div>
                                </div>
                                <div style = {{width:'80px',height:'1px',backgroundColor:'#e3e7ed',float:'right',marginTop:'40px'}}></div>
                                <div style = {{float:'left',textAlign:'center',fontSize:'16px'}} className = {this.state.changePassWordShow?"default":"active"} >
                                    <div style = {{marginBottom:'26px',fontSize:'22px'}}>
                                        01
                                    </div>
                                    <div style = {{letterSpacing:'1px'}}>
                                        验证手机号
                                    </div>
                                </div>
                            </div>
                            {this.state.changePassWordShow?(
                                <div>
                                    <input onChange = {(e) => this._checkUserInput(e)} value={this.state.userName} style={{background:"#ffffff ",marginTop:40,width:318,height:40,border:'solid 1px #e3e7ed',fontSize:14,textIndent:12}} type="password" placeholder="设置新密码" />
                                    <div style = {{height:'35px',width:'100%',lineHeight:'35px',fontSize:'12px',color:'#ee3939'}}>
                                        <p><img src="./src/images/waring.png" alt="!!" /><i style = {{marginLeft:'6px'}}>{this.state.message}</i></p>
                                    </div>
                                    <div className = "clearfix" style={{marginBottom:'32px'}}>
                                        <input onChange = {(e) => this._checkPsInput(e)}  value={this.state.passWord} style={{background:"#ffffff ",width:318,height:40,border:'solid 1px #e3e7ed',fontSize:14,textIndent:12,float:'left'}} type="password" placeholder="重新输入新密码" />

                                        <div style = {{height:'32px',width:'100%',lineHeight:'32px',fontSize:'12px',color:'#ee3939'}}>
                                            <p style = {{display:'none'}}><img src="./src/images/waring.png" alt="!!" /><i style = {{marginLeft:'6px'}}>验证码 </i></p>
                                        </div>
                                    </div>
                                    <a href="javascript:;"  style={{fontSize:18,display:'block',textAlign:'center',lineHeight:'42px',color:'white',width:318,height:42,letterSpacing:'1px'}} className = "canGetCodeNum">保存</a>
                                </div>
                            ):(
                                <div>
                                    <input onChange = {(e) => this.onPhoneNumChange(e)} value={this.state.userName} style={{background:"#ffffff ",marginTop:40,width:318,height:40,border:'solid 1px #e3e7ed',fontSize:14,textIndent:12}} type="text" placeholder="手机号" />
                                    <div style = {{height:'35px',width:'100%',lineHeight:'35px',fontSize:'12px',color:'#ee3939'}}>
                                        {!this.state.phoneNumRight?(
                                            <p><img src="./src/images/waring.png" alt="!!"/><i style = {{marginLeft:'6px'}}>请输入正确的手机号</i></p>
                                        ):''}
                                        {this.state.phoneNumRight && this.state.errorShow?(
                                            <p><img src="./src/images/waring.png" alt="!!" /><i style = {{marginLeft:'6px'}}>{this.state.message}</i></p>
                                        ):''}
                                    </div>
                                    <div className = "clearfix" style={{marginBottom:'32px'}}>
                                        <input onChange = {(e) => this._checkPsInput(e)}  value={this.state.passWord} style={{background:"#ffffff ",width:206,height:40,border:'solid 1px #e3e7ed',fontSize:14,textIndent:12,float:'left'}} type="text" placeholder="验证码" />
                                        <a href="javascript:;" onClick = {() =>{
                                    this.state.codeNumClick?this._codeNumClick():''
                                }} style={{diaplay:'block',float:'right',height:'42px',lineHeight:'42px',textAlign:'center',width:'102px',fontSize:'14px',color:'#fff',letterSpacing:'1px'}} className = {this.state.codeNumClick?'canGetCodeNum':'getCodeNum'}>
                                            {this.state.ifCodeNumClick?this.state.numberSeconds+'秒':'获取验证码'}
                                        </a>
                                        <div style = {{height:'32px',width:'100%',lineHeight:'32px',fontSize:'12px',color:'#ee3939'}}>

                                        </div>
                                    </div>
                                    <a href="javascript:;" onClick = {() => {this._changePsdBtnClick()}} style={{fontSize:18,display:'block',textAlign:'center',lineHeight:'42px',color:'white',width:318,height:42,letterSpacing:'1px'}} className = 'canGetCodeNum'>找回密码</a>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </form>
        )
    }



    render() {
        const bodyHeight = {
            backgroundColor:'#45c7d5',
            height:document.body.clientHeight&&document.documentElement.clientHeight,
            overflowY:'hidden'
        }
        return(
            <div style = {bodyHeight}>
                <div style={{background:" #45c7d5 url('./src/images/login.png') center -22px no-repeat ",height:'100%',width:'100%'}} className = 'loginBg'>
                    {this.renderFormLogin()}
                </div>
            </div>

        )
    }
}
const formStyle = {
    from:{

        display: 'block',
        marginTop: '0em'
    }
}
ReactDOM.render(<Router history={hashHistory}>

    <Route path="/" component={Login}>

    </Route>
    <Route path="/Index" component={Index}>

    </Route>
    <Route path="/AnswerPage/:userId" component={AnswerPage}>

    </Route>
    <Route path="/AnswerInfo/:userId" component={AnswerInfo}>

    </Route>

</Router>, document.querySelector('#container'));


