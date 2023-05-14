var app = angular.module("CodePlaygroundApp", []);
app.controller("CodePlaygroundAppCtrl", function ($scope, $timeout, $window) {
  var c = this;

  c.lsName = "codePlayground";

  c.showHistory = false;
  c.historyClass = 'hide';

  c.hideHistory = function(ev){
    c.showHistory = false;
    c.historyClass = 'hide';
  }

  c.toggleHistory = function(){
    if(c.showHistory){
      c.historyClass = 'hide';
    } else {
      c.historyClass = 'show';
    }
    c.showHistory = !c.showHistory;
  }

  c.clearHistory = function(){
    if(localStorage.length > 0){
      localStorage.clear();
    }
    c.getHistory();
    c.hideHistory();
  }
 
  c.saveHistory = function () {
    if(c.codeHistory.length == 0){
      return false;
    }
    var codeHistory = JSON.stringify(c.codeHistory);
    localStorage.setItem(c.lsName, codeHistory);
  };

  c.addHistory = function(item){
    if(!item){return false;}
    var nowMS = new Date().getTime();
    c.codeHistory.push({name: nowMS, value: item});
  }

  c.getHistory = function(){
    var codeHistory = localStorage.getItem(c.lsName);
      historyObj = JSON.parse(codeHistory);
    if (codeHistory) {
      c.codeHistory = historyObj;
    } else {
      c.codeHistory = [];
    }
  }

  c.loadHistory = function(name){
    console.log('loading history');
    var item = c.codeHistory.find(function(el){
      return el.name == name;
    });
    if(item){
      c.htmlEditor.getDoc().setValue(item.value);
    }
  }

  $timeout(c.getHistory, 0);


  c.htmlEditor = CodeMirror(document.querySelector("#editor"), {
    mode: "javascript",
    tabSize: 4,
    lineNumbers: true,
    lineWrapping: true,
    extraKeys: { "Shift-Ctrl-Space": "autocomplete" },
    keyMap: "macSublime",
    dragDrop: true,
    smartIndent: true,
    spellcheck: true,
    autocorrect: true,
    rulers: true,
    foldGutter: true,
    gutters: ["CodeMirror-lint-markers"],
    lint: { options: { esversion: 2021 } },
  });

$window.htmlEditor = c.htmlEditor;

  CodeMirror.commands["selectAll"](c.htmlEditor);



  document.querySelector("#run-button").addEventListener("click", function () {
    let htmlCode = c.htmlEditor.getValue();
    c.addHistory(htmlCode);
    c.saveHistory();
    let results = evalTheCode(htmlCode);
    let consoleElement = document.querySelector("#results");
    consoleElement.innerText = results.value;
    consoleElement.className = "";
    consoleElement.classList.add(results.status);
  });

  document
    .querySelector("#clear-results")
    .addEventListener("click", function () {
      let consoleElement = document.querySelector("#results");
      consoleElement.innerText = "";
    });
  document
    .querySelector("#clear-console")
    .addEventListener("click", function () {
      console.clear();
    });

  document.querySelector("#editor").onkeydown = triggerEnterKey;

  function triggerEnterKey(event) {
    if (event.key =="Enter" && event.shiftKey) {
      event.preventDefault();
      document.querySelector("#run-button").click();
    }
  }

  function evalTheCode(htmlCode) {
    var res = { value: undefined, status: undefined };
    try {
      res.value = eval(htmlCode);
      res.status = "success";
    } catch (e) {
      res.value = e;
      res.status = "error";
    }
    return res;
  }
});
