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



async function carregarGastosCategoria(){

    try{


        const token = localStorage.getItem('token');


        const resposta = await fetch('/api/transacoes',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });



        const dados = await resposta.json();



        const transacoes =
        dados.transacoes || [];



        // pega somente gastos

        const gastos =
        transacoes.filter(
            t=>t.tipo === "despesa"
        );



        const categorias = {};



        gastos.forEach(gasto=>{


            if(!categorias[gasto.categoria]){

                categorias[gasto.categoria]=0;

            }


            categorias[gasto.categoria]
            += Number(gasto.valor);


        });



        criarPizza(categorias);


    }catch(erro){

        console.error(
            "Erro gráfico:",
            erro
        );

    }

}

function criarPizza(categorias){


const cores=[

"#73002f",
"#a32252",
"#cbf29a",
"#f0f7ec",
"#ff8e8b"

];



const total =
Object.values(categorias)
.reduce(
(a,b)=>a+b,
0
);



let inicio = 0;

let partes=[];



const lista =
Object.entries(categorias)
.sort((a,b)=>b[1]-a[1]);



lista.forEach((item,index)=>{


const valor = item[1];


const porcentagem =
(valor / total) * 100;



const fim =
inicio + porcentagem;



partes.push(
`${cores[index]} ${inicio}% ${fim}%`
);



inicio=fim;



});





const pizza =
document.getElementById(
'graficoPizza'
);



if(pizza){

pizza.style.background =
`conic-gradient(${partes.join(",")})`;

}




// atualiza legenda

const linhas =
document.querySelectorAll(
'.item-legenda'
);



lista.slice(0,5)
.forEach((item,index)=>{


linhas[index]
.querySelector('.dot')
.style.background =
cores[index];



linhas[index]
.querySelector('.nome')
.textContent =
item[0];



linhas[index]
.querySelector('.valor')
.textContent =
formatarMoeda(item[1]);



});



}

function criarPizza(categorias){


const cores=[

"#73002f",
"#a32252",
"#cbf29a",
"#f0f7ec",
"#ff8e8b"

];



const total =
Object.values(categorias)
.reduce(
(a,b)=>a+b,
0
);



let inicio = 0;

let partes=[];



const lista =
Object.entries(categorias)
.sort((a,b)=>b[1]-a[1]);



lista.forEach((item,index)=>{


const valor = item[1];


const porcentagem =
(valor / total) * 100;



const fim =
inicio + porcentagem;



partes.push(
`${cores[index]} ${inicio}% ${fim}%`
);



inicio=fim;



});





const pizza =
document.getElementById(
'graficoPizza'
);



if(pizza){

pizza.style.background =
`conic-gradient(${partes.join(",")})`;

}




// atualiza legenda

const linhas =
document.querySelectorAll(
'.item-legenda'
);



lista.slice(0,5)
.forEach((item,index)=>{


linhas[index]
.querySelector('.dot')
.style.background =
cores[index];



linhas[index]
.querySelector('.nome')
.textContent =
item[0];



linhas[index]
.querySelector('.valor')
.textContent =
formatarMoeda(item[1]);



});

}

function formatarMoeda(valor){

return Number(valor)
.toLocaleString(
'pt-BR',
{
style:'currency',
currency:'BRL'
}
);

}


document.addEventListener( 
    'DOMContentLoaded', ()=>{ carregarSaldo(); carregarGastosCategoria();;}
);