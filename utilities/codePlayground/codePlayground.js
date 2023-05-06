var htmlEditor = CodeMirror(
    document.querySelector("#editor"),
    {
      mode: "javascript",
      tabSize: 4,
      lineNumbers: true,
      //extraKeys: { "Ctrl-Space": "autocomplete" },
    }
  );


  CodeMirror.commands["selectAll"](htmlEditor);

  function getSelectedRange() {
    return {
      from: htmlEditor.getCursor(true),
      to: htmlEditor.getCursor(false),
    };
  }

  function autoFormatSelection() {
    var range = getSelectedRange();
    htmlEditor.autoFormatRange(range.from, range.to);
  }

  function commentSelection(isComment) {
    var range = getSelectedRange(),
      selStart = htmlEditor.getCursor("start");
    htmlEditor.commentRange(isComment, range.from, range.to);
    htmlEditor.setSelection(selStart, htmlEditor.getCursor("end"));
  }
  document.querySelector("#run-btn").addEventListener("click", function () {
    let htmlCode = htmlEditor.getValue();

    let results = evalTheCode(htmlCode);

    let previewWindow = document.querySelector("#preview-window");
    previewWindow.innerText = results;
  });


  document.querySelector("#editor").onkeydown = triggerEnterKey


function triggerEnterKey(event){
  console.log(event);
    if (event.keyCode === 13 && event.metaKey) {
        document.querySelector("#run-btn").click();
    }
}

function evalTheCode(htmlCode) {
    console.log(htmlCode);
  var res = "";
  try {
    res = eval(htmlCode);
  } catch (e) {
    res = e;
  }
  console.log(res);
  return res;
}