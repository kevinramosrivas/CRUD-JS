export default class addTodo{
    constructor(){
        this.btn = document.getElementById('add');
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
    }
    onclick(callback){
        this.btn.onclick = () =>{
            if(title.value === '' || description.value === ''){
                // alert.classList.remove('d-none');
                // alert.innerText = 'Title and description required';
                // return;
                console.error('incorrecto');
            }
            else{
                callback(this.title.value, this.description.value);
            }
        }
    }
}