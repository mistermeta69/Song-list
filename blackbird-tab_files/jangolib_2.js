var pWidth = 0;
var speed = 2;
function getElementsByTagNames(list,obj) {
  if (!obj) var obj = document;
  var tagNames = list.split(',');
  var resultArray = new Array();
  for (var i=0;i<tagNames.length;i++) {
    var tags = obj.getElementsByTagName(tagNames[i]);
    for (var j=0;j<tags.length;j++) {
      resultArray.push(tags[j]);
    };
  };
  var testNode = resultArray[0];
  if(!testNode){
    return [];
  };
  if(testNode.sourceIndex){
    resultArray.sort(function(a,b){
      return a.sourceIndex - b.sourceIndex;
    });
  }else if(testNode.compareDocumentPosition){
    resultArray.sort(function(a,b){
      return 3 - (a.compareDocumentPosition(b) & 6);
    });
  };
  return resultArray;
}

function init(){
  var div = document.getElementById("marquee_replacement");
  div.style.overflow = 'hidden';

  var ps = getElementsByTagNames('p',div);
  for(var j=0;j<ps.length;j++){
    pWidth += ps[j].offsetWidth;
  }

  var startdiv = document.getElementById("start");
  startdiv.style.width = pWidth+'px';
  div.scrollLeft = 0;
  startit();
}

var go = 0;
var timeout = '';

function scrollFromBottom(){
  var el = document.getElementById("marquee_replacement");
  if(el.scrollLeft >= pWidth-1000){
    el.scrollLeft = 0;
  };
  el.scrollLeft = el.scrollLeft+speed;
  if(go == 0){
    timeout = setTimeout("scrollFromBottom()",50);
  };
}

function stop(){
  go = 1;
  timeout = '';
}

function startit(){
  go = 0;
  scrollFromBottom();
}