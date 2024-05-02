import axios from "axios";
import React from "react";

const TodosList = ({todos, setTodos, setEditTodo}) => {
    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id){
                    return { ...item, completed: !item.completed };
                }
                return item;
            })
        );
    };

    axios.get("http://localhost:8080/todos")
    .then((response) => {
        setTodos(response.data)
    })

    const handleEdit = ({id}) => {
        const findTodo = todos.find ((todo) => todo.id === id);
        setEditTodo(findTodo);
    };

    const handleDelete = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !==id));
    };

    const preventTyping = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            {todos.map((todo) => (
                <li className="list-item" key={todo.id}>
                    {/* <p className="list">{todo.task}</p> */}
                    <input
                        type="text"
                        value={todo.task}
                        className={`list ${todo.completed ? "complete" : ""}`}
                        onChange={preventTyping}
                    />
                    <div>
                        <button className="button-complete task-button" onClick={() => handleComplete(todo)}>
                            <i className="fa fa-check-circle"></i>
                        </button>
                        <button className="button-edit task-button" onClick={() => handleEdit(todo)}>
                            <i className="fa fa-edit"></i>
                        </button>
                        <button className="button-delete task-button" onClick={() => handleDelete(todo)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </li>
            ))}
        </div>
    );
};

export default TodosList;