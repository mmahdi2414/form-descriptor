import React from "react";
import Home from './HomePage/Home';
require('dotenv').config();

class App extends React.Component{
	render(){
		return <Home />
	}
}

export default App;