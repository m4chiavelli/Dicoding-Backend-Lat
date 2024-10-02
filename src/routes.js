const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  deleteNoteByIdHandler,
} = require("./handler");

// Menyimpan seluruh routes yang dibuat di dalam array
const routes = [
  // Menyimpan route untuk menambahkan catatan
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  // Menyimpan route untuk mendapatkan seluruh catatan
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  // Menyimpan route untuk mendapatkan catatan berdasarkan id
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },

  // Menyimpan route untuk mengedit catatan berdasarkan id
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: addNoteHandler,
  },

  // Menyimpan route untuk menghapus catatan berdasarkan id
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
