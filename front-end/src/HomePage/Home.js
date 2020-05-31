import React from 'react';
import  './Home.css';
import * as axios from 'axios';
import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, IconButton , Typography} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [{title:"form1" , id: '1'}]};
        this.cnt = 0;
    }
    
	componentDidMount() {
        this.cnt = 1;	
        axios.get('http://localhost:8000/api/form')
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
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
        );
    }
    
    render() {
        return (
            <div>
                <Typography variant="h6" >
                    List of Forms
                </Typography>
                <div>
                    <List dense={true}>
                    {this.state.data.map((element)=> this.generate(element))}
                    </List>
                </div>
            </div>
        );
    }
}

export default Home;