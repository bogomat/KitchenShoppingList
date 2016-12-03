define('TodoServices', [], function() {

    var RowIdMap = new Map();
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
            object = object || {};
            object.id = object.id || 0;
            object.value = object.value || '';
            object.done = object.done || false;
            var destElt = wgtBody.querySelector('.container');
            var that = this;
            var rowElt = document.createElement("div");
            var inputRowElt = document.createElement("input");
            var deleteButonElt = document.createElement("button");
            var checkyElt = document.createElement("input");
            checkyElt.type = "checkbox";
            checkyElt.classList.add('done');
            checkyElt.checked = object.done;
            inputRowElt.classList.add('RowInput');

            /*
                        checkAllElt.addEventListener('click',function() {
                            checkyElt.checked=checkAllElt.checked;
                        });*/
            deleteButonElt.innerHTML = '-';
            inputRowElt.value = object.value;

            rowElt.appendChild(checkyElt);
            rowElt.appendChild(inputRowElt);
            rowElt.appendChild(deleteButonElt);
            if (destElt.childElementCount) {
                destElt.insertBefore(rowElt, destElt.firstElementChild);
            } else {
                destElt.appendChild(rowElt);
            }
            RowIdMap.set(rowElt, object.id);
            deleteButonElt.addEventListener('click', function(e) {
                var parent = e.currentTarget.parentNode;

                that.deleteLine(parent);
            });
            console.log(RowIdMap);
        },

        deleteLine: function(parent) {

            var that = this;
            var id = RowIdMap.get(parent);
            var localurl = that.url + '/' + id;
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', localurl, true);

            xhr.onload = function() {
                // Request finished. Do processing here.
                    that.removeLine(parent);
            };
            xhr.send();


        }



    };

    return todoService;

});
