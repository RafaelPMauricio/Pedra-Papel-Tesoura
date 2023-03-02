const pedra = document.querySelector("#pedra");
const papel = document.querySelector("#papel");
const tesoura = document.querySelector("#tesoura");
const versus = document.querySelector("#versus");
const aiChoice = document.querySelector("#aiChoice");
const results = document.querySelector("#results");
const jogar = document.querySelector("#jogar");
const resetar = document.querySelector("#restart");

let escolha;

const atualizarEscolha = (evt) => {
  const currentChoice = evt.currentTarget;
  switch (currentChoice) {
    case pedra:
      pedra.classList.add("selected");
      papel.classList.remove("selected");
      tesoura.classList.remove("selected");
      escolha = "rock";

      break;
    case papel:
      pedra.classList.remove("selected");
      papel.classList.add("selected");
      tesoura.classList.remove("selected");
      escolha = "paper";

      break;
    case tesoura:
      pedra.classList.remove("selected");
      papel.classList.remove("selected");
      tesoura.classList.add("selected");
      escolha = "scissors";

      break;
    default:
      window.alert("Error");
      console.log(currentChoice);
      break;
  }
};

pedra.addEventListener("click", atualizarEscolha);
papel.addEventListener("click", atualizarEscolha);
tesoura.addEventListener("click", atualizarEscolha);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a666fe2464msh1b9a592dc8d7b7ap1ee820jsnd37c1cd48331",
    "X-RapidAPI-Host": "rock-paper-scissors14.p.rapidapi.com",
  },
};

const play = () => {
  if (escolha === null || escolha === undefined) {
    window.alert("Escolha uma opção");
    return;
  }
  fetch(
    `https://rock-paper-scissors14.p.rapidapi.com/?choice=${escolha}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      switch (response.result) {
        case "You Win":
          results.textContent = "Você Ganhou!";
          break;
        case "Draw":
          results.textContent = "Empate";
          break;
        case "You Lose":
          results.textContent = "Você Perdeu";
          break;
      }
      versus.classList.remove("hidden");
      versus.style.display = "block";
      aiChoice.classList.remove("hidden");
      aiChoice.classList.add("jokenpo-box");
      results.classList.remove("hidden");
      results.style.display = "block";
      const aiResponse = response.ai.name;
      switch (aiResponse) {
        case "rock":
          console.log(aiResponse);
          aiChoice.firstElementChild.classList.add(
            "fa-regular",
            "fa-hand-back-fist",
            "fa-10x"
          );
          break;
        case "paper":
          console.log(aiResponse);
          aiChoice.firstElementChild.classList.add(
            "fa-regular",
            "fa-hand",
            "fa-10x"
          );
          break;
        case "scissors":
          console.log(aiResponse);
          aiChoice.firstElementChild.classList.add(
            "fa-regular",
            "fa-hand-scissors",
            "fa-10x"
          );
          break;
        default:
          window.alert("Error");
          console.log(aiResponse);
          break;
      }
      resetar.removeAttribute("disabled");
      console.log(response);
    })
    .catch((err) => console.error(err));
  jogar.setAttribute("disabled", "true");
};

jogar.addEventListener("click", play);

const restart = () => {
  jogar.removeAttribute("disabled");
  versus.classList.add("hidden");
  versus.style.display = "none";
  aiChoice.classList.add("hidden");
  aiChoice.classList.remove("jokenpo-box");
  results.classList.add("hidden");
  results.style.display = "none";
  aiChoice.firstElementChild.classList.remove(
    "fa-regular",
    "fa-hand-back-fist",
    "fa-hand",
    "fa-hand-scissors",
    "fa-10x"
  );
  resetar.setAttribute("disabled", "true");
};

resetar.addEventListener("click", restart);
