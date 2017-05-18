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

export default class MultiSelect extends React.Component {
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
            <div style={headerStyle.title}>
                <em style = {{fontSize: '20px',color: '#e45c40',marginRight: '10px',float: 'left'}}>
                    {this.state.data.orderNum}
                </em>
                <i style = {{color: '#e45c40'}}>
                    [多选题]
                </i>
                {this.state.data.title}
            </div>
        )
    }

    _getAnswer(index){
        const answer = {
            wrapper:{
                height:'76px',
                fontSize:'16px',
                color:'#333',
                lineHeight:'76px',
                paddingLeft:'30px',
                backgroundColor:'#fff'
            }
        }
        this.multiSelect = '';
        let selectedWhat = this.state.selectedWhat;
        let arr= [];
        let q = '';
        for(let i =0; i < selectedWhat.length;i++){
            if(selectedWhat[i] == true){
                arr.push(i);

            }
        }
        for(let j = 0;j < arr.length; j++){
            switch (arr[j]){
                case 0: q = 'A,';
                    break;
                case 1: q = 'B,';
                    break;
                case 2: q = 'C,';
                    break;
                case 3: q = 'D,';
                    break;
            }
            this.multiSelect += q;
        }
        return this.state.showAnswer? (
            <div style={answer.wrapper}>
                <span>
                    参考答案:<i style ={{color:'#0075c2',marginLeft:"6px",fontWeight:'100'}} className ="rightAnswer" data-id = {this.props.dataId}> </i>
                </span>
                <span style={{paddingLeft:'30px'}}>
                    你的答案:<i style ={{color:'#0075c2',marginLeft:"6px",fontWeight:'100'}}>{this.multiSelect}</i>
                </span>
            </div>
        ):''
    }

    _onHandleClick(index){
        let selected = this.state.selectedWhat;
        for(let i in this.state.selectedWhat){
            if(i == index){
                selected[i] = !selected[i];
            }
        };
        this.setState({
            selectedWhat:selected
        });
        let boolean = this.state.selectedWhat.indexOf(true);
        let keys = this.state.data.orderNum;
        PubSub.publish('products',{num:keys,length:boolean});
    }

    componentWillUnmount() {

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
                background: 'url(src/images/pra_icon.png) no-repeat 0 -562px'
            },
            selected:{
                width: '21px',
                height: '21px',
                display: 'block',
                position: 'absolute',
                top: '8px',
                left: '5px',
                background: 'url(src/images/pra_icon.png) no-repeat 0 -842px'
            },
            span:{
                color:'#999',
                marginRight: '#999',
                position: 'absolute',
                top: '7px',
                left: '40px'
            }
        }
        return  this.state.theTitle.content.map((item,index) => {
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
                    <i style = {selected[index]?subAnswer.selected:subAnswer.i} className = "multiSelect" data-sign = {index} onClick = {!this.state.useClick?() => this._onHandleClick(index):''}></i><span style = {subAnswer.span}>{arrIndex}</span>{item}
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
            
            <div style = {subContent.wrapper} data-id = {this.props.dataId} data-key = {this.props.dataItem.orderNum} className = "multiSelectWrapper controlsroll" data-type = {this.props.dataType}>
                {this._getHeader()}
                <dl style={{padding: '15px 50px 25px 65px',clear: 'both',background: 'white' }}>
                    {this._getTheContent()}
                </dl>
                {this._getAnswer()}
                <input type="hidden" value = {this.multiSelect} className = "multiSelectValue"/>
            </div>
            

        )
    }
}

