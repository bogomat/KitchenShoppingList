define('ListeCourses', ['ShoppingLine'], function(ShoppingLine) {
    'use strict';
    var ListeCourses = function(wgtBody) {
        this.LineList = [];
        this.div = wgtBody;
        this.inputElt = wgtBody.querySelector('.todo');
        this.formElt = wgtBody.querySelector('.add-form');
        this.checkAllElt = wgtBody.querySelector('.checkall');
        this.url = 'http://localhost:8080/api/v1.0/Todos';
    }
    ListeCourses.prototype.init = function() {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.url, true);

        xhr.onload = function() {
            // Request finished. Do processing here.
            var todos = JSON.parse(xhr.responseText);
            todos.forEach(function(todo) {
                that.addLine(todo);
            });
        };

        xhr.send(null);
        this.checkAllElt.addEventListener('click', function(e) {
            that.LineList.forEach(function(line) {
                line.setCheck(e.currentTarget.checked);
            });

        });
        this.formElt.addEventListener('submit', function(e) {
            e.preventDefault();
            that.postLine({
                value: that.inputElt.value,
                done: that.checkAllElt.checked
            });
            that.inputElt.value = '';
        });
    }
    ListeCourses.prototype.addLine = function(lineParam) {
        var destElt = this.div.querySelector('.container');
        var rowElt = new ShoppingLine(lineParam, this);
        rowElt.build();
        if (destElt.childElementCount) {
            destElt.insertBefore(rowElt.div, destElt.firstElementChild);
        } else {
            destElt.appendChild(rowElt.div);
        }
        var that = this;
        rowElt.deleteElt.addEventListener('click', function(e) {
            var parent = e.currentTarget.parentNode;
            that.removeLine(parent);
        });
        this.LineList.push(rowElt);
    }
    ListeCourses.prototype.postLine = function(lineParam) {
        var that = this;
        lineParam = lineParam || {};
        var xhr = new XMLHttpRequest();
        xhr.open('POST', that.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            // Request finished. Do processing here.
            var returnObject = JSON.parse(xhr.responseText);
            that.addLine(returnObject);
        };
        var data = JSON.stringify(lineParam);
        xhr.send(data);
    }

    ListeCourses.prototype.removeLine = function(lineElement) {
        var shopLineIndex = this.LineList.findIndex(function(r){
          return r.div === lineElement;
        });
        var id =this.LineList[shopLineIndex].id;
        var localurl = this.url + '/' + id;
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', localurl, true);
        var that = this;

        xhr.onload = function() {
            // Request finished. Do processing here.
            lineElement.parentNode.removeChild(lineElement);
            that.LineList.splice(shopLineIndex,1)
        };
        xhr.send();
    }
    return ListeCourses;
});
