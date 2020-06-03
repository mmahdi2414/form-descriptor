import React from 'react';
import {MDBCol, MDBInput, MDBBtn, MDBSelectInput, MDBSelect, MDBSelectOptions, MDBSelectOption, MDBRow} from 'mdbreact';
import axios from 'axios';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
class Form extends React.Component{
    
	state={submitted:false , form:{ title:' ' , id:' ' ,fields:[]} , names:{}};
	layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	componentDidMount(){
        axios.get(`/api/form/${this.props.match.params.id}`)
        .then((response)=>{
			let names = {};
			response.data.fields.forEach(element => {
				names[element.name] = {value:(element.options && element.required ? element.options[0] : '') , valid:false , required:element.required};
			});
            this.setState({form: response.data , names:names});
        })
        .catch(error=>{
            alert(`error = ${error}`);
        });	
    }
    HandleClicked = event => {
		let form = this.state.form;
		let newNames={};
		let notOk = false;
		let names = this.state.names;
		form.fields.forEach(elem => {
			let element = elem.name;
			newNames[element] = {value:names[element].value, valid:(names[element].required===true && names[element].value==''), required:names[element].required};
			notOk |= newNames[element].valid; 
		});
		if (notOk){
			this.setState({names:newNames});
		}
		else{
			this.submitHandler(newNames);
		}
	}
    submitHandler = (newNames)=> {
		// alert(event.target.className);
		// event.preventDefault();
		// event.target.className += ' was-validated';
		this.setState({submitted: true , names:newNames});
		alert(JSON.stringify(this.state.names));
    };
    
	changeHandler = event => {
		
		let names = this.state.names;
		names[event.target.name] = {value: event.target.value , valid:(event.target.required===true && !event.target.value) , required:event.target.required};
		// alert(JSON.stringify(names));
		this.setState({names: names});
	};

	handleChange = name => value =>{
		let names = this.state.names;
		names[name] = {value:value.value , valid:true , required:names[name].required};
		this.setState({names: names});
	}
	getTextField = (element)=>{
		if (element.options){
			return(
				<MDBRow md='6'>
					<span>Select {element.title}</span>
					<Select defaultValue={element.required ? element.options[0] : ''} label={element.title} name={element.name} onChange={this.handleChange(element.name)} options={element.options} />
				</MDBRow>
			);
		}
		return (
			<MDBRow>
              <TextField 	
				error={this.state.names[element.name].valid}
                value={this.state.names[element.name].value}
                onChange={this.changeHandler}
				type={element.type}
				id={element.type}
                name={element.name}
				label={element.title}
				InputLabelProps={{
					shrink: true,
				}}
				required={element.required}
				helperText={this.state.names[element.name].valid&&('این فیلد الزامی است')}
              />
			  </MDBRow>
		);
	}
	generate = (field) =>{
		if(field.type==='Text' || field.type === 'Number' || field.type==='Date')
			return this.getTextField(field);
		else {
		}
	}

	render() {
		if (this.state.submitted){
			return <h1>Form submitted successfully</h1>
		}
		return (
			<div style={{height:'100%',with:'100%'}}>
				<h1>{`${this.state.form.title}`}</h1>
				<form
					// className=''
					// onSubmit={this.submitHandler}
				>	
					
					{this.state.form.fields.map(element=>this.generate(element))}
					<button type="submit" class="btn btn-dark" onClick={this.HandleClicked}>Submit Form</button>
				</form>
			</div>
		);
	}
}

export default Form;