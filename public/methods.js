function todoOnSubmit(event) {
    event.preventDefault();
    let text = $('#txtName').val();
    let startTime = $('#timeStart').val();
    let duration = $('#numDuration').val();
    let todo = {
        index: model.todos.length + 1,
        text,
        startTime,
        duration
    };
    $.post('/todo', todo, function(data) {
        model.todos.push(data); // putting this line is here, reassures us that the data is send by server
    }).fail(function(err) {
        console.log(err);
        alert('riiiidii');
    }); //.fail runs when post doesnt come successful
}

function loadTodos() {
    $.get('/todo', function(data) {
        //console.log(data);
        model.todos = data;
    });
}

function removeTodo(todo) {
    console.log(todo);
    $.ajax({
        url: '/todo',
        contentType: 'application/json',
        data: JSON.stringify(todo),
        method: 'delete'
    }).done(function() {
        loadTodos();
    }).fail(function(err) {
        console.log(err);
        alert('removing failed!');
    });
}

function updateTodo(oldText, newText) {
    $.ajax({
        url: 'todo',
        contentType: 'application/json',
        data: JSON.stringify({ oldText, newText }),
        method: 'put'
    }).done(function() {
        loadTodos();
    }).fail(function(err) {
        console.log(err);
        alert('riiiiid');

    });

}