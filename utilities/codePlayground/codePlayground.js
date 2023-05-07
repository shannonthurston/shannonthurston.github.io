var htmlEditor = CodeMirror(
    document.querySelector("#editor"),
    {
      mode: "javascript",
      tabSize: 4,
      lineNumbers: true,
      lineWrapping: true,
      extraKeys: { "Shift-Ctrl-Space": "autocomplete" },
      keyMap: 'macSublime',
      dragDrop: true,
      smartIndent: true,
      spellcheck: true,
      autocorrect: true,
      rulers: true,
      foldGutter: true,
      gutters: ["CodeMirror-lint-markers"],
      lint: {options: {esversion: 2021}},

    }
  );


  CodeMirror.commands["selectAll"](htmlEditor);

 
  document.querySelector("#run-btn").addEventListener("click", function () {
    let htmlCode = htmlEditor.getValue();

    let results = evalTheCode(htmlCode);

    let previewWindow = document.querySelector("#preview-window");
    previewWindow.innerText = results;
  });


  document.querySelector("#editor").onkeydown = triggerEnterKey


function triggerEnterKey(event){
    if (event.keyCode === 13 && event.metaKey) {
        document.querySelector("#run-btn").click();
    }
}

function evalTheCode(htmlCode) {
  var res = "";
  try {
    res = eval(htmlCode);
  } catch (e) {
    res = e;
  }
  return res;
}