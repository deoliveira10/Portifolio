// ============================
// SELETORES PRINCIPAIS
// ============================
const intro = document.getElementById("intro");
const container = document.querySelector(".sections");
const sections = document.querySelectorAll(".section");
const titles = document.querySelectorAll(".section h2");

let neonIndex = 0;


// ============================
// FUNÇÃO FECHAR CARD
// ============================
function closeSection(){

    const activeSection = document.querySelector(".section.active");
    if(!activeSection) return;

    activeSection.classList.remove("active");

    // mostrar todos os cards novamente
    sections.forEach(section=>{
        section.classList.remove("hidden-card");
    });

    container.classList.remove("focused");
    intro.classList.remove("hidden");

    document.body.style.overflow = "hidden";
}



// ============================
// ABRIR CARD
// ============================
sections.forEach(section => {

    section.addEventListener("click", e => {

        e.stopPropagation();

        // se já existe card aberto não abre outro
        if(document.querySelector(".section.active")) return;

        // ativa o clicado
        section.classList.add("active");

        // esconde os outros
        sections.forEach(s=>{
            if(s !== section){
                s.classList.add("hidden-card");
            }
        });

        container.classList.add("focused");
        intro.classList.add("hidden");

        document.body.style.overflow = "auto";
    });

});



// ============================
// FECHAR CLICANDO FORA
// ============================
document.addEventListener("click", (e)=>{

    const activeSection = document.querySelector(".section.active");
    if(!activeSection) return;

    if(!activeSection.contains(e.target)){
        closeSection();
    }

});



// ============================
// FECHAR COM ESC
// ============================
document.addEventListener("keydown", (event)=>{

    if(event.key === "Escape"){
        closeSection();
    }

});



// ============================
// EFEITO NEON NOS TÍTULOS
// ============================
function animateTitle(title){

    const text = title.dataset.text;

    title.innerHTML = "";

    title.classList.add("neon-pro");

    text.split("").forEach((letter,index)=>{

        const span = document.createElement("span");

        span.textContent = letter;

        span.style.animationDelay = index * 0.05 + "s";

        title.appendChild(span);

    });

    setTimeout(()=>{

        title.classList.remove("neon-pro");

        title.textContent = text;

    },2000);

}



// ============================
// LOOP NEON
// ============================
function neonLoop(){

    // se algum card estiver aberto, não roda
    if(document.querySelector(".section.active")) return;

    animateTitle(titles[neonIndex]);

    neonIndex++;

    if(neonIndex >= titles.length){
        neonIndex = 0;
    }

}



// ============================
// INTERVALO DO NEON
// ============================
setInterval(neonLoop,2500);

