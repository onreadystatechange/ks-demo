/**
 * Created by yjy on 2017/3/3.
 */
/**
 * Created by yjy on 2017/2/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';

export default class Checks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theTitle: {
                content: [],
                optionKey:[]
            },
            selectedWhat: [false, false, false, false],
            data:this.props.dataItem,
            showAnswer:false,
            rightAnswer:[],
            useClick:''
        }

    }


    componentWillMount() {

    }

    componentWillReceiveProps() {
        this.setState({ showAnswer:this.props.showAnswer,rightAnswer:this.props.rightAnswer,useClick:this.props.useClick})
    }

    componentDidMount() {
       const dataList =  this.props.dataItem.chooseAnswerEntityList;
        let optionKey = this.state.theTitle.optionKey;
        let content = this.state.theTitle.content;
        for(var i = 0;i < dataList.length; i++){
            content.push(dataList[i].optionValue);
            optionKey.push(dataList[i].optionKey)
        }
        this.setState({
            theTitle:{
                content:content,
                optionkey:optionKey
            }
        })

    }

    
    _getHeader(){
        const headerStyle = {
            title:{
                padding: '10px 30px',
                lineHeight: '24px',
                backgroundColor: '#f9f9fa',
                color: '#151515',
                position: 'relative'
            }
        };
        return(
            <div style={headerStyle.title} >
                <em style = {{fontSize: '20px',color: '#e45c40',marginRight: '10px',float: 'left'}}>
                    {this.state.data.orderNum}
                </em>
                <i style = {{color: '#e45c40'}}>
                    [单选题]
                </i>
                {this.state.data.title}
            </div>
        )
    }

    _onHandleClick(index){
        let selected = this.state.selectedWhat;
        let keys = this.state.data.orderNum;
        for(let i in this.state.selectedWhat){
            if(i == index){
                selected[i] = !selected[i];
            }else{
                selected[i] = false;
            }
        }
        this.setState({
            selectedWhat:selected
        })

    }

    componentWillUnmount() {

    }

    _getAnswer(){
        const answer = {
            wrapper:{
                height:'76px',
                fontSize:'16px',
                color:'#333',
                lineHeight:'76px',
                paddingLeft:'30px',
                backgroundColor:'#fff',
                display:'block'
            },
            hideWrapper:{
                height:'76px',
                fontSize:'16px',
                color:'#333',
                lineHeight:'76px',
                paddingLeft:'30px',
                backgroundColor:'#fff',
                display:'none'
            }
        }
        let selectedWhat = this.state.selectedWhat;
        this.arr = '';
        for(var i =0; i < selectedWhat.length;i++){
            if(selectedWhat[i] == true){
                switch (i){
                    case 0: i = 'A';
                        break;
                    case 1: i = 'B';
                        break;
                    case 2: i = 'C';
                        break;
                    case 3: i = 'D';
                        break;
                }
                this.arr += i;
            }
        }

        
        return  this.state.showAnswer?(
            <div style={answer.wrapper}>
                <span>
                    参考答案:<i style ={{color:'#0075c2',marginLeft:"6px",fontWeight:'100'}} className ="rightAnswer" data-id = {this.props.dataId}> </i>
                </span>
                <span style={{paddingLeft:'30px'}}>
                    你的答案:<i style ={{color:'#0075c2',marginLeft:"6px",fontWeight:'100'}}>{this.arr}</i>
                </span>
            </div>
        ):''
    }

    _getTheContent(){
        let arrIndex;
        let selected = this.state.selectedWhat;
        const subAnswer ={
            dd:{
                display: 'block',
                padding: '6px 0 6px 65px',
                marginleft: '-20px',
                lineHeight: '24px',
                color: '#151515',
                position: 'relative',
                cursor: 'pointer',
            },
            i:{
                width: '21px',
                height: '21px',
                display: 'block',
                position: 'absolute',
                top: '8px',
                left: '5px',
                background: 'url(src/images/pra_icon.png) no-repeat -19px -62px'
            },
            selected:{
                width: '21px',
                height: '21px',
                display: 'block',
                position: 'absolute',
                top: '8px',
                left: '5px',
                background: 'url(src/images/pra_icon.png) no-repeat -42px -842px'
            },
            span:{
                color:'#999',
                marginRight: '#999',
                position: 'absolute',
                top: '7px',
                left: '40px'
            }
        }



        return this.state.theTitle.content.map((item,index) => {
                   switch (index){
                       case 0: arrIndex = 'A.';
                           break;
                       case 1: arrIndex = 'B.';
                           break;
                       case 2: arrIndex = 'C.';
                           break;
                       case 3: arrIndex = 'D.';
                           break;
                   }
                   return(
                       <dd style = {subAnswer.dd} key = {index} className="hoverColor">
                           <i style = {selected[index]?subAnswer.selected:subAnswer.i} className = "item" data-sign = {index} onClick = {!this.state.useClick?() => this._onHandleClick(index):''}></i><span style = {subAnswer.span}>{arrIndex}</span>{item}
                       </dd>
                   )

           })
    }

    render() {
        const subContent = {
          wrapper:{
              position: 'relative',
              display: 'block',
              width:'920px',
              marginBottom:'15px'
          },
          subjectCon:{
              marginBottom:'15px',
              fontSize:'16px'
          }
        };
        return(

            <div style = {subContent.wrapper} data-id = {this.props.dataId} data-key = {this.props.dataItem.orderNum} className = "itemWrapper controlsroll" data-type = {this.props.dataType}>
                {this._getHeader()}
                <dl style={{padding: '15px 50px 25px 65px',clear: 'both',backgroundColor:'#fff'}}>
                    {this._getTheContent()}

                </dl>
                {this._getAnswer()}
                <input type="hidden" value = {this.arr} className = "checksValue"/>
            </div>


        )
    }
}

