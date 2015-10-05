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
    console.log('currentArr',currentArr);
    currentQuestionArr = currentArr.getQuestionArr();

    console.log('currentQuestionArrxxx',typeof currentQuestionArr);
    

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
        displayQuestionR(currentQuestionArr, qDisplay);
      }
      if (qType.value === 'checkBox'){    
        
        var checkArry = new CheckBox(questionId, question.value, optionsArr);
        currentQuestionArr.push(checkArry);
        displayQuestionC(currentQuestionArr);


      }
      if (qType.value === 'dropDown'){    
        var dropArry = new DropDown(questionId, question.value, optionsArr);
        currentQuestionArr.push(dropArry);
        displayQuestionD(currentQuestionArr, qDisplay);
      }
    }    

    if (qType.value === 'openEnd'){  
      var openArry = new OpenEnd(questionId, question.value);
      currentQuestionArr.push(openArry);
      displayQuestionO(currentQuestionArr, qDisplay);
    }  

    questionId++;

    //reset form fields
    document.getElementById('question').value ="";
    document.getElementById('qType').value="default";
    for (var j=1; j <= optionNum; j++){
      document.getElementById('option'+j).value = "";
    } 

    //Show 'Take a Survey button' if any quesiton has created
    if (surveyArr[0].qArr)
      document.getElementById('takeSurveyBtn').style.display="inline";


console.log('surveyArr',surveyArr);
  }

  function displayQuestionR(optArr, displayDiv){
    innerDiv = document.createElement('div');
    idName = "question" + optArr.qArr.id;
    innerDiv.id=idName;

    displayDiv.appendChild(innerDiv); 
    showoptArr = optArr.qArr.optionsArr;
    var inputRadio="<p>" + optArr.qArr.id+". " + optArr.qArr.question + "<br>";
    for(i=0;i<showoptArr.length;i++){
    inputRadio += "<input id='showoptArr[i]' name='radioB' type='radio'> " + showoptArr[i]+"<br>";
    }
    document.getElementById(idName).innerHTML = inputRadio;
  }

  function displayQuestionC(optArr){
    //get last item in question array
    var curIndex = optArr.length-1;
    var innerDiv=document.createElement('div');
    idName = "question" + optArr[curIndex].id;
    innerDiv.id=idName;

    document.getElementById('qDisplay').appendChild(innerDiv); 
    showoptArr = optArr[curIndex].optionsArr;
    var inputCheck = "<p>" + optArr[curIndex].id+". " + optArr[curIndex].question + "<br>";

    for(i=0;i<showoptArr.length;i++) {
      inputCheck += "<input id='"+showoptArr[i]+"' name='checkB' type='checkbox'> " + showoptArr[i] + "<br>";
    }
    document.getElementById(idName).innerHTML = inputCheck;
  }

  function displayQuestionD(optArr, displayDiv){
    innerDiv = document.createElement('div');
    idName = "question" + optArr.qArr.id;
    innerDiv.id=idName;
    qDisplay.appendChild(innerDiv); 

    showoptArr = optArr.qArr.optionsArr;
    var inputDrop = "<p>" + optArr.qArr.id +". "+ optArr.qArr.question + "<br>";

    inputDrop+="<select style='margin:10px' id='showoptArr[i]' style='margin:10px'>";
    inputDrop += "<option value='default'>----</option>";
    for(i=0; i<showoptArr.length; i++){
    inputDrop += "<option value='showoptArr[i]'>" + showoptArr[i]+"</option>";
    }
    inputDrop+="</select>";
    document.getElementById(idName).innerHTML=inputDrop;
  }

  function displayQuestionO(optArr, displayDiv){
    innerDiv = document.createElement('div');
    idName = "question" + optArr.qArr.id;
    innerDiv.id=idName;
    displayDiv.appendChild(innerDiv); 
    showoptArr = optArr.qArr.optionsArr;
    var inputText = "<p>"+ optArr.qArr.id +". " + optArr.qArr.question + "<br>";
    inputText+="<input type='text'>";
    document.getElementById(idName).innerHTML = inputText;
  }

  function takeSurvey(){ 
    if (qType.value !== "default" || question.value !== "")
      confirm("Are you sure not to finish creating the survey first?");

    document.getElementById("createQuestions").style.display = "none"; 
    document.getElementById("showSurvey").style.display = "block"; 

    console.log("surveyArr",surveyArr);
    console.log("surveyArr",surveyArr[0]);

    // innerDiv = document.createElement('div');

    // showSurveyDisplay.

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
