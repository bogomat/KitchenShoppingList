define('ShoppingLine',['ServerConfig'],function (ServerConfig) {

  function shoppingLine (lineParam) {
    lineParam = lineParam || {};

    this.id = lineParam.id || 0;
    this.value =  lineParam.value || '';
    this.done =lineParam.done || false;;
    this.div = {};
    this.doneElt = {};
    this.deleteElt = {};
    this.inputElt = {};

  };
  shoppingLine.prototype.build = function () {
    var that = this;
    var rowElt = document.createElement("div");
    var inputRowElt = document.createElement("input");
    var deleteButonElt = document.createElement("button");
    var checkyElt = document.createElement("input");
    checkyElt.type = "checkbox";
    checkyElt.classList.add('done');
    checkyElt.checked = this.done;
    inputRowElt.classList.add('RowInput');

    deleteButonElt.innerHTML = '-';
    inputRowElt.value = this.value;

    rowElt.appendChild(checkyElt);
    rowElt.appendChild(inputRowElt);
    rowElt.appendChild(deleteButonElt);
    this.div = rowElt;
    this.doneElt = checkyElt;
    this.deleteElt = deleteButonElt;
    this.inputElt = inputRowElt;

    
    checkyElt.addEventListener('click', function(e) {
      var parent = e.currentTarget.parentNode;
      that.done=e.currentTarget.checked;
      that.put();
    });
  };
  shoppingLine.prototype.put = function(){
    var localurl = ServerConfig.url + '/' + this.id;
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', localurl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify({'done': this.done,'value':this.value});
    xhr.send(data);
  }
  shoppingLine.prototype.setCheck = function(checked){
    checked = checked || false;
    this.done=checked;
    this.doneElt.checked = checked;
    this.put();
  }

  return shoppingLine;
});
