/**
 * Created by yjy on 2017/2/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Checks from './src/components/checks/Checks';
import MultiSelect from './src/components/checks/MultiSelect';
import Header from './src/components/header/Header';
import ToppicName from './src/components/header/topicName';
import Answer from './src/components/answer/answer';
import AnswerSheet from './src/components/answerSheet/AnswerSheet';
import CountDown from './src/components/countDown/countDown';
import Http from './src/https/http';

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		// let questions=this._getquestions();
		// let answers=this._answers();
		// let selected=this._seleted();
		// let getSelected = this._getSeleted();
		this.state = {
			title: '',
			introduce: '',
			btnNumber: [{content: '', selected: true}],
			position: true,
			testTime: 0,
			type: {},
			count: 66,
			messageData1: [],
			messageData2: [],
			messageData3: [],
			p: 'position',
			r: '-6px',
			i: '999999',
			showRightAnswer: false,
			t: '0',
			submitButtonState: true,
			rightNum: 0,
			falseNum: 0,
			otherNum: 0,
			fraction: '',
			clearSetIn: false,
			clickNum: 6,
			// questions,
			// answers,
			// selected,
			// getSelected,
			start: 0,
			click: 1,
			message: {
				typeList: {},
				messageData: [],
				messageListSelect: [],
				messageDataNum: [],
				answerSweet: []
			},
			caseItem: '',
			useFixed:false
		};

		this.message = {
			typeList: {},
			messageData: [],
			messageListSelect: [],
			messageDataNum: [],
			answerSweet: [],
			icheckNum: 0,
			multiSelectNum: 0  //控制单双选的数量
		};
		this.answerListMultiSelect = [];
		this.id = this.props.params.userId.substr(1);
	}


	componentWillMount() {

	}

	componentDidMount() {
		//获取考卷信息
		Http.post('module/queryInfo', {id: this.id}, (data) => {
			this.setState({
				title: data.message.title,
				introduce: data.message.introduce,
				testTime: data.message.testTime
			},()=>{
				let start = this.state.testTime;
				console.log(start)
				this.cc = setInterval(()=>{
					start--;
					this.setState({start});
					if(start <= 0){
						this._onsubmitClick();
					}
				},1000)
				// if(!this.state.clearSetIn){
				// 	this.cc && clearInterval(()=>this.cc);
				// }
			});
		});

		Http.post('questionBank/queryCount', {mId: this.id}, (data) => {
			// this.setState({type: data.message.typeList, count: data.message.count})
			// this.message = this.state.message;
			this.message.typeList = data.message.typeList;
			let btnNumber = this.state.btnNumber;
			this.message.typeList.map((item,index) => {
				this.answerListMultiSelect[index] = [];
				let caseItem = item.substring(item.length - 3,item.length);
				this.setState({
					caseItem
				})
				let topPicName = '';
				switch (caseItem){
					case 'CLT': topPicName = "材料题"
						break;
					case 'DXT': topPicName = "多选题"
						break;;
					case 'JDT': topPicName = "简答题"
						break;
					case 'XZT': topPicName = "选择题"
						break;
				}
				if(index > btnNumber.length -1){
					btnNumber.push({})
				}
				btnNumber[index].content = topPicName;
			});
			this.setState({
				btnNumber
			});
			this.message.count = data.message.count;

			this.message.typeList.map((item,index) => {
				Http.post('questionBank/queryInfo', {
					mId: this.id,
					code: this.message.typeList[index]  //typeList控制含有多少种类型的题
				}, (data) => {
					// this.setState({messageData1: data.message})
					this.subsetListLength = 0;
					this.message.messageData[index] = data.message; //messageData控制含有的题目详细信息
					data.message.map((item,k) => {
						if(item.code == 'IGROWFACE_CLT'){
							this.subsetListLength += item.subsetList.length;
							item.subsetList.map((q,d) => {
								if(q.code == 'IGROWFACE_DXT_SUB'){
									this.message.multiSelectNum += item.subsetList.length;
								}else if(q.code == 'IGROWFACE_XZT_SUB'){
									this.message.icheckNum += data.message.length;
								}
							})
							this.message.messageDataNum[index] = this.subsetListLength;
						}else if(item.code == 'IGROWFACE_DXT'){
							this.message.multiSelectNum += data.message.length;
							this.message.messageDataNum[index] = data.message.length;
						}else if(item.code == 'IGROWFACE_XZT'){
							this.message.icheckNum += data.message.length;
							this.message.messageDataNum[index] = data.message.length;//length控制题目数量
						}else{
							this.message.messageDataNum[index] = data.message.length;//length控制题目数量
						}
					});

					// for(let i = 0; i < this.message.messageDataNum[index]; i++){
					// 	this.message.messageListSelect[index].push(['A']) //messageListSelect控制题目选项
					// }
				});
			});
			this.setState({
				message:this.message
			},() => {
				let message = this.state.message;
				let array;
				for(let i = 0; i < this.message.typeList.length; i++){
					this.message.messageListSelect.push([]);//messageListSelect控制题目选项
					this.message.answerSweet.push([]);
				}
				message.messageDataNum.map((item,index) => {
					if(index == 0){
						array = this._getArray(0,item);
						message.answerSweet[index] = array;
					}else{
						let numberC = this._getLength(message.messageDataNum,index);
						 array = this._getArray(message.answerSweet[index-1][message.answerSweet[index-1].length - 1],numberC);
						message.answerSweet[index] = array;
					}
				});
				this.setState({
					message
				})
			})

		})

		this._bindEvent();
		// Http.post('/exam-domain/questionBank/queryInfo', {
		// 	mId: 16,
		// 	code: this.message.typeList [1]
		// }, (data) => {
		// 	// this.setState({messageData2: data.message})
		// 	this.message.messageData2 = data.message;
		// 	this.message.messageData2Num = data.message.length;
		// 	this.answerListChecks = [];
		// 	for(let i = 0; i < this.message.messageData2.length; i++){
		// 		this.answerListChecks.push('A');
		// 	}
		// })
        //
        //
        //
		// Http.post('/exam-domain/questionBank/queryInfo', {
		// 	mId: 16,
		// 	code: this.message.typeList [2]
		// }, (data) => {
		// 	this.setState({messageData3: data.message})
		// 	this.message.messageData3 = data.message;
		// })

		// this._bindEvent();

	}



	_getTypeTopic(){
		const btnNumber = this.state.btnNumber;
		return	this.message.typeList.length > 0? this.message.typeList.map((item,index) => {
			let caseItem = btnNumber[index].content;
			return (
				<div key = {index}>
					<ToppicName title = {caseItem} >

					</ToppicName>
					{this.state.message.messageData.length>0?this._getMainTopic(this.state.message.messageData[index],index):''}
				</div>
			)
		}):''
	}

	_getMainTopic(array,index){
		const styles = {
			clLeft:{
				position: 'absolute',
				left: '5px',
				top: '15px',
				fontSize: '12px',
				lineHeight: '14px',
				background:' #00a0b8',
				color: '#fff',
				width: '20px',
				padding: '5px 3px',
				textAlign: 'center',
				borderRadius: '3px',
				zIndex: '9'
			},
			vsubmatercon:{
				background: '#fafafa',
				padding: '10px 30px 20px 55px'
			},
			vcailtext:{
				paddingLeft: '5px',
				padding: '0px',
				lineHeight: '30px',
				cursor: 'auto',
				fontSize:'14px'
			}
		};

		return array.map((i,k) => {
			let caseItem = i.code.substring(i.code.length - 3,i.code.length);
			let item =  caseItem == 'CLT'?
				(<div key={k} style = {{position:'relative',width:'920px'}}>
					<i style = {styles.clLeft}>材料题</i>
					<div style = {styles.vsubmatercon}>
						<div style = {styles.vcailtext} dangerouslySetInnerHTML = {{__html: i.title}} />
					</div>
					{i.subsetList.map((item,z) => {
						let codeItem = item.code;
						if(codeItem.indexOf('DXT') != -1){
							return (
								<MultiSelect dataItem = {item} key = {z}  dataId = {item.id} dataType = {item.code}   showAnswer = {this.state.showRightAnswer} useClick = {this.state.useClick }/>
							)
						}else if(codeItem.indexOf('XZT') != -1){
							return (
								<Checks dataItem = {item} key = {z}  dataId = {item.id} dataType = {item.code}   showAnswer = {this.state.showRightAnswer} useClick = {this.state.useClick }/>
							)
						}else if(codeItem.indexOf('JDT') != -1){
							return (
								<Answer dataItem = {item} key = {z}  dataId = {item.id} dataType = {item.code}   showAnswer = {this.state.showRightAnswer} />
							)
						}

					})}
				</div>)
				: caseItem == 'DXT'?
				(<div key={k}>
					<MultiSelect dataItem = {i}  dataId = {i.id} dataType = {i.code}   showAnswer = {this.state.showRightAnswer} useClick = {this.state.useClick}/>
				</div>)
				: caseItem == 'JDT'?
				(<div key={k}>
					<Answer dataItem = {i} dataId = {i.id} dataType = {i.code}   showAnswer = {this.state.showRightAnswer} />
				</div>)
				: caseItem == 'XZT'?
				(<div key={k}>
					<Checks dataItem = {i} dataId = {i.id} dataType = {i.code}   showAnswer = {this.state.showRightAnswer} useClick = {this.state.useClick}/>
				</div>)
				:'';
			return  item;
		})
	}
	//控制倒计时时间
	suspend(){
		let click=this.state.click
		let start=this.state.start;
		click++
		this.setState({click})
		if(start <= 0){
			return;
		}else{
			if(click%2==0){
				clearInterval(this.cc)
			}else{
				this.cc = setInterval(()=>{
					start--;
					if(start <= 0){
						this._onsubmitClick();
					}
					this.setState({start})
				},1000)
			}
		}
	}

	控制答题卡定位
	_onScroll(){
		// right:(document.documentElement.clientWidth -1200)/2-2,
		// 	right:-6,
		let d = document.querySelector('#selectType').offsetTop || 300;
		let t = document.documentElement.scrollTop || document.body.scrollTop;
		let useFixed = this.state.useFixed;
		if(t > d){
			useFixed = true;
			this.setState({
				useFixed
			})
			// this.setState({position:false})
			// this.setState({p:'fixed'})
			// this.setState({r})
			// this.setState({i:999999})
			// this.setState({t:0})
		}else{
			useFixed = false;
			this.setState({
				useFixed
			})
			// this.setState({position:true})
			// this.setState({p:'absolute'})
			// this.setState({r:'-6px'})
			// this.setState({i:999999})
			// this.setState({t:344})
		}
	}

	_getArray(num1,num){
		let dataName = [];
		for(let i = num1+1;i <= num; i++){
			dataName.push(i);
		}
		return dataName;
	}


	// _getquestions(){
	// 	let questions=[];
	// 	for(let i=2;i<26;i++){
	// 		questions.push(i)
	// 	}
	// 	return questions;
	// 	this._getArray(questions,)
	// }
    //

	//答题卡部分渲染
	_answers(){
		const topicLength = this.state.message.answerSweet;
		return topicLength.length >0? this.state.btnNumber.map((item,index) =>{
			return (
				<div key = {index}>
					<div className="AnswerCont">
						<div className="contBox">
							<span className="contFont">{item.content}</span>
							<div className="questionBox">
								{topicLength[index].map((item,index) => {
									return (<div className="questionsNo" key={index} >
											{item}
											</div>
											)
								})}
							</div>
						</div>

					</div>
				</div>
			)
		}):''
	}


    //
	// _seleted(){
	// 	let selected=[];
	// 	for(let i=26;i<34;i++){
	// 		selected.push(i)
	// 	}
	// 	return selected;
	// }

	// _getSeleted(){
	// 	let getSelected = [];
	// 	for(let i = 0; i< this.messgage.count;i++){
	// 		getSelected.push(false)
	// 	}
	// 	return getSelected;
	// }

	// questionsMap(){
	// 	return this.state.questions.map((items,i)=>{
	// 		return(
	// 			<div className="questionsNo" key={i} style = {{backgroundColor:this.state.getSelected[i]?'#6cc5d7':'#fff'}}>
	// 				{items}
	// 			</div>
	// 		)
	// 	})
    //
	// }
    //
	// answersMap(){
	// 	return this.state.answers.map((items,i)=>{
	// 		return(
	// 			<div className="questionsNo" key={i} style = {{backgroundColor:this.state.getSelected[i]?'#6cc5d7':'#fff'}}>
	// 				{items}
	// 			</div>
	// 		)
	// 	})
	// }
    //
	// selectedMap(){
	// 	return this.state.selected.map((items,i)=>{
	// 		return(
	// 			<div className="questionsNo" key={i} style = {{backgroundColor:this.state.getSelected[i]?'#6cc5d7':'#fff'}}>
	// 				{items}
	// 			</div>
	// 		)
	// 	})
	// }

	绑定jq事件
	_bindEvent(){
		let arr1Length = this.message.icheckNum; //单选数量
		let arr2Length = this.message.multiSelectNum; //多选数量
		let arr1 = [false,false,false,false];
		let arr2 = [false,false,false,false];
		let itemSelected = [];
		let selectedWhat = [];
		for(let j = 0;j < arr1Length; j++){
			selectedWhat.push(arr1)
		}
		for(let j = 0;j < arr2Length; j++){
			itemSelected.push(arr2)
		}

		//绑定单选事件
		$('body').on('click','.item',function(){
			let $this = $(this);
			let $sign = $this.attr("data-sign");
			let $parent = $(this).parents('.itemWrapper');
			let data = $parent.attr('data-key');
			data = data -1;
			let dataNum = data;
			let $question = $('.questionsNo');
			let itemSelectedthis = selectedWhat[dataNum].slice();
			for(let i = 0;i < itemSelectedthis.length ; i++){
				if( i == $sign){
					itemSelectedthis[i] = !itemSelectedthis[$sign];
				}else{
					itemSelectedthis[i] = false;
				}
			}
			selectedWhat[dataNum] = itemSelectedthis;

			if(itemSelectedthis.indexOf(true) == -1){
				$question[data].style.backgroundColor = "#fff";
			}else{
				$question[data].style.backgroundColor = "#6cc5d7";
			}
		});

		//绑定多选事件
		$('body').on('click','.multiSelect',function(){
			let $this = $(this);
			let $sign = $this.attr("data-sign");
			let $parent = $(this).parents('.multiSelectWrapper');
			let data = $parent.attr('data-key');
			let $question = $('.questionsNo');
			data = data -1;
			let selectedThis = itemSelected[data].slice();
			selectedThis[$sign] = !selectedThis[$sign];
			itemSelected[data] = selectedThis;
			if(selectedThis.indexOf(true) == -1){
				$question[data].style.backgroundColor = "#fff";
			}else{
				$question[data].style.backgroundColor = "#6cc5d7";
			}
		});

		$('body').on('click','.form',function(){
			let $this = $(this);
			let $sibtextarea = $this.siblings('.input');
			let $parent = $(this).parents('.answerWrapper');
			let data = $parent.attr('data-key');
			data = data -1;
			let length = $sibtextarea.text().length;
			let $question = $('.questionsNo');
			if(length > 1){
				$question[data].style.backgroundColor = "#6cc5d7";
			}else{
				$question[data].style.backgroundColor = "#fff";
			}
		});

		$('body').on('click','.questionsNo',function(){
			console.log('11111')
			let $this = $(this);
			let $index = parseInt($this.html()) - 1;
			let $controlS = $('.controlsroll');
			let scrollT = $controlS.eq($index).offset().top;
			let willScrollT = scrollT - 100;
			$this.animate({opacity:0.6},300,function(){
				$(this).css({
					opacity:1
				})
			});
			$('html,body').animate({scrollTop: willScrollT}, 800);
		});

		$('body').on('click','.scrollClick',function(){
			let $this = $(this);
			let $index = $(this).index();
			let $controlS = $('.scrollNum');
			let scrollT = $controlS.eq($index).offset().top;
			let willScrollT = scrollT - 100;
			$this.animate({opacity:0.6},300,function(){
				$(this).css({
					opacity:1
				})
			});
			$('html,body').animate({scrollTop: willScrollT}, 800);
		});

		// window.onscroll = function(){
		// 	this._onScroll()
		// }.bind(this);
		var throttled = _.throttle(this._onScroll).bind(this);
		$(window).scroll(throttled);
	}

	//点击提交按钮发生的事件
	_onsubmitClick(){
		layer.load(0, {shade: false,time:1500,shade: [0.1,'#000'] //0.1透明度的白色背景
		});
		this.cc && clearInterval(this.cc)
		let $multiSelectWrapper = $('.multiSelectWrapper');
		let $itemWrapper = $('.itemWrapper');
		let $answerWrapper = $('.answerWrapper');
		// let $multiSelectWrapperType = $multiSelectWrapper.attr('data-type');
		let $itemWrapperType = $itemWrapper.attr('data-type');
		let $answerWrapperType = $answerWrapper.attr('data-type');
		let arr = $multiSelectWrapper;
		let $allAnswer = [];
		//分为三段，第一段多选
		for(let i = 0; i < $multiSelectWrapper.length; i++){
			$allAnswer.push({
				"taType": $multiSelectWrapper.eq(i).attr('data-type'),
				"taAnswer": $multiSelectWrapper.eq(i).find('.multiSelectValue').val(),
				"questionId": $multiSelectWrapper.eq(i).attr('data-id')
			})
		}
		//第二段单选
		for(let j = 0; j < $itemWrapper.length; j++){
			$allAnswer.push({
				"taType": $itemWrapperType,
				"taAnswer": $itemWrapper.eq(j).find('.checksValue').val(),
				"questionId": $itemWrapper.eq(j).attr('data-id')
			})
		}
		//第三段简答
		for(let j = 0; j < $answerWrapper.length; j++){
			$allAnswer.push({
				"taType": $answerWrapperType,
				"taAnswer": $answerWrapper.eq(j).find('.input').val(),
				"questionId": $answerWrapper.eq(j).attr('data-id')
			})
		}
		//延迟发送答案
		setTimeout(()=>{
			Http.post('answer/submitAnswer', {
				"data": $allAnswer,
				"moduleId": this.id,
				"respondentId": "13"
			}, (data) => {
				let $question = $('.questionsNo');
				let getData = data.message.answerList;
				let rightNum = this.state.rightNum;
				let otherNum = this.state.otherNum;
				let falseNum = this.state.falseNum;
				for(let i = 0; i < getData.length; i++){
					switch (getData[i].state){
						case -1: otherNum++;
							break;
						case 0: falseNum++;
							break;
						case 1: rightNum++;
							break;
					}
				}

				// for(let i = 0;i < this.message.messageDataNum.length; i++){
				// 	let qnum = i == 0?0:this._getLength(this.message.messageDataNum,i-1);
				// 	this.answerListMultiSelect[i] = data.message.answerList.slice(qnum,this._getLength(this.message.messageDataNum,i))
				// }
				// this.answerListMultiSelect = data.message.answerList.slice(0,1);
				// this.answerListChecks = data.message.answerList.slice(1,data.message.answerList.length);
				this.setState({
					showRightAnswer:true,
					fraction:data.message.scoreCount,
					rightNum,
					otherNum,
					falseNum,
					submitButtonState:false,
					useClick:true
				},() =>{
					layer.alert('您的总分为'+data.message.scoreCount, {icon: 8,title:false,btn: [ '查看试卷分数']},function(index){
						layer.close(index);
						$('body,html').scrollTop(0);
					});
					this._onScroll();
				})
				console.log(1);
				let answerListMultiSelect = data.message.answerList.slice();
				console.log(answerListMultiSelect)
				let $rightAnswer = $('.rightAnswer');
				let getColorChangeArr = [];
				let $questionsNo = $('.questionsNo');
				answerListMultiSelect.map((item,index) => {
					let questionId = item.questionId;
					let answerState = item.state;
					let currkey = item.correctKey;
					answerState == 0?getColorChangeArr.push(item):''
					for(let i = 0;i < $rightAnswer.length; i++){
						let dataId = $rightAnswer.eq(i).attr('data-id');
						if(dataId === questionId){
							$rightAnswer.eq(i).html(currkey);
						}
					}
				});

				getColorChangeArr.length > 0?getColorChangeArr.map((item,index) => {
					let questionId = item.questionId;
					for(let i = 0;i < $rightAnswer.length; i++){
						let dataId = $rightAnswer.eq(i).attr('data-id');
						if(dataId === questionId){
							$question[i].style.background = 'red'
						}
					}
				}):'';

				$('body').off('click','.item');
				$('body').off('click','.multiSelect')
			})
		},1500)
	}

	_getLength(item,index){
		if (index == 0) {
			return item[index];
		}
		else if(index < 0){
			return;
		}else {
			return item[index] + this._getLength(item,index - 1);
		}
	}

	_getCollBtn(){
		const getCollBtn = {
			allBtn:{
				padding: '0 15px',
				fontSize: '14px',
				display: 'block',
				float: 'left',
				lineHeight: '30px',
				margin: '12px 15px 0 0',
				borderRadius: '30px',
				color: '#fff',
				whiteSpace: 'nowrap',
			}
		}
		return this.state.btnNumber.map((item,index) => {
			return(
				<a href="javascript:;" key = {index} style = {getCollBtn.allBtn}     onClick = {() => this._eachBtnClick(index)} className = {item['selected']?'selected crollClick':'btnSelected scrollClick'}>
					{item.content}
				</a>
			)
		})
	}

	_eachBtnClick(index){
		let btnNumber = this.state.btnNumber;
		for(let i in btnNumber){
			if(i == index){
				btnNumber[i]['selected'] = true
			}else{
				btnNumber[i]['selected'] = false
			}
		}
		this.setState({
			btnNumber
		})
	}


	_goBackTop(){
		$('body').animate({scrollTop: 0}, 800);
		$('html').animate({scrollTop: 0}, 800);
	}

	_getFenShow(){
		return !this.state.submitButtonState?(
										<div style={{height:'40px',lineHeight:'40px',backgroundColor:'#fff',paddingLeft:'20px',marginTop:'30px'}}>
													<span style={{marginLeft:'5px'}}>
													正确：{this.state.rightNum}
													</span>
													<span style={{marginLeft:'28px'}}>
													未做：{this.state.otherNum}
													</span>
													<span style={{marginLeft:'28px'}}>
													错误：{this.state.falseNum}
													</span>
										</div>
									):''

	}

	_getStateHide(){
		return this.state.submitButtonState?(
			<div style={{height:'40px',lineHeight:'40px',backgroundColor:'#fff',paddingLeft:'20px',marginTop:'20px'}}>
						<span style={{marginLeft:'5px'}}>
				已做：<span style = {{width:'20px',height:'12px',backgroundColor:'#6cc5d7',display:'inline-block'}}></span>
				</span>
						<span style={{marginLeft:'20px'}}>
				未做：<span style = {{width:'20px',height:'12px',backgroundColor:'#fff',display:'inline-block'}}></span>
				</span>
			</div>
		):''
	}

	_getStateShow(){
		return !this.state.submitButtonState?(
			<div style={{height:'40px',lineHeight:'40px',backgroundColor:'#fff',paddingLeft:'20px',marginTop:'20px'}}>
						<span style={{marginLeft:'5px'}}>
				正确：<span style = {{width:'20px',height:'12px',backgroundColor:'#6cc5d7',display:'inline-block'}}></span>
				</span>
						<span style={{marginLeft:'20px'}}>
				未做：<span style = {{width:'20px',height:'12px',backgroundColor:'#fff',display:'inline-block'}}></span>
				</span>
					<span style={{marginLeft:'20px'}}>
				错误：<span style = {{width:'20px',height:'12px',backgroundColor:'#c33',display:'inline-block'}}></span>
				</span>
			</div>
		):''
	}
	_submitButtonHide(){
		return this.state.submitButtonState?(
			<div style={{padding: '20px 15px 15px 15px'}} >
				<a className = "btn"  style ={{width:"100%",height:"40px",lineHeight:"40px",background: "#e45c40",
                        color: "#fff",display: "block",textAlign: "center",borderRadius:  "2px",marginTop:'40px',cursor:'pointer',userSelect:'none'}} onClick={() => this._onsubmitClick()}>
					交卷
				</a>
			</div>
		):''
	}


	_getButton(){
		const uiProgress ={
			uiprogresssub:{
				paddingBottom: '10px',
				position:'static',
				top:'auto',
				bottom:'auto',
				left:'auto',
				right:'auto',
				boxShadow: '0 2px 3px #eee',
				backgroundColor: '#f8f8f8',
				width:'1200px'
			},
			uiprogresssubFix:{
				position:'fixed',
				zIndex:1001,
				left:'0px',
				right:'0px',
				top:'0px',
				boxShadow: '0 2px 3px #eee',
				backgroundColor: '#f8f8f8',
				width:'1200px',
				margin:'0 auto'
			},
			navBox:{
				width: '1138px',
				height: '50px',
				lineHeight: '56px',
				borderTop: '#e7e7e7 solid 1px',
				padding: '0 30px',

			}

		}
		return(
			<div  style = {this.state.position?uiProgress.uiprogresssub:uiProgress.uiprogresssubFix}>
				<div >
					<div style = {uiProgress.navBox} className = 'clearfix'>
						{this._getCollBtn()}
					</div>
				</div>
			</div>
		)
	}

	//主render
	render() {
		const wrapper ={
			margin:'0 auto',
			width:'1200px',
			position:'relative'
		};

		const styles={
			location:{
				position:'fixed',
				top:'5px',
				right:(window.innerWidth - 1220)/2 +'px',
				zIndex:'11111111'
			},
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
					fontSize:16,
					zIndex:999999,
			},
			position:{
				position:'absolute',
				top:'342px',
				right:0
			},
			handle:{

			},
			handlelocation:{
				position:'fixed',
				top:'0px',
				left:(window.innerWidth - 1220)/2 +'px',
				zIndex:'111111'
			}
		};

		const headerProps = {
			title:this.state.title,
			introduce:this.state.introduce,
		};

		const countDownProps = {
			testTime:this.state.testTime
		};

		const showAnswer = {
			else:this.state.showRightAnswer
		};
		const showhide = {
			show:{
				display:'block'
			},
			hide:{
				display:'none'
			}
		}
		let hours =Math.floor(this.state.start/3600) >= 9 ? Math.floor(this.state.start/3600) : '0'+Math.floor(this.state.start/3600);
		let minutes = parseInt(this.state.start%3600/60) >= 9? parseInt(this.state.start%3600/60): '0'+ parseInt(this.state.start%3600/60) ;
		let second = this.state.start%60 >=9 ? this.state.start%60 : '0'+this.state.start%60;
		return(

			<div style = {wrapper}>
				<Header {...headerProps} fraction = {this.state.fraction} showRightAnswer = {this.state.showRightAnswer}>

				</Header>
				
				<div id="selectType" style={!this.state.useFixed?styles.handle:styles.handlelocation}>
					{this._getButton()}
				</div>
				<div style={!this.state.useFixed?styles.position:styles.location}>
					<div className="box">
						<div className="suspendBox"></div>
						<span className="timeBox">用时：<span className="timer">{hours}:{minutes}:{second}</span></span>
						<input type="button" value={(this.state.click)%2==0 ? '开始':'暂停'} className="suspend" onClick={()=>this.suspend()} style = {this.state.submitButtonState?showhide.show:showhide.hide}/>
						<input type="button" value= '已交卷' className="suspend"  style = {this.state.submitButtonState?showhide.hide:showhide.show}/>
						<div className="bigBox" style={{display:(this.state.click)%2==0 ? 'block':'none',zIndex:999999,}}>
							<div style={styles.show} ><a href="javascript:" style={styles.astyle} onClick={()=>this.suspend()}>点击继续</a></div>
						</div>
					</div>
					<div className="explain">
						<span className="explainFont">答题卡</span>
					</div>
					<div className="changeBox">
					{this._answers()}
					</div>
					{this._getStateHide()}
					{this._getStateShow()}
					{this._submitButtonHide()}
					{this._getFenShow()}
				</div>
				{this._getTypeTopic()}
				<div className="back slidebar_backUp" onClick={() => this._goBackTop()}>
					<a href="javascript:;" className="m-trans back-top" title="返回顶部"></a>
				</div>
			</div>


			// 	<div id="selectType">
			// 		{this._getButton()}
			// 	</div>
			// 	<div style={styles.location}>
			//
			// 		/*计时器部分*/
			// 		<div className="box">
			// 			<div className="suspendBox"></div>
			// 			<span className="timeBox">用时：<span className="timer">{hours}:{minutes}:{second}</span></span>
			// 			<input type="button" value={(this.state.click)%2==0 ? '开始':'暂停'} className="suspend" onClick={()=>this.suspend()}/>
			// 			<div className="bigBox" style={{display:(this.state.click)%2==0 ? 'block':'none',zIndex:999999,}}>
			// 				<div style={styles.show} ><a href="javascript:" style={styles.astyle} onClick={()=>this.suspend()}>点击继续</a></div>
			// 			</div>
			// 		</div>
			// 		/*答题卡部分*/
			//
			//
			// 		<div style={{height:'40px',lineHeight:'40px',backgroundColor:'#fff',paddingLeft:'20px',marginTop:'20px'}}>
			// 			<span style={{marginLeft:'5px'}}>
			// 			正确：<span style = {{width:'20px',height:'12px',backgroundColor:'#6cc5d7',display:'inline-block'}}></span>
			// 			</span>
			// 			<span style={{marginLeft:'20px'}}>
			// 			未做：<span style = {{width:'20px',height:'12px',backgroundColor:'#fff',display:'inline-block'}}></span>
			// 			</span>
			// 			<span style={{marginLeft:'20px',marginRight:'20px'}}>
			// 			错误：<span style = {{width:'20px',height:'12px',backgroundColor:'red',display:'inline-block'}}></span>
			// 			</span>
			// 		</div>
			// 		{this._submitButtonHide()}
			// 		{this._getFenShow()}
			// 	</div>
			//
			// 	<ToppicName title = '一、多项选择题(共1题，每题2分。每题的备选项中，有2个或2个以上符合题意，至少有1个错项。错选，本题不得分；少选，所选的每个选项得0．5分)' >
			//
			// 	</ToppicName>
			//
			//
			//
			// 	<div className="back slidebar_backUp" onClick={() => this._goBackTop()}>
			// 		<a href="javascript:;" className="m-trans back-top" title="返回顶部"></a>
			// 	</div>
			//
		)
	}

}



