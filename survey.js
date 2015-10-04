function Survey(id, name, qArr){  
  this.id = id;
  this.name = name;
  this.qArr = qArr; //nested arrary in side of survey object
}

function RadioButton(id, question, optionsArr){
  this.type = "radioButton";
  this.id = id;
  this.question = question;
  this.optionsArr = optionsArr;
}

function CheckBox(id, question, optionsArr){
  this.type = "checkBox";
  this.id = id;
  this.question = question;
  this.optionsArr = optionsArr;
}

function DropDown(id, question, optionsArr){
  this.type = "dropDown";
  this.id = id;
  this.question = question;
  this.optionsArr = optionsArr;
}

function OpenEnd(id, question){
  this.type = "openEnd";
  this.id = id;
  this.question = question;
}

Survey.prototype.getQuestionArr = function(){
  return this.qArr;
};

CheckBox.prototype = new Survey();
RadioButton.prototype = new Survey();
DropDown.prototype = new Survey();
OpenEnd.prototype = new Survey();
