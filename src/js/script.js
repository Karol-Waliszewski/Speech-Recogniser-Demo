// Speech recognition
const SpeechRecognizer = (function() {
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // DOM
  let $paper = document.getElementById("paper");
  let $paragraph;

  // Funtions
  let initRecognition = function(lang) {
    lang = lang || "en-US";
    setLanguage(lang);
    recognition.interimResults = true;

    generateParagraph();

    recognition.addEventListener("result", handleRecognitionResult);
    recognition.addEventListener("end", handleFinishResult);
  };

  let startRecognition = function() {
    recognition.addEventListener("end", handleFinishResult);
    recognition.start();
  };

  let stopRecognition = function() {
    recognition.removeEventListener("end", handleFinishResult);
    recognition.stop();
  };

  let setLanguage = function(lang) {
    recognition.stop();
    recognition.lang = lang;
  };

  let generateResult = function(results) {
    let result = [...results].map(result => result[0].transcript).join("");
    return result;
  };

  let handleRecognitionResult = function(event) {
    if (event.results) {
      $paragraph.innerHTML = generateResult(event.results);
    }
  };

  let handleFinishResult = function(event) {
    generateParagraph();
    recognition.start();
  };

  let generateParagraph = function() {
    deleteEmptyParagraphs();
    $paragraph = document.createElement("p");
    $paragraph.classList.add("paragraph");
    $paper.appendChild($paragraph);
  };

  let deleteEmptyParagraphs = function() {
    let $paragraphs = [...document.querySelectorAll(".paragraph")];
    for (let p of $paragraphs) {
      if (p.innerHTML.length == 0) {
        $paper.removeChild(p);
      }
    }
  };

  let resetPaper = function() {
    $paper.innerHTML = "";
    generateParagraph();
  };

  return {
    init: initRecognition,
    start: startRecognition,
    stop: stopRecognition,
    setLanguage,
    reset: resetPaper
  };
})();

// DOM from NAV
let $start = document.getElementById("start");
let $stop = document.getElementById("stop");
let $reset = document.getElementById("reset");
let $eng = document.getElementById("lang_eng");
let $pl = document.getElementById("lang_pl");

// Listeners
$start.addEventListener("click", SpeechRecognizer.start);
$stop.addEventListener("click", SpeechRecognizer.stop);
$reset.addEventListener("click", SpeechRecognizer.reset);
$pl.addEventListener("click", () => {
  SpeechRecognizer.setLanguage("pl-PL");
});
$eng.addEventListener("click", () => {
  SpeechRecognizer.setLanguage("en-US");
});

//Init
SpeechRecognizer.init("en-US");
