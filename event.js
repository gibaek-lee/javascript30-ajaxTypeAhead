var inputBoxNode = document.getElementById('inputBox');
var responseData;

inputBoxNode.addEventListener("focus",function(e){
  this.value='';
});

inputBoxNode.addEventListener("keydown",function(e){//keyup 사용하면 현재 눌려진 값까지 e.key에서 받아옴
  var inputText = '';
  //confirm input text -> this.value 사용하면 keyCode 설정할 필요 없다
  if(e.keyCode>=65 && e.keyCode<=90){inputText = e.target.value+e.key;}//alphabet
  else if(e.keyCode===8 && e.target.value){inputText = e.target.value.slice(0,e.target.value.length-1);}//delete
  else{ return; }
  console.log("current input text: " + inputText);

  //make regular expression
  if(inputText)var re = new RegExp(inputText,"gi");
  console.log("regular expression: " + re);

  //remove old children
  var resultBoxNodes = document.getElementById('resultBox');
  var numOfChildNodes = resultBoxNodes.childElementCount;
  for(var i=numOfChildNodes-1; i>=0; i--){
    resultBoxNodes.removeChild(resultBoxNodes.children[i]);
  }

  //create new children
  if(re){
    for(var j=0;j<responseData.length;j++){
      var cityResp = responseData[j].city;
      var stateResp = responseData[j].state;
      var populationResp = responseData[j].population;
      //if(re.test(responseData[j].city) || re.test(responseData[j].state)){
      if(re.test(cityResp) || re.test(stateResp)){
        //var cityExec = re.exec(responseData[j].city);
        var cityExec = re.exec(cityResp);
        //var stateExec = re.exec(responseData[j].state);
        var stateExec = re.exec(stateResp);
        console.log("response item - city: " + cityResp + ", state: " + stateResp + ", population: " + populationResp);
        console.log("executed word - city: " + cityExec + ", state: " + stateExec);
        resultBoxChildFactory(resultBoxNodes,responseData[j]);
      }
    }
  }
});

//result box factory
function resultBoxChildFactory(grandParentNode,currentData){
  //generate
  var parentNode = document.createElement("div");
  var childNode1 = document.createElement("span");//flex 적용 위해 id 넣기
  var childNode2 = document.createElement("span");//flex 적용 위해 id 넣기
  childNode1.textContent = currentData.city + ', ' + currentData.state;
  childNode2.textContent = currentData.population;
  parentNode.id = "infoBox";
  childNode1.className = "cityStateInfo";
  childNode2.className = "populationInfo";
  parentNode.appendChild(childNode1);
  parentNode.appendChild(childNode2);
  //append
  grandParentNode.appendChild(parentNode);
}

//http get request
(function getData(){
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', endpoint, true);
  xhttp.send();
  xhttp.onload = function() {
    if (this.status === 200) {
      responseData = JSON.parse(this.responseText);
      //responseData = Array.prototype.slice.call(responseData, 0, 5);
      console.log(responseData);
    }
    else {
      alert('Request failed.  Returned status of ' + xhttp.status);
    }
  };
})();
