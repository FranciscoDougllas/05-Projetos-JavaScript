"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Elementos
var notesContainer = document.querySelector("#notes-container");
var noteInput = document.querySelector("#note-content");
var addNoteBtn = document.querySelector(".add-note");
var searchInput = document.querySelector("#search-input");
var exportBtn = document.querySelector("#export-notes"); // Funções

function showNotes() {
  cleanNotes();
  getNotes().forEach(function (note) {
    var noteElement = createNote(note.id, note.content, note.fixed);
    notesContainer.appendChild(noteElement);
  });
}

function getNotes() {
  var notes = JSON.parse(localStorage.getItem("notes") || "[]");
  var orderedNotes = notes.sort(function (a, b) {
    return a.fixed > b.fixed ? -1 : 1;
  });
  return orderedNotes;
}

function cleanNotes() {
  notesContainer.replaceChildren([]);
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(id, content, fixed) {
  var _pinIcon$classList, _deleteIcon$classList, _duplicateIcon$classL;

  var element = document.createElement("div");
  element.classList.add("note");
  var textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.placeholder = "Adicione algum texto...";
  element.appendChild(textarea);

  if (fixed) {
    element.classList.add("fixed");
  }

  var pinIcon = document.createElement("i");

  (_pinIcon$classList = pinIcon.classList).add.apply(_pinIcon$classList, ["bi", "bi-pin"]);

  element.appendChild(pinIcon);
  var deleteIcon = document.createElement("i");

  (_deleteIcon$classList = deleteIcon.classList).add.apply(_deleteIcon$classList, ["bi", "bi-x-lg"]);

  element.appendChild(deleteIcon);
  var duplicateIcon = document.createElement("i");

  (_duplicateIcon$classL = duplicateIcon.classList).add.apply(_duplicateIcon$classL, ["bi", "bi-file-earmark-plus"]);

  element.appendChild(duplicateIcon); // Eventos do elemento

  element.querySelector("textarea").addEventListener("keydown", function () {
    var noteContent = element.querySelector("textarea").value;
    updateNote(id, noteContent);
  });
  element.querySelector(".bi-x-lg").addEventListener("click", function () {
    deleteNote(id, element);
  });
  element.querySelector(".bi-pin").addEventListener("click", function () {
    toggleFixNote(id);
  });
  element.querySelector(".bi-file-earmark-plus").addEventListener("click", function () {
    copyNote(id);
  });
  return element;
}

function addNote() {
  var notes = getNotes();
  var noteInput = document.querySelector("#note-content");
  var noteObject = {
    id: generateId(),
    content: noteInput.value,
    fixed: false
  };
  var noteElement = createNote(noteObject.id, noteObject.content);
  notesContainer.appendChild(noteElement);
  notes.push(noteObject);
  saveNotes(notes);
}

function generateId() {
  return Math.floor(Math.random() * 5000);
}

function updateNote(id, newContent) {
  var notes = getNotes();
  var targetNote = notes.filter(function (note) {
    return note.id === id;
  })[0];
  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  var notes = getNotes().filter(function (note) {
    return note.id !== id;
  });
  saveNotes(notes);
  notesContainer.removeChild(element);
}

function toggleFixNote(id) {
  var notes = getNotes();
  var targetNote = notes.filter(function (note) {
    return note.id === id;
  })[0];
  targetNote.fixed = !targetNote.fixed;
  saveNotes(notes);
  showNotes();
}

function searchNotes(search) {
  var searchResults = getNotes().filter(function (note) {
    return note.content.includes(search);
  });

  if (search !== "") {
    cleanNotes();
    searchResults.forEach(function (note) {
      var noteElement = createNote(note.id, note.content);
      notesContainer.appendChild(noteElement);
    });
    return;
  }

  cleanNotes();
  showNotes();
}

function copyNote(id) {
  var notes = getNotes();
  var targetNote = notes.filter(function (note) {
    return note.id === id;
  })[0];
  var noteObject = {
    id: generateId(),
    content: targetNote.content,
    fixed: false
  };
  var noteElement = createNote(noteObject.id, noteObject.content, false);
  notesContainer.appendChild(noteElement);
  notes.push(noteObject);
  saveNotes(notes);
}

function exportData() {
  var notes = JSON.parse(localStorage.getItem("notes") || "[]");
  var csvString = [["ID", "Conteúdo", "Fixado?"]].concat(_toConsumableArray(notes.map(function (note) {
    return [note.id, note.content, note.fixed];
  }))).map(function (e) {
    return e.join(",");
  }).join("\n");
  var element = document.createElement("a");
  element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
  element.target = "_blank";
  element.download = "export.csv";
  element.click();
} // Eventos


addNoteBtn.addEventListener("click", function () {
  return addNote();
});
searchInput.addEventListener("keyup", function (e) {
  var search = e.target.value;
  searchNotes(search);
});
noteInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addNote();
  }
});
exportBtn.addEventListener("click", function () {
  exportData();
}); // Init

showNotes();