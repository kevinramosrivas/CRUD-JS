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
        this.createRow(todo);

    }
    //la funcion toggleCompleted solo existe para llamar a la funcion
    //del mismo nombre en el modelo desde esta vista
    toggleCompleted(id){
        this.model.toggleCompleted(id);
    }
    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }
    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id',todo.id);
        //esta es una cadena formateada
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
            </td>
            <td class="text-right">
              <button class="btn btn-primary mb-1">
                <i class="fa fa-pencil"></i>
              </button>
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn','btn-danger','mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';


        removeBtn.onclick = () => {
          this.removeTodo(todo.id);
        }
        //en la tabla añadimos en la tercera columna al boton de borar
        row.children[3].appendChild(removeBtn);
    }
}