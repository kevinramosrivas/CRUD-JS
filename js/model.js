export default class Model{
    constructor(){
        this.view=null;
        this.todos=[];
        this.currentId = 1;
    }

    setView(view){
        this.view = view;
    }

    getTodos(){
        return this.todos;
    }

    addTodo(title,description){
        const todo = {
            id:this.currentId++,
            title,
            description,
            completed:false,
        }

        this.todos.push(todo);
        console.log(this.todos);

        //estamos retornando un clon para que nadie toque el modelo
        //con ... hacemos una copia del objeto para mandarlo a la vista
        return {...todo};
    }
    findTodo(id){
        return this.todos.findIndex((todo)=>todo.id === id);
    }
    removeTodo(id){
        //con esto eliminamos ese indice del array
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
    }
    toggleCompleted (id){
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed =! todo.completed;
        console.log(this.todos);
    }
}