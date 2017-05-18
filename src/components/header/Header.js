/**
 * Created by yjy on 2017/3/3.
 */
/**
 * Created by yjy on 2017/3/3.
 */
/**
 * Created by yjy on 2017/2/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position:true,
            fraction:'',
            showRightAnswer:false
        }

    }



    componentWillMount() {

    }


    componentDidMount() {
        this._scroll();
    }

    componentWillReceiveProps() {
        this.setState({fraction:this.props.fraction,showRightAnswer:this.props.showRightAnswer})

    }

    componentWillUnmount() {
        window.removeEventListener('scroll',function(){
            
        });
    }

    _scroll(){
        window.addEventListener('scroll',() =>{

        })
    }


    render(){
        const headerStyle = {
          wrapper:{
              position: 'relative',
              zIndex: 3,
              background: '#fff',
              border: '1px solid #e0e3e9',
              borderRadius: '3px'
          },
          title:{
              fontSize: '24px',
              fontFamily: "Microsoft Yahei",
              borderBottom: '#ccc solid 1px',
              lineHeight: '30px',
              textAlign: 'center',
              paddingTop: '50px',
              paddingBottom: '25px',
              margin: '0 30px'
          },
          info:{
              textAlign: 'left',
                fontSize: '14px',
                lineHeight: '25px',
                padding: '25px 0 15px 0',
                color: '#333',
                margin: '0 30px'
          },
            infoTwo:{
                height: '42px',
                lineHeight: '42px',
                display: 'block',
                background: '#e2f9ff',
                border: '1px dashed #c8eef8',
                textAlign: 'center',
                margin: '0 30px 25px 30px',
                color: '#00a0b8',
                fontSize:'14px'
            }
        };

        return(
            <div style = {headerStyle.wrapper}>
                <h2 style={headerStyle.title}>
                    {this.props.title}
                    <i style={{display:this.state.showRightAnswer?'block':'none',color:'red',float:'right',fontSize:'38px',fontWeight:'700',marginRight:'30px',background:'url(../../src/images/fenshu.png) -8px 37px no-repeat',width:'50px',height:'60px',marginBottom:'10px'}}>{this.state.fraction}</i>
                </h2>
                <div style={headerStyle.info} >
                    <div dangerouslySetInnerHTML = {{__html: this.props.introduce}} />
                </div>
                <div style = {headerStyle.infoTwo}>
                    本套试卷含有主观题，针对主观题请自行参考解析评分
                </div>
            </div>
        )
    }

}

