import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';
export default class View{
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');

        this.addTodoForm = new AddTodo();
        this.modal  = new Modal();
        //pasamos el addtodo como funcion flecha ya que si simplemente ponemos this addTodo se
        //va a confundir por eso lo hacemos asi, una funcion que recibe el titulo y la description
        // y invocamos a la funcion addTodo
        this.addTodoForm.onclick((tittle,description) => this.addTodo(tittle,description));
        //le decimos a addTodoForm cuanda exista un click que la funcion que definimos dentro
        // de los parentesis se la pase a callback y esta callback como le pasamos la addTodo
        // nos manda los datos al modelo
        this.modal.onClick((id,values) => this.editTodo(id,values));
    }
    setModel(model){
        this.model = model;
    }
    render(){
        const todos = this.model.getTodos();
        todos.forEach((todo) => this.createRow(todo));
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

    editTodo(id,values){
        this.model.editTodo(id,values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;

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
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn','btn-primary','mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target','#modal');
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked,
        });
        row.children[3].appendChild(editBtn);


        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn','btn-danger','mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => {this.removeTodo(todo.id);}
        //en la tabla añadimos en la tercera columna al boton de borar
        row.children[3].appendChild(removeBtn);
    }
}