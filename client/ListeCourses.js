define('ListeCourses',['TodoServices'],function(TodoServices){
'use strict';
    var initList = function(wgtBody) {
        console.log("Hello World");
        var inputElt = wgtBody.querySelector('.todo');
        var formElt = wgtBody.querySelector('.add-form');
        var checkAllElt = wgtBody.querySelector('.checkall');

        var url = TodoServices.url;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
          // Request finished. Do processing here.
              var todos = JSON.parse(xhr.responseText);
              todos.forEach(function(todo) {
                  TodoServices.addLine(wgtBody, todo);
              });
        };

        xhr.send(null);

        checkAllElt.addEventListener('click', function(e) {
            var checkBoxes = wgtBody.querySelectorAll('.done');
            Array.prototype.forEach.call(checkBoxes, function(checkbox) {
                checkbox.checked = e.currentTarget.checked;
            });
        });
        formElt.addEventListener('submit', function(e) {
            e.preventDefault();

            TodoServices.postLine( wgtBody, {
                value: inputElt.value,
                done: checkAllElt.checked
            });
            inputElt.value = '';
        });
    };
    return initList;
});
