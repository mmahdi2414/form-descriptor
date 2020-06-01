import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
// import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
class Form extends React.Component{
    
	// constructor(){
		// super(this.props);
		state={submitted:false , form:{ title:' ' , id:' ' ,field:[] } , names:{}};
	// }
	
    componentDidMount(){
        axios.get(`/api/form/${this.props.match.params.id}`)
        .then((response)=>{
			let name = {};
			response.data.fields.forEach(element => {
				name[element.name] = '';
			});
            this.setState({form: response.data , names:name});
        })
        .catch(error=>{
            alert(`error = ${error}`);
        });	
    }
    
    submitHandler = event => {
		event.preventDefault();
		event.target.className += ' was-validated';
		this.setState({submitted: true});
    };
    
	changeHandler = event => {
		let names = this.state.names;
		names[event.target.name] = event.target.value;
		this.setState({ names: names});
	};

	getTextField = (element)=>{
			return (
				<MDBInput
                    icon='user'
                    value={this.state.names[element.name]}
                    name={element.name}
                    onChange={this.changeHandler}
                    type='text'
                    id='materialFormRegisterNameEx'
                    label={element.title}
                    outline
                    required={element.required}
                    placeHolder={this.state.names[element.name]}
                  >
                    <div className='invalid-feedback ml-3 pl-3'> please enter {`${element.title}`} </div>
                    <div className='valid-feedback ml-3 pl-3'>Looks good!</div>
            	</MDBInput>
			);
	}

	generate = (field) =>{
		if(field.type==='text')
			return this.getTextField(field);
		else{
			return <h1>field.name</h1>
		}
	}

	render() {
		if (this.state.submitted){
			return <h1>Form submitted successfully</h1>
		}
		return (
			<div style={{height:'100%',with:'100%'}}>
				<h1>{`${this.state.form.title}`}</h1>
				<form className='needs-validation' onSubmit={this.submitHandler} noValidate>
					{this.state.form.fields.map(element=>this.generate(element))}
					<MDBBtn color='primary' type='submit'>Submit Form</MDBBtn>
				</form>
			</div>
		);
	}
}

export default Form;