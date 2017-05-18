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
import Nav from './src/components/nav/nav';
import Title from './src/components/title/title';
import Introduce from './src/components/introduce/introduce';
import Navigation from './src/components/navigation/navigation';
import Search from './src/components/search/search';
import Type from './src/components/type/type';
import List from './src/components/list/list';
import ShowList from './showlist'
import { Router, Route, hashHistory ,IndexRoute,IndexRedirect} from 'react-router';
import Login from './login'
import LoginNav from './src/components/loginnav/loginnav'
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        // let p=this._getp()
        // let r=this._getr()
    }

    // _getp(){
    //
    //     let s=document.body.scrollTop;
    //     if(s>200){
    //         return 'fixed'
    //     }else{
    //         return 'position'
    //     }
    // }
    // _getr(){
    //     let s=document.body.scrollTop;
    //     if(s>200){
    //         return (document.documentElement.clientWidth -1200)/2-6
    //     }else{
    //         return '-6'
    //     }
    // }
    componentWillMount() {

    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }


    render() {

        return  <ShowList />

    }

}




