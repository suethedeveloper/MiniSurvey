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

  function creatSurvey(){
    var surveyName = document.getElementById("surveyName");
    if (surveyName.value === ""){
      alert("Please enter survey title");
      return false;
    }

    surveyId++;
    surveyName = surveyName.value;
    var newSurvey = new Survey(surveyId,surveyName);
    surveyArr.push(newSurvey);
    document.getElementById("createSurveyTitle").style.display = "none";
    document.getElementById("surveyHeader").innerHTML = surveyName;
    document.getElementById("createQuestions").style.display = "block"; 
  }

  //After a user click 'Create', show options dropdown for question type
  function showOption() {
    // var qType = document.getElementById('qType').value;
    // document.getElementById('question').value = "";
    
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
    if (document.getElementById('option1').value === "" || document.getElementById('option2').value === ""){
      alert( "Please fill multi choice option first!" );
      return false;
    } 
    inputOptionName = "option" + optionNum;
    if (optionNum > 2){
      if (document.getElementById(inputOptionName).value === ""){
        alert( "Please fill multi choice option first!" );
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
    currentQuestionArr = surveyArr[surveyArr.length-1]; //get newly created survey object

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
        currentQuestionArr.qArr = radioArry;
        displayQuestionR(currentQuestionArr);
      }
      if (qType.value === 'checkBox'){    
        var checkArry = new CheckBox(questionId, question.value, optionsArr);
        currentQuestionArr.qArr = checkArry;
        displayQuestionC(currentQuestionArr);
      }
      if (qType.value === 'dropDown'){    
        var dropArry = new DropDown(questionId, question.value, optionsArr);
        currentQuestionArr.qArr = dropArry;
        displayQuestionD(currentQuestionArr);
      }
    }    

    if (qType.value === 'openEnd'){  
      console.log('questionId',questionId, 'question.value',question.value);
      var openArry = new OpenEnd(questionId, question.value);
      currentQuestionArr.qArr = openArry;
      displayQuestionO(currentQuestionArr);
    }  

    questionId++;

    //reset form fields
    document.getElementById('question').value ="";
    document.getElementById('qType').value="default";
    for (var j=1; j <= optionNum; j++){
      document.getElementById('option'+j).value = "";
    }  
  }

  function displayQuestionR(optArr){
    var innerDiv=document.createElement('div');
    var idName="question" + optArr.qArr.id;
    innerDiv.id=idName;

    document.getElementById('qDisplay').appendChild(innerDiv); 
    var showoptArr = optArr.qArr.optionsArr;
      var inputRadio="<p>" + optArr.qArr.id+". " + optArr.qArr.question + "<br>";
    for(i=0;i<showoptArr.length;i++){
    inputRadio += "<input id='showoptArr[i]' name='radioB' type='radio'> " + showoptArr[i]+"<br>";
    }
    document.getElementById(idName).innerHTML = inputRadio;
  }

  function displayQuestionC(optArr){
    var innerDiv=document.createElement('div');
    var idName="question" + optArr.qArr.id;
    innerDiv.id=idName;

    document.getElementById('qDisplay').appendChild(innerDiv); 
    var showoptArr = optArr.qArr.optionsArr;
      var inputCheck="<p>" + optArr.qArr.id+". " + optArr.qArr.question + "<br>";
    for(i=0;i<showoptArr.length;i++){
    inputCheck += "<input id='showoptArr[i]' name='checkB' type='checkbox'> " + showoptArr[i]+"<br>";
    }
    document.getElementById(idName).innerHTML = inputCheck;
  }

  function displayQuestionD(optArr){
    var innerDiv=document.createElement('div');
    var idName="question" + optArr.qArr.id;
    innerDiv.id=idName;

    document.getElementById('qDisplay').appendChild(innerDiv); 

    var showoptArr = optArr.qArr.optionsArr;
    var inputDrop="<p style='margin:10px'>" + optArr.qArr.id +". "+ optArr.qArr.question + "<br>";

    inputDrop+="<select style='margin:10px' id='showoptArr[i]' style='margin:10px'>";
    inputDrop += "<option value='default'>----</option>";
    for(i=0; i<showoptArr.length; i++){
    inputDrop += "<option value='showoptArr[i]'>" + showoptArr[i]+"</option>";
    }
    inputDrop+="</select>";
    document.getElementById(idName).innerHTML=inputDrop;
  }

  function displayQuestionO(optArr){
    console.log('open');
    var innerDiv=document.createElement('div');
    console.log('innerDiv',innerDiv);
    var idName="question" + optArr.qArr.id;
    console.log('idName',idName);
    innerDiv.id=idName;

    document.getElementById('qDisplay').appendChild(innerDiv); 
    var showoptArr = optArr.qArr.optionsArr;
    var inputText="<p>"+ optArr.qArr.id +". " + optArr.qArr.question + "<br>";
    inputText+="<input type='text'>";
    document.getElementById(idName).innerHTML = inputText;
  }

  function takeSurvey(){ 
    if (qType.value === "default") {
      alert("Please Select Question Type.");
      qType.focus();
      return false;
    }  
    if (document.getElementById('question').value === "") {
      alert("What question do you want to ask?");
      document.getElementById('question').focus();
      return false;
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

  // var checkSurvey = function() {
  //   if (qType.value === "default") {  
  //     qTypeHeader.className += ' error';

  //     qType.focus();
  //     return false;
  //   } else {
  //     qTypeHeader.className -= ' error';
  //   }

  //   if (question.value === "") {    
  //     if(qHeader) 
  //       qHeader.className += ' error';

  //     question.focus();
  //     return false;
  //   } else {
  //     qHeader.className -= ' error';
  //   }
  // };

// });
