"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Speech recognition
var SpeechRecognizer = function () {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // DOM
  var $paper = document.getElementById("paper");
  var $paragraph = void 0;

  // Funtions
  var initRecognition = function initRecognition(lang) {
    lang = lang || "en-US";
    setLanguage(lang);
    recognition.interimResults = true;

    generateParagraph();

    recognition.addEventListener("result", handleRecognitionResult);
    recognition.addEventListener("end", handleFinishResult);
  };

  var startRecognition = function startRecognition() {
    recognition.addEventListener("end", handleFinishResult);
    recognition.start();
  };

  var stopRecognition = function stopRecognition() {
    recognition.removeEventListener("end", handleFinishResult);
    recognition.stop();
  };

  var setLanguage = function setLanguage(lang) {
    recognition.stop();
    recognition.lang = lang;
  };

  var generateResult = function generateResult(results) {
    var result = [].concat(_toConsumableArray(results)).map(function (result) {
      return result[0].transcript;
    }).join("");
    return result;
  };

  var handleRecognitionResult = function handleRecognitionResult(event) {
    if (event.results) {
      $paragraph.innerHTML = generateResult(event.results);
    }
  };

  var handleFinishResult = function handleFinishResult(event) {
    generateParagraph();
    recognition.start();
  };

  var generateParagraph = function generateParagraph() {
    deleteEmptyParagraphs();
    $paragraph = document.createElement("p");
    $paragraph.classList.add("paragraph");
    $paper.appendChild($paragraph);
  };

  var deleteEmptyParagraphs = function deleteEmptyParagraphs() {
    var $paragraphs = [].concat(_toConsumableArray(document.querySelectorAll(".paragraph")));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = $paragraphs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var p = _step.value;

        if (p.innerHTML.length == 0) {
          $paper.removeChild(p);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  var resetPaper = function resetPaper() {
    $paper.innerHTML = "";
    generateParagraph();
  };

  return {
    init: initRecognition,
    start: startRecognition,
    stop: stopRecognition,
    setLanguage: setLanguage,
    reset: resetPaper
  };
}();

// DOM from NAV
var $start = document.getElementById("start");
var $stop = document.getElementById("stop");
var $reset = document.getElementById("reset");
var $eng = document.getElementById("lang_eng");
var $pl = document.getElementById("lang_pl");

// Listeners
$start.addEventListener("click", SpeechRecognizer.start);
$stop.addEventListener("click", SpeechRecognizer.stop);
$reset.addEventListener("click", SpeechRecognizer.reset);
$pl.addEventListener("click", function () {
  SpeechRecognizer.setLanguage("pl-PL");
});
$eng.addEventListener("click", function () {
  SpeechRecognizer.setLanguage("en-US");
});

//Init
SpeechRecognizer.init("en-US");
//# sourceMappingURL=maps/script.js.map
