define('TodoServices', ['ShoppingLine'], function(ShoppingLine) {

    var RowArray = [];
    'use strict';
    var todoService = {

        url: 'http://localhost:8080/api/v1.0/Todos',
        postLine: function(wgtBody, object) {
            var that = this;
            object = object || {};
            object.value = object.value || '';
            if(true != object.done)
              object.done = false;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', that.url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {
                // Request finished. Do processing here.
                var returnObject = JSON.parse(xhr.responseText);
                that.addLine(wgtBody, returnObject);
            };
            var data = JSON.stringify(object);
            xhr.send(data);
        },
        addLine: function(wgtBody, object) {
            var destElt = wgtBody.querySelector('.container');
            var rowElt = new ShoppingLine();
            rowElt.id = object.id;
            rowElt.build();
            if (destElt.childElementCount) {
                destElt.insertBefore(rowElt.div, destElt.firstElementChild);
            } else {
                destElt.appendChild(rowElt.div);
            }
        },

        deleteLine: function(parent) {

            var that = this;
            var line = RowArray.find(function(a) {
              a.div === parent;
            });
            var id =line.id;
            var localurl = that.url + '/' + id;
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', localurl, true);

            xhr.onload = function() {
                // Request finished. Do processing here.
                    that.removeLine(parent);
            };
            xhr.send();
        },
        setCheck : function (parent,done) {
          var line = RowArray.find(function(a) {
            a.div === parent;
          });
          var id =line.id;
          var localurl = this.url + '/' + id;
          var xhr = new XMLHttpRequest();
          xhr.open('PUT', localurl, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          var data = JSON.stringify({'done': done});
          xhr.send(data);

        },



    };

    return todoService;

});
