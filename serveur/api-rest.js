// API Restful
// Lister : GET /api/v1.0/todos
// Afficher : GET /api/v1.0/todos/113
// Ajouter : POST /api/v1.0/todos
// Supprimer : DELETE /api/v1.0/todos/2426
// Mettre à jour : PUT /api/v1.0/todos/2467

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var server = express();
server.use(cors());

var todos = [{
    value: 'Acheter du pain',
    done: false,
    id: 214
}, {
    value: 'Utiliser le DOM',
    done: true,
    id: 346
}];

// lister
server.get('/api/v1.0/todos', function(req, res) {
    res.json(todos);
});

// ajouter
// header (Content-Type: application/json)
server.post('/api/v1.0/todos', bodyParser.json(), function(req, res) {
    var todo = req.body;

    todo.id = todos[todos.length-1].id + 1;

    todos.push(todo);

    res.statusCode = 201;
    res.json(todo);
});

// afficher
server.get('/api/v1.0/todos/:id', function(req, res) {
    var idToFind=Number(req.params.id);
    var toget = todos.find(function (a) {
        return a.id===idToFind;
    });
    if (toget) {
        res.statusCode=201;
        res.json(toget);
    } else {
        res.statusCode=406;
        res.end();
    }
});

server.delete('/api/v1.0/todos/:id', function(req, res) {
    var idToFind=Number(req.params.id);
    var index = todos.findIndex(function (a) {
        return a.id===idToFind;
    });
    console.log('index:',index);
    if (index === -1) {
        res.statusCode=406;
        res.json('error');
    } else {
        var sliced = todos.splice(index,1);
        res.json(sliced[0]);
    }
});

server.listen(8080, function() {
    console.log('Le serveur est démarré');
});
