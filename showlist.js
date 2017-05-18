/**
 * Created by yoyo on 2017/3/8.
 */
import React from 'react'
import Navigation from './src/components/navigation/navigation'
import Search from './src/components/search/search'
import Type from './src/components/type/type'
import List from './src/components/list/list'
import Nav from './src/components/nav/nav'
export default class ShowList extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}

	}

	render(){
		return(
			<div>
				<Nav />
				< div style={{width:1200,margin:'0 auto',minHeight:700,}}>
					<Navigation /><Search /><Type /><List />
				</div>
			</div>
		)
	}
}