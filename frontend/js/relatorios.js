const token = localStorage.getItem('token');



function dinheiro(valor) {

    return Number(valor)
        .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

}




async function carregarRelatorios() {


    try {


        const resposta = await fetch('/api/transacoes', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }

        });


        const dados = await resposta.json();



        const transacoes =
            dados.transacoes || [];





        const gastos =
            transacoes.filter(t => t.tipo === "despesa");



        const hoje = new Date();

        const mesAtual =
            hoje.getMonth();

        const anoAtual =
            hoje.getFullYear();



        const gastosMes =
            gastos.filter(t => {

                const data =
                    new Date(t.data);

                return data.getMonth() == mesAtual &&
                    data.getFullYear() == anoAtual;

            });





        const total =
            gastosMes.reduce(
                (a, b) => a + Number(b.valor), 0
            );



        document.getElementById("totalMes")
            .innerHTML =
            dinheiro(total);






        const categorias = {};


        gastosMes.forEach(t => {


            if (!categorias[t.categoria])
                categorias[t.categoria] = 0;


            categorias[t.categoria] += Number(t.valor);


        });



        const listaCategorias =
            Object.entries(categorias)
                .sort((a, b) => b[1] - a[1]);





        if (listaCategorias.length) {


            let maior =
                listaCategorias[0];


            document.getElementById("maiorCategoria")
                .innerHTML =
                maior[0];


            document.getElementById("maiorValor")
                .innerHTML =
                dinheiro(maior[1]);


            document.getElementById("maiorPercentual")
                .innerHTML =
                Math.round(maior[1] / total * 100)
                + "% do total";




            let menor =
                listaCategorias[listaCategorias.length - 1];


            document.getElementById("menorCategoria")
                .innerHTML =
                menor[0];


            document.getElementById("menorValor")
                .innerHTML =
                dinheiro(menor[1]);


            document.getElementById("menorPercentual")
                .innerHTML =
                Math.round(menor[1] / total * 100)
                + "% do total";

        }




        const tops =
            listaCategorias.slice(0, 3);



        tops.forEach((item, index) => {


            const porcentagem =
                ((item[1] / total) * 100).toFixed(1);



            document
                .getElementById(
                    `top${index + 1}Nome`
                )
                .innerHTML =
                "● " + item[0];



            document
                .getElementById(
                    `top${index + 1}Valor`
                )
                .innerHTML =
                `${dinheiro(item[1])} (${porcentagem}%)`;



            document
                .getElementById(
                    `top${index + 1}Barra`
                )
                .style.width =
                porcentagem + "%";



        });



        const dias = {
            0: "dom",
            1: "seg",
            2: "ter",
            3: "qua",
            4: "qui",
            5: "sex",
            6: "sab"
        };


        const gastosDia = {
            seg: 0,
            ter: 0,
            qua: 0,
            qui: 0,
            sex: 0,
            sab: 0,
            dom: 0
        };



        gastosMes.forEach(t => {

            let d = new Date(t.data)
                .getDay();


            gastosDia[dias[d]] += Number(t.valor);


        });



        const maiorDia =
            Math.max(...Object.values(gastosDia));



        const nomesDias = {

            seg: "Seg",
            ter: "Ter",
            qua: "Qua",
            qui: "Qui",
            sex: "Sex",
            sab: "Sáb",
            dom: "Dom"

        };



        Object.keys(gastosDia)
            .forEach(d => {


                const valor =
                    gastosDia[d];


                const altura =
                    maiorDia ?
                        (valor / maiorDia) * 200
                        : 0;



                document
                    .getElementById(d)
                    .style.height =
                    altura + "px";



                document
                    .getElementById(
                        "valor" + d.charAt(0).toUpperCase() + d.slice(1)
                    )
                    .innerHTML =
                    dinheiro(valor);



            });




            



    } catch (e) {

        console.log(e);

    }



}



carregarRelatorios();