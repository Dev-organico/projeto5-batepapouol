let nome = '';
let lista_mensagens = [];
let name_obj ={name:''}


function post_status(){

    nome = prompt('Seu lindo nome?')

    name_obj ={name : nome}

    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ',name_obj)

    promise.catch(name_error)

}

post_status()


setInterval(keep_status,5000)


function keep_status(){

    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status ',name_obj)


}


function name_error(erro){
    if(erro.response.status == 400){
        alert("esse nome de usuário já existe")
        post_status()
    }
    else{
        alert("erro")
    }
}


function get_message(){

    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

    promise.then(rend_msgs)
    //promise.catch


}

function rend_msgs(mensagens){

    let area_section = document.querySelector('section')
    lista_mensagens = mensagens.data
    console.log(mensagens.data)

    area_section.innerHTML = ''

    for(let i = 0; i < lista_mensagens.length;i++){
        let msgs = lista_mensagens[i]
        if(msgs.type === 'status'){
            area_section.innerHTML += `
            <li class="msg status" >
                <div class="time">(${msgs.time})</div>
                <div class="from"><span>${msgs.from}</span></div>
                <div class="text">${msgs.text}</div>
            </li>
        `
        }
        else if(msgs.type === 'message'){
            area_section.innerHTML += `
            <li class="msg message">
                <div class="time">(${msgs.time})</div>
                <div class="from"><span>${msgs.from}</span> para <span>${msgs.to}</span>:</div>
                <div class="text">${msgs.text}</div>
            </li>
            `
        }
        else if(msgs.type === 'private_message'){
            area_section.innerHTML += `
            <li class="msg private ">
                <div class="time">(${msgs.time})</div>
                <div class="from"><span>${msgs.from}</span> reservadamente para <span>${msgs.to}</span>:</div>
                <div class="text">${msgs.text}</div>
            </li>
            `
        }
    
        
        

        

    }
}

function roll_end(){

    const elemento_roll_to = document.querySelector('section').lastElementChild;
    elemento_roll_to.scrollIntoView();
}




function clicar(){

   

    let element_input = document.querySelector('input')

    let obj_msg = {
        from: nome,
	    to: "Todos",
	    text: element_input.value,
	    type: "message" 
    }

    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',obj_msg)

    element_input.value = ""

    roll_end()
}


get_message()

setInterval(get_message,3000)




    


