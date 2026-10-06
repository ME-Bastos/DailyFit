const etapas = document.querySelectorAll(".form-step");
const indicadores = document.querySelectorAll(".progress-step");
const descricao = document.getElementById("etapa-descricao");
let etapaAtual = 1;

const descricoes = {
    1: "Conte um pouco sobre seus objetivos e sua rotina para ajudarmos a organizar sua experiência no DailyFit.",

    2: "Agora queremos conhecer um pouco melhor seus hábitos e preferências alimentares.",

    3: "Por fim, conte um pouco sobre sua rotina para que sua experiência seja ainda mais personalizada."
};

function mostrarEtapa(numero) {
    etapaAtual = numero;
    etapas.forEach((etapa) => {
        const numeroEtapa = Number(etapa.dataset.step);
        etapa.classList.toggle(
            "active",
            numeroEtapa === numero
        );
    });

    indicadores.forEach((indicador) => {
        const numeroIndicador = Number(indicador.dataset.step);

        indicador.classList.toggle(
            "active",
            numeroIndicador === numero
        );

        indicador.classList.toggle(
            "completed",
            numeroIndicador < numero
        );
    });
    descricao.textContent = descricoes[numero];
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function validarEtapa() {
    const etapa = document.querySelector(
        `.form-step[data-step="${etapaAtual}"]`
    );

    const campos = etapa.querySelectorAll(
        "input, select, textarea"
    );

    for (const campo of campos) {

        if (!campo.checkValidity()) {
            campo.reportValidity();
            return false;
        }
    }
    return true;
}

document.querySelectorAll(".next-step").forEach((botao) => {
    botao.addEventListener("click", () => {
        if (!validarEtapa()) {
            return;
        }

        if (etapaAtual < 3) {
            mostrarEtapa(etapaAtual + 1);
        }
    });
});

document.querySelectorAll(".prev-step").forEach((botao) => {
    botao.addEventListener("click", () => {
        if (etapaAtual > 1) {
            mostrarEtapa(etapaAtual - 1);
        }
    });
});

document
    .getElementById("formulario-dieta")
    .addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (!validarEtapa()) {
            return;
        }
        alert("Formulário preenchido com sucesso!");

    });