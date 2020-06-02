import React from 'react';
import {MDBCol, MDBInput, MDBBtn, MDBSelectInput, MDBSelect, MDBSelectOptions, MDBSelectOption} from 'mdbreact';
import axios from 'axios';
import Select from 'react-select';
class Form extends React.Component{
    
	// constructor(){
		// super(this.props);
		state={submitted:false , form:{ title:' ' , id:' ' ,fields:[] } , names:{}};
	// }
	
    componentDidMount(){
        axios.get(`/api/form/${this.props.match.params.id}`)
        .then((response)=>{
			let names = {};
			response.data.fields.forEach(element => {
				names[element.name] = {name:'' , valid:false};
			});
            this.setState({form: response.data , names:names});
        })
        .catch(error=>{
            alert(`error = ${error}`);
        });	
    }
    
    submitHandler = event => {
		// alert(event.target.className);
		event.preventDefault();
		// event.target.className += ' was-validated';
		this.setState({submitted: true});
		alert(JSON.stringify(this.state.names));
    };
    
	changeHandler = event => {
		let names = this.state.names;
		names[event.target.name] = {name: event.target.value , valid:(event.target.required===false && !!event.target.value)};
		// alert(JSON.stringify(names));
		this.setState({names: names});
	};

	handleChange = name => value =>{
		let names = this.state.names;
		names[name] = {name:value.value , valid:true};
		this.setState({names: names});
	}
	getTextField = (element)=>{
		if (element.options){
			return(
				<MDBCol md="100%">
					<span>Select {element.title}</span>
					<Select defaultValue={element.required ? '' : element.options[0]} label={element.title} name={element.name} onChange={this.handleChange(element.name)} options={element.options} />
				</MDBCol>
			);
		}
		return (
			<MDBCol md="100%">
              <MDBInput
                value={this.state.names[element.name].name}
                onChange={this.changeHandler}
				type="text"
				id='materialFormRegisterPasswordEx4'
                name={element.name}
				label={element.title}
				outline
                required={element.required}
              >
				  <div className='invalid-feedback ml-3 pl-3'>
                  	این فیلد الزامی است
                </div>
              </MDBInput>
          </MDBCol>
		);
	}

	generate = (field) =>{
		if(field.type==='Text' || field.type === 'Number')
			return this.getTextField(field);
		else{
			// return <h1>{`${field.name}`}</h1>
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
					className='needs-validation was-validated'
					onSubmit={this.submitHandler}
					validate
				>
					{this.state.form.fields.map(element=>this.generate(element))}
					<MDBBtn color='primary' type='submit'>Submit Form</MDBBtn>
				</form>
			</div>
		);
	}
}

export default Form;