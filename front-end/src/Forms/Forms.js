import React from 'react';
import * as axios from 'axios';
import {List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Form1 from './../Form/Form1';
import {
    Switch,
    Route,
    Link,
} from 'react-router-dom';
class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state ={data:[{title:'smaple form 1' , id:'1234'}]};
        this.cnt = 0;
    }
    
	componentDidMount() {
        this.cnt = 1;	
        axios.get('/api/form')
        .then((response)=>{
            this.setState({data: response.data});
        })
        .catch(error=>{
            alert(`error = ${error}`);
        });	
    }
    generate = (data)=> {
        let id = `form${data.id}`;
        this.cnt++;
        return (
            <ListItem id={id}>
                  <ListItemAvatar>
                    <Avatar src='form.png'>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary= {data.title}
                  />
                  <Link to={`${this.props.match.path}/${data.id}`}>
                    <IconButton edge={false} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    </Link>
            </ListItem>
        );
    }
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/form'>
                        <h2>Forms</h2>
                        <List dense={true}>
                            {this.state.data.map((element)=> this.generate(element))}
                        </List>
                    </Route>
                    <Route path={'/form/:id'} component={Form1} />

                </Switch>
            </div>
        )
    }
}

export default Forms;