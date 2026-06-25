const API = '';


function fmt(v) {

    return new Intl.NumberFormat(
        'pt-BR',
        {
            style: 'currency',
            currency: 'BRL'
        }
    ).format(v);

}



async function salvarMeta() {


    const titulo =
        document.getElementById('titulo').value;


    const valorAlvo =
        parseFloat(
            document.getElementById('valorAlvo').value
        );


    const prazo =
        document.getElementById('prazo').value;



    const resposta =
        await fetch('/api/metas',
            {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}`
                },

                body: JSON.stringify({

                    titulo,
                    valorAlvo,
                    prazo

                })

            });


    const dados =
        await resposta.json();



    if (!resposta.ok) {

        alert(dados.erro);
        return;

    }


    alert("Meta criada!");

    carregarMetas();

}



async function carregarMetas() {


    const resposta =
        await fetch('/api/metas',
            {

                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}`
                }

            });


    const { metas } = await resposta.json();



    const lista =
        document.getElementById('listaMetas');


    lista.innerHTML = "";



    metas.forEach(meta => {


        const percentual =
            (meta.valor_atual / meta.valor_alvo) * 100;



        lista.innerHTML += `

            <div class="meta-card">

            <h2>${meta.titulo}</h2>

            <p>
            Objetivo:
            ${fmt(meta.valor_alvo)}
            </p>


            <p>
            Prazo:
            ${meta.prazo.substring(0, 10)}
            </p>



            <div class="barra">

            <div style="
            width:${percentual}%;
            ">
            </div>

            </div>


            <span>
            ${percentual.toFixed(1)}%
            </span>


            </div>

            `;

    });


}



document.addEventListener(
    'DOMContentLoaded',
    carregarMetas
);