/**
 * Created by yjy on 2017/3/6.
 */
import React from 'react';
import ReactDOM from 'react-dom';
export default class ToppicName extends React.Component {
    constructor(props) {
        super(props);
    }


    static defaultProps(){
        title:''
    };

    static propTypes(){
        title: React.PropTypes.string.isRequired
    };

    componentWillMount() {

    }


    componentDidMount() {

    }

    render(){
        const wrapper = {
            content:{
                padding: '15px 30px',
                background: '#e2f9ff',
                border: '1px solid #cddde1',
                borderRadius: '2px',
                marginBottom: '15px',
                textAlign:'left',
                fontSize:'14px',
                color:'#333',
                width:'920px',
                boxSizing:'border-box',
                width:'920px'
            }
        };
        return(
            <div style={{marginTop:'40px'}}  className = "scrollNum">
                <div style={wrapper.content}>{this.props.title}</div>
            </div>
        )
    }

}