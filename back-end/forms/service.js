let database = require('../database/DAL');

const getForms = ()=>{
    let forms =  database.getForms();
    let res = [];
    forms.forEach(form => {
        res.push({title: form.title , id: form.id});
    });
    return res;
}

const addForm = (form) => {
	return database.addForm(form);
};

const getForm = (id) => {
    let forms = database.getForms();
    let res = null;
    forms.forEach(form => {
        if (form.id === id){
            res = form;
            return;
        }
    });
    return res;
}

module.exports = {
    getForms , getForm , addForm
};
