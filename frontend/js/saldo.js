async function carregarSaldo(){
    try {

        const token = localStorage.getItem('token');
        const resposta = await fetch('/api/saldo',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });


        if(!resposta.ok){
            console.log("Erro ao buscar saldo");
            return;
        }


        const dados = await resposta.json();


        console.log("Saldo recebido:", dados);


        const elementoSaldo = document.getElementById('saldo-valor');


        if(elementoSaldo){

            elementoSaldo.textContent =
                `R$ ${dados.saldo.toFixed(2).replace('.',',')}`;

        }


    } catch(erro){

        console.error("Erro saldo:", erro);

    }

}


document.addEventListener('DOMContentLoaded', carregarSaldo);