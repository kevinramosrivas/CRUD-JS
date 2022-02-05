import AddTodo from './components/add-todo.js'
export default class View{
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');

        this.addTodoForm = new AddTodo();

        //pasamos el addtodo como funcion flecha ya que si simplemente ponemos this addTodo se
        //va a confundir por eso lo hacemos asi, una funcion que recibe el titulo y la description
        // y invocamos a la funcion addTodo
        this.addTodoForm.onclick((tittle,description) => this.addTodo(tittle,description));
        //le decimos a addTodoForm cuanda exista un click que la funcion que definimos dentro
        // de los parentesis se la pase a callback y esta callback como le pasamos la addTodo
        // nos manda los datos al modelo
    }
    setModel(model){
        this.model = model;
    }
    addTodo(title, description){
        const todo = this.model.addTodo(title, description);

    }
}