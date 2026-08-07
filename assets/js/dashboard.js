// tela de carregamento
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";

    setTimeout(() => {
        loader.style.display = "none";
    },400);
});

// receita
const receita = document.getElementById("graficoReceita");
new Chart(receita, {
    type: "line",
    data: {
        labels: [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
        ],

        datasets: [{
            label: "Receita",
            data: [
                20000,
                15000,
                10000,
                8000,
                8500,
                9600,
                15500,
                13500,
                0,
                0,
                0,
                0
            ],
            borderWidth: 3,
            tension: .4,
            fill: true
        }]
    }
});

// alunos por plano
const plano = document.getElementById("graficoPlano");
new Chart(plano, {
    type: "doughnut",
    data: {
        labels: [
            "Mensal",
            "Trimestral",
            "Anual"
        ],

        datasets: [{
            data: [
                152,
                78,
                96
            ]
        }]
    }
});



// nav links
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
        const destino = this.getAttribute("href");

        if (!destino.startsWith("#")) return;
        e.preventDefault();
        const secao = document.querySelector(destino);
        const posicao = secao.getBoundingClientRect().top + window.scrollY - 90;

        window.scrollTo({
            top: posicao,
            behavior: "smooth"
        });

        secao.classList.add("destacar");
        setTimeout(() => {
            secao.classList.remove("destacar");
        }, 1600);
    });
});