var questionId = 1;
var surveyId = 0;
var surveyName ="";
var surveyArr = [];
var currentQuestionArr = [];
var qType = document.getElementById('qType');
var question = document.getElementById('question');
var qHeader = document.getElementById('qHeader');
var qTypeHeader = document.getElementById('qTypeHeader');
var multiOptHeader = document.getElementById('multiOptHeader');
var qDisplay = document.getElementById('qDisplay');
var showSurveyDisplay = document.getElementById('showSurveyDisplay');
var innerDiv = "";
var idName = "";
var showoptArr = [];
var curIndex = 0;

function creatSurvey(){
  var surveyName = document.getElementById("surveyName");
  if (surveyName.value === ""){
    alert("Please enter survey title");
    return false;
  }

  surveyId++;
  surveyName = surveyName.value;
  var newSurvey = new Survey(surveyId, surveyName,[]);
  surveyArr.push(newSurvey);
  document.getElementById("createSurveyTitle").style.display = "none";
  document.getElementById("surveyHeader").innerHTML = newSurvey.name;
  document.getElementById("createQuestions").style.display = "block"; 
}

//After a user click 'Create', show options dropdown for question type
function showOption() {
  if (qType.value !== "default")
      qTypeHeader.className = "";

  if (qType.value === "openEnd" || qType.value === "default") 
    document.getElementById('showMultiOptions').style.display="none";
  else
    document.getElementById('showMultiOptions').style.display="block";
}

//show more Multi Choice Options when user ran out of options text input field 
var optionNum = 2;
var inputName = "";
var inputOptionName = "";

function addMoreOption() {
  for (var i=1; i <= optionNum; i++) {
     optionText = document.getElementById('option'+i);
     multiOptHeader.className = '';
     if (optionText.value === "") {
      optionText.focus();
      multiOptHeader.className += 'error';
      return false;
     }
  }    

  var newdiv = document.createElement('div');
  optionNum++;

  newdiv.innerHTML = " <input type='text' id='option" + optionNum +"' required />";
  document.getElementById('addInputText').appendChild(newdiv);
}

//show previous question & add new question area
function addMoreQuestion(){
  if (qType.value === "default") {  
    qTypeHeader.className += 'error';

    qType.focus();
    return false;
  } else {
    qTypeHeader.className = '';
  }

  if (question.value === "") {    
    if(qHeader) 
      qHeader.className += 'error';

    question.focus();
    return false;
  } else {
    qHeader.className = '';
  }

  var optionsArr = [];
  currentArr = surveyArr[surveyArr.length-1]; //get newly created survey object
  currentQuestionArr = currentArr.getQuestionArr();
  askQ = "question";

  if (qType.value !== 'openEnd') {
    var optionText = "";
    for (var i=1; i <= optionNum; i++){
       optionText = document.getElementById('option'+i);
       multiOptHeader.className = '';
       if (optionText.value === ""){
        optionText.focus();
        multiOptHeader.className += 'error';
        return false;
       }
      optionsArr.push(optionText.value); 
    }

    if (qType.value === 'radioButton'){    
      var radioArry = new RadioButton(questionId, question.value, optionsArr);
      currentQuestionArr.push(radioArry);
      displayQuestionR(currentQuestionArr[currentQuestionArr.length-1], askQ, qDisplay);
    }
    
    if (qType.value === 'checkBox'){    
      var checkArry = new CheckBox(questionId, question.value, optionsArr);
      currentQuestionArr.push(checkArry);
      displayQuestionC(currentQuestionArr[currentQuestionArr.length-1], askQ, qDisplay);
    }

    if (qType.value === 'dropDown'){    
      var dropArry = new DropDown(questionId, question.value, optionsArr);
      currentQuestionArr.push(dropArry);
      displayQuestionD(currentQuestionArr[currentQuestionArr.length-1], askQ, qDisplay);
    }
  }    

  if (qType.value === 'openEnd'){  
    var openArry = new OpenEnd(questionId, question.value);
    currentQuestionArr.push(openArry);
    displayQuestionO(currentQuestionArr[currentQuestionArr.length-1], askQ, qDisplay);
  }  

  questionId++;

  //reset form fields
  document.getElementById('question').value ="";
  document.getElementById('qType').value="default";
  for (var j = 1; j <= optionNum; j++){
    document.getElementById('option'+j).value = "";
  } 

  //Show 'Take a Survey button' if any quesiton has created
  if (surveyArr[0].qArr)
    document.getElementById('takeSurveyBtn').style.display="inline";
}

function displayQuestionR(optArr, question, displayDiv){
  innerDiv = document.createElement('div');
  idName = question + optArr.id;
  innerDiv.id = idName;
  displayDiv.appendChild(innerDiv); 
  showoptArr = optArr.optionsArr;
  var inputRadio = "<p>" + optArr.id+". " + optArr.question + "<br>";
  for(i=0;i<showoptArr.length;i++) {
    inputRadio += "<input value='" + showoptArr[i] + "' name='radioButton"+ optArr.id +"' type='radio'> " + showoptArr[i]+"<br>";
  }
  document.getElementById(idName).innerHTML = inputRadio;
}

function displayQuestionC(optArr, question, displayDiv){
  innerDiv = document.createElement('div');
  idName = question + optArr.id;
  innerDiv.id = idName;
  displayDiv.appendChild(innerDiv); 
  showoptArr = optArr.optionsArr;
  var inputCheck = "<p>" + optArr.id+". " + optArr.question + "<br>";

  var counter = 0;
  for(i=0;i<showoptArr.length;i++) {
    counter++;
    inputCheck += "<input value='"+showoptArr[i]+"' name='checkBox"+ optArr.id +"' type='checkbox'> " + showoptArr[i] + "<br>";
  }
  document.getElementById(idName).innerHTML = inputCheck;
}

function displayQuestionD(optArr, question, displayDiv){
  innerDiv = document.createElement('div');
  idName = question + optArr.id;
  innerDiv.id = idName;
  displayDiv.appendChild(innerDiv); 
  showoptArr = optArr.optionsArr;

  var inputDrop = "<p>" + optArr.id +". "+ optArr.question + "<br>";
  inputDrop += "<select style='margin:10px' id='showoptArr[i]' style='margin:10px' name='dropDown"+ optArr.id + "'>";
  inputDrop += "<option value='default'>----</option>";
  for(i = 0; i < showoptArr.length; i++){
    inputDrop += "<option value='" + showoptArr[i] + "'>" + showoptArr[i] + "</option>";
  }
  inputDrop += "</select>";
  document.getElementById(idName).innerHTML=inputDrop;
}

function displayQuestionO(optArr, question, displayDiv){
  innerDiv = document.createElement('div');
  idName = question + optArr.id;
  innerDiv.id = idName;
  displayDiv.appendChild(innerDiv); 
  showoptArr = optArr.optionsArr;
  var inputText = "<p>"+ optArr.id +". " + optArr.question + "<br>";
  inputText += "<input type='text' name='openEnd"+ optArr.id + "'>";
  document.getElementById(idName).innerHTML = inputText;
}

function takeSurvey(){ 
  if (qType.value !== "default" || question.value !== "")
    confirm("Are you sure not to finish creating the survey first?");

  document.getElementById("createQuestions").style.display = "none"; 
  document.getElementById("showSurvey").style.display = "block";
  document.getElementById("showSurveyHeader").innerHTML = surveyArr[0].name;
  
  var showSurveyDisplay = document.getElementById("showSurveyDisplay");
  var optionsArry = surveyArr[0].getQuestionArr();
  for (var i = 0; i < optionsArry.length; i++) {
    if (optionsArry[i].type === "radioButton") {
      displayQuestionR(optionsArry[i], "showRadio", showSurveyDisplay);
    }
    if (optionsArry[i].type === "checkBox") {
      displayQuestionC(optionsArry[i], "showCheck", showSurveyDisplay);
    }
    if (optionsArry[i].type === "dropDown") {
      displayQuestionD(optionsArry[i], "showDrop", showSurveyDisplay);
    }
    if (optionsArry[i].type === "openEnd") {
      displayQuestionO(optionsArry[i], "showText", showSurveyDisplay);
    }
  }
}

var checkSurvey = function(){
  if (qType.value === "default") {  
    qTypeHeader.className += 'error';
    qType.focus();
    return false;
  } else {
    qTypeHeader.className = '';
  }

  if (question.value === "") {    
    if(qHeader) 
      qHeader.className += 'error';
    question.focus();
    return false;
  } else {
    qHeader.className = '';
  }
  return true;
};

$(document).ready(function(){
  var surveyForm = document.getElementById("formSubmitSurvey");
  surveyForm.onsubmit = function (e) {
    e.preventDefault();

    var form = document.getElementById("formSubmitSurvey");
    for (var i = 0; i < form.length ; i++) {
      var formName = form[i].name.slice(0,form[i].name.length-1);
      var formId = Number(form[i].name.slice(form[i].name.length-1,form[i].name.length));
      
      for (var j = 0; j < surveyArr[0].qArr.length; j++) {
        if ((surveyArr[0].qArr[j].id === formId) && (formName === surveyArr[0].qArr[j].type)){
          
          if (surveyArr[0].qArr[j].type === "radioButton") {
            surveyArr[0].qArr[j].answer = $('input[name="'+ form[i].name +'"]:checked').val();
          }
          if (surveyArr[0].qArr[j].type === "checkBox") {
            if (form[i].checked === true) {
              surveyArr[0].qArr[j].answer.push(form[i].value);
            }
          }
          if (surveyArr[0].qArr[j].type === "dropDown") {
            surveyArr[0].qArr[j].answer = form[i].value;
          }                
          if (surveyArr[0].qArr[j].type === "openEnd") {
            surveyArr[0].qArr[j].answer = form[i].value;
          }  
        }
      }
    }
    document.getElementById("showSurvey").style.display = "none";
    document.getElementById('showResult').style.display = 'block';
    document.getElementById("showResultHeader").innerHTML = surveyArr[0].name;
    var showResultBody = document.getElementById("showResultBody");
    innerDiv = document.createElement('div');
    showResultBody.appendChild(innerDiv); 
    
    var questionArray = surveyArr[0].qArr;
    var resultBody = "<br>";
    for (i = 0; i < questionArray.length; i++) {
      resultBody += questionArray[i].id + ". " + questionArray[i].question + "<br>";
      if (questionArray[i].type === "checkBox"){
        var answer = questionArray[i].answer.join(', ');
        resultBody += "<span class='glyphicon glyphicon-hand-right'></span> " + answer;
      } else {
        resultBody += "<span class='glyphicon glyphicon-hand-right'></span> " + questionArray[i].answer;
      }
      resultBody += "<br><br>";
    }
    
    showResultBody.innerHTML = resultBody;

  };
}); 
