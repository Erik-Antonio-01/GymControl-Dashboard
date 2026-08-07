const form = document.getElementById("formLogin");
const senha = document.getElementById("senha");
const botao = document.getElementById("mostrarSenha");

// validação
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);
});

// mostrar e ocultar senha
botao.addEventListener("click", function () {

    if (senha.type === "password") {
        senha.type = "text";
        botao.innerHTML = '<i class="bi bi-eye-slash"></i>';
    }
    else {
        senha.type = "password";
        botao.innerHTML = '<i class="bi bi-eye"></i>';
    }
});