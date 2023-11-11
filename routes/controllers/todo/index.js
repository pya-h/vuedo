const path = require('path');
const fileSystem = require('fs'); //file-system to read write model file
const modelPath = path.resolve(__dirname, '../../model/todos.json');

const saveTodo = (res, todo) => {
    // read model file

    fileSystem.readFile(modelPath, (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        // conver data to js object
        objData = JSON.parse(data);
        objData.push(todo);
        // convert js object to json string
        data = JSON.stringify(objData);
        // update the model file
        fileSystem.writeFile(modelPath, data, err => {
            if (err) { // err 500 : server side fault
                res.status(500).send(err);
                return;
            }
            res.send(todo);
        })
    });
};

const control = {
    fetch: (req, res) => {
        fileSystem.readFile(modelPath, (err, data) => {
            if (err) {
                res.status(500).send(err);
                console.log(err);
                return;
            }
            data = JSON.parse(data);
            res.send(data);
        });
    },

    add: (req, res) => {
        const newTodo = req.body;
        if (!newTodo) {
            res.status(400).send({ message: 'todo is empty' })
        }
        console.log(newTodo);
        saveTodo(res, newTodo);
    },

    remove: (req, res) => {
        const todo = req.body; // get the json sent to the delete method

        fileSystem.readFile(modelPath, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
            let objTodos = JSON.parse(data);
            objTodos = objTodos.filter(item => item.index !== todo.index); //remove selected item
            console.table(objTodos);
            data = JSON.stringify(objTodos);
            fileSystem.writeFile(modelPath, data, err => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                    return;
                }
                res.end(); // declare method ended successfullt;
            });

        })
    },

    update: (req, res) => {
        const { oldText, newText } = req.body;
        let updated = [];
        fileSystem.readFile(modelPath, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
            let objTodos = JSON.parse(data);
            objTodos.forEach((element, i) => {
                if (element.text === oldText) {
                    objTodos[i].text = newText;
                    updated.push(element);
                }
            });
            console.table(objTodos);
            data = JSON.stringify(objTodos);
            fileSystem.writeFile(modelPath, data, err => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                    return;
                }
                res.send(updated);
            });
        })
    }
}

module.exports = control;