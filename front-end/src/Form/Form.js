import React from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//   } from 'react-router-dom';
class Form extends React.Component{
    render(){
    return <h1>This is Form with id {this.props.match.params.id}</h1>
    }
}

export default Form;