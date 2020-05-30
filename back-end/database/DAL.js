const file = require('./../File/file');
const log = require('./../logger/logger');

const dataDir = 'data.json';

let data = file.read(dataDir);


const getForms = function() {
	return data.forms;
};

const addForm = function(form){
    data.forms.push(form);
    if (file.write(dataDir , data)===false){
        data.forms.pop();
        return false;
    }
    log('info','new form added to database');
    return true;
};

module.exports = {
    getForms , addForm
};
