import React from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber } from 'antd';
import axios from 'axios';
import MapModal from './Map'
class Form1 extends React.Component{
    
	state={submitted:false , form:{ title:' ' , id:' ' ,fields:[]}, names:{} , visibleMap:false};
	layout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          }
    };
    tailLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    }

	componentDidMount(){
        axios.get(`/api/form/${this.props.match.params.id}`)
        .then((response)=>{
            this.setState({form: response.data});
        })
        .catch(error=>{
            alert(`error = ${error}`);
        });	
    }
    getAddress = ({lat , long}) => {
        const promise = new Promise((resolve, reject) => {
          fetch(`https://map.ir/reverse?lat=${lat}&lon=${long}`, {
            method: 'GET',
            headers: {
              'x-api-key': process.env.REACT_APP_MAP_IR_API_KEY
            }
          })
            .then((res) => res.json())
            .then((response) => {
              resolve(response.address_compact);
            })
            .catch((err) => {
              reject(err);
              console.log(err);
            });
        });
        return promise;
    };
    onFinish = (values)=>{
        this.setState({submitted:true});
        for (let key in this.state.names){
            let attrName = key;
            let attrValue = this.state.names[key].address;
            values[attrName]=  attrValue;
        }
        axios.post(`/api/form/${this.props.match.params.id}` , values)
        .then(response => {
            if (response.status === 200)
                this.setState({submitted:true});
            else alert('try again');
        })
        .catch(err=>console.log(err));

    }
    getSelect = (element)=>{
        return(
            <Form.Item
                
                label={element.title}
                name={element.name}
                rules={
                    [
                        {
                            required:element.required,
                            message: 'این فیلد الزامی است'
                        }
                    ]
                }
            >
                <Select
                    placeholder={`Please Enter ${element.title}`}
                    allowClear
                >
                    {element.options.map(option=>{
                        return (<Select.Option value={JSON.stringify(option.value , null , '\t')}>
                            {option.label}
                        </Select.Option>)
                    })}
                </Select>

            </Form.Item>
        );
    }
    getTextField = (element)=>{
        if (element.options){
            return this.getSelect(element);
        }
        return(
            <Form.Item
                
                label={element.title}
                name={element.name}
                rules={
                    [
                        {
                            required:element.required,
                            message: 'این فیلد الزامی است'
                        }
                    ]
                }
                
            >
                <Input placeholder={`Please enter ${element.title}`}/>
            </Form.Item>
        )
    }
    getNumberField = (element)=>{
        if (element.options){
            return this.getSelect(element);
        }
        return(
            <Form.Item
                
                label={element.title}
                name={element.name}
                rules={
                    [
                        {
                            required:element.required,
                            message: 'این فیلد الزامی است'
                        }
                    ]
                }
                
            >
                <InputNumber style={{ width: '100%' }}  placeholder={`Please enter ${element.title}`}/>
            </Form.Item>
        )
    }
    getDateField = (element)=>{
        if (element.options){
            return this.getSelect(element);
        }
        return(
            <Form.Item
                
                label={element.title}
                name={element.name}
                rules={
                    [
                        {
                            required:element.required,
                            message: 'این فیلد الزامی است'
                        }
                    ]
                }
                
            >
                <DatePicker style={{ width: '100%' }} placeholder={`Please enter ${element.title}`}/>
            </Form.Item>
        )
    }
    changeMapField = (name) => (address) =>{
        let names = this.state.names;
        this.getAddress(address)
        .then(
            (value) => {
                names[name] = {address , value}; 
                this.setState({names:names});
            }
        )
        .catch((err) =>alert(err));
        this.onClose();
    }
    onClose = ()=>{
        this.setState({visibleMap:false});
    }
    getMap = (element)=>{
        if (element.options){
            return this.getSelect(element);       
        }
        return(
            <div>
            <Form.Item
                
                label={element.title}
                name={element.name}
                rules={
                    [
                        {
                            required: true && (!this.state.names[element.name] || this.state.names[element.name.value]),
                            message: 'این فیلد الزامی است'
                        }
                    ]
                }
                
            >
                <Input value={this.state.names[element.name] ? this.state.names[element.name].value :`enter ${element.type}`} disabled/>
                <Button type="primary" htmlType="button" onClick={()=>{this.setState({visibleMap:true})}}>
                        Open map
                </Button>
            </Form.Item>
            <MapModal visible={this.state.visibleMap} title={element.title} onClose={this.onClose} onSubmit={this.changeMapField(element.name)} />
            </div>
        );
    }
    generate = (field) =>{
		if(field.type ==='Text')
			return this.getTextField(field);
		else if (field.type === 'Number'){
			return this.getNumberField(field);
        }
        else if (field.type === 'Date'){
            return this.getDateField(field)
        }
        else{
            return this.getMap(field);
        }
	}
    render(){
        if (this.state.submitted){
			return <h1>Form submitted successfully</h1>
		}
        return(
        <Form
            {...this.layout}
            name="basic"
            initialValues={{
                remember: false,
            }}
            onFinish={this.onFinish}
        >
			{this.state.form.fields.map(element=>this.generate(element))}
            <Form.Item {...this.tailLayout}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
        )

    }
}

export default Form1;