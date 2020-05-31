import React,{Component} from "react";
import { Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import Home from "./HomePage/Home";

class App extends Component{
	constructor(props){
		super(props);
	}

// 	componentDidMount(){
// 		alert('render')
// 		axios.get('http://localhost:8000/')
// 		.then((response)=>{
// 			this.setState({forms: response.data.forms});
// 		})
// 		.catch(error=>{
// 			alert("inja" + (error))
// 		});		
// 	}
	render = () => (
		 <Home />
// 		<div className="App">
// 			<h1>antd version: {version}</h1>
// 			<DatePicker />
// 			<Button type="primary" style={{ marginLeft: 8 }}>
// 			{this.state.forms[0]}
// 			</Button>
// 		</div>
	);
}
export default App;