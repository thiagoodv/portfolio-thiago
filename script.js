// MENU PARA CELULAR

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function fecharMenu() {
    if (!menuToggle || !nav) return;

    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
}

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const menuAberto = nav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(menuAberto));
        menuToggle.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );
        menuToggle.textContent = menuAberto ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", fecharMenu);
    });
}

// EFEITO DE APARECIMENTO DAS SEÇÕES

const elementos = document.querySelectorAll(
    ".about-content, .about-image, .section-heading, .skill-card, .project-card, .contact-content"
);

elementos.forEach(elemento => elemento.classList.add("reveal"));

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas, observadorAtual) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observadorAtual.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach(elemento => observador.observe(elemento));
} else {
    elementos.forEach(elemento => elemento.classList.add("visible"));
}

// ANO AUTOMÁTICO NO RODAPÉ

const ano = document.querySelector(".footer p");

if (ano) {
    ano.textContent = `© ${new Date().getFullYear()} Thiago Oliveira. Todos os direitos reservados.`;
}


// NAVEGAÇÃO ENTRE AS SEÇÕES COM SETAS
const secoes = Array.from(document.querySelectorAll('main > section[id]'));

secoes.forEach((secao, indice) => {
    const navegacao = document.createElement('nav');
    navegacao.className = 'section-arrows';
    navegacao.setAttribute('aria-label', 'Navegação entre seções');

    if (indice > 0) {
        const anterior = document.createElement('a');
        anterior.className = 'section-arrow section-arrow-up';
        anterior.href = `#${secoes[indice - 1].id}`;
        anterior.setAttribute('aria-label', 'Ir para a seção anterior');
        anterior.innerHTML = '<span aria-hidden="true">↑</span>';
        navegacao.appendChild(anterior);
    }

    if (indice < secoes.length - 1) {
        const proxima = document.createElement('a');
        proxima.className = 'section-arrow section-arrow-down';
        proxima.href = `#${secoes[indice + 1].id}`;
        proxima.setAttribute('aria-label', 'Ir para a próxima seção');
        proxima.innerHTML = '<span aria-hidden="true">↓</span>';
        navegacao.appendChild(proxima);
    }

    secao.appendChild(navegacao);
});

// CURSOR PERSONALIZADO
// Ativa ao detectar movimento de um mouse, inclusive no modo responsivo do F12.
const cursorPersonalizado = document.querySelector(".custom-cursor");

if (cursorPersonalizado) {
    window.addEventListener("pointermove", (evento) => {
        if (evento.pointerType !== "mouse") return;

        document.documentElement.classList.add("has-mouse-cursor");
        cursorPersonalizado.style.left = `${evento.clientX}px`;
        cursorPersonalizado.style.top = `${evento.clientY}px`;
    }, { passive: true });

    document.addEventListener("pointerover", (evento) => {
        if (evento.pointerType && evento.pointerType !== "mouse") return;
        const elemento = evento.target.closest("a, button, .project-card");
        if (!elemento) return;

        cursorPersonalizado.classList.add("hovering");
    });

    document.addEventListener("pointerout", (evento) => {
        if (evento.pointerType && evento.pointerType !== "mouse") return;
        const elementoSeguinte = evento.relatedTarget;
        if (elementoSeguinte && elementoSeguinte.closest("a, button, .project-card")) return;

        cursorPersonalizado.classList.remove("hovering");
    });
}

// DESTACAR A SEÇÃO ATUAL NO MENU

const linksMenu = document.querySelectorAll(".nav a");

const observadorMenu = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            linksMenu.forEach((link) => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${entrada.target.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
});

secoes.forEach((secao) => {
    observadorMenu.observe(secao);
});
