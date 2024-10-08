const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  // logika untuk menyimpan catatan dari client ke dalam array notes
  const { title, tags, body } = request.payload; // request.payload berisi data yang dikirimkan oleh client
  const id = nanoid(16); // membuat id dengan panjang 16 karakter
  const createdAt = new Date().toISOString(); // membuat waktu ketika catatan dibuat
  const updatedAt = createdAt; // nilai awal, sama dengan createdAt

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote); // memasukkan newNote ke dalam array notes

  const isSuccess = notes.filter((note) => note.id === id).length > 0; // mengecek apakah catatan sudah berhasil ditambahkan

  // Jika berhasil, kirimkan response berhasil
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);

    // Menyimpan header Access-Control-Allow-Origin agar client dapat mengakses API
    // response.header("Access-Control-Allow-Origin", "*");

    return response;
  }

  // Jika gagal, kirimkan response gagal
  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });

  response.code(500);

  return response;
};

// Fungsi untuk mendapatkan seluruh catatan
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// Funfsi untuk mendapatkan catatan berdasarkan id
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params; // mengambil nilai id dari request.params

  const note = notes.filter((n) => n.id === id)[0]; // mendapatkan catatan berdasarkan id

  // Jika catatan ditemukan, kirimkan responsenya
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  // Jika catatan tidak ditemukan, kirimkan responsenya
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });

  response.code(404);

  return response;
};

// Fungsi untuk mengedit catatan berdasarkan id
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params; // mengambil nilai id dari request.params

  // Jika tidak ada payload yang dikirimkan oleh client, kirimkan respons gagal
  if (!request.payload) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui catatan. Data tidak valid.",
    });
    response.code(400);
    return response;
  }

  const { title, tags, body } = request.payload; // mengambil nilai title, tags, dan body dari request.payload
  const updatedAt = new Date().toISOString(); // membuat waktu ketika catatan diperbarui

  const index = notes.findIndex((note) => note.id === id); // mendapatkan index catatan dalam array berdasarkan id

  // Jika catatan ditemukan, maka catatan akan diperbarui
  // -1 biasanya digunakan sebagai nilai indikator "tidak ditemukan" dalam operasi pencarian dalam array.
  // Jika index tidak sama dengan -1, artinya elemen dengan indeks tersebut ditemukan dalam array notes.

  // notes[index] mengakses elemen pada posisi index dalam array notes.
  // { ...notes[index], title, tags, body, updatedAt, }; adalah sebuah objek literal yang menggunakan spread operator (...).
  // Dengan menggunakan spread operator, kita membuat objek baru yang menggabungkan nilai dari objek catatan yang ditemukan dengan nilai title, tags, body, dan updatedAt yang baru.
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

// Fungsi untuk menghapus catatan berdasarkan id
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1); // Menghapus catatan dari array notes

    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
}; // export semua fungsi handler
