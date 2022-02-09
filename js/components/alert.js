export default class Alert{
    //especificamos que alert quieren que usemos por el id
    constructor(alertId){
        this.alert = document.getElementById(alertId);
    }
    show(message){
        this.alert.classList.remove('d-none');
        this.alert.innerText = message;
    }
    hide(){
        this.alert.classList.add('d-none');
    }
}