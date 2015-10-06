function Survey(id, name, qArr){  
  this.id = id;
  this.name = name;
  this.qArr = qArr; //nested arrary in side of survey object
}

function RadioButton(id, question, optionsArr){
  this.id = id;
  this.type = "radioButton";
  this.question = question;
  this.optionsArr = optionsArr;
  this.answer = "";
}

function CheckBox(id, question, optionsArr){
  this.id = id;
  this.type = "checkBox";
  this.question = question;
  this.optionsArr = optionsArr;
  this.answer = [];
}

function DropDown(id, question, optionsArr){
  this.id = id;
  this.type = "dropDown";
  this.question = question;
  this.optionsArr = optionsArr;
  this.answer = "";
}

function OpenEnd(id, question){
  this.id = id;
  this.type = "openEnd";
  this.question = question;
  this.answer = "";
}

Survey.prototype.getQuestionArr = function(){
  return this.qArr;
};

CheckBox.prototype = new Survey();
RadioButton.prototype = new Survey();
DropDown.prototype = new Survey();
OpenEnd.prototype = new Survey();
