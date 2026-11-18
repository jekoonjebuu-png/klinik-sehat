
/* ===============================
   FUNGSI BOOKING
================================ */

// Membuka formulir booking
function booking(namaLayanan = "") {

    const modal = document.getElementById("bookingModal");
    const pilihanLayanan = document.getElementById("layanan");

    modal.hidden = false;

    // Jika tombol berasal dari kartu layanan,
    // otomatis pilih jenis pemeriksaannya.
    if (namaLayanan !== "") {
        pilihanLayanan.value = namaLayanan;
    }
}


// Menutup formulir booking
function tutupBooking() {

    const modal = document.getElementById("bookingModal");

    modal.hidden = true;

}


// Menutup modal jika pengguna klik area luar formulir
document.getElementById("bookingModal").addEventListener("click", function(event) {

    if (event.target === this) {
        tutupBooking();
    }

});


/* ===============================
   FUNGSI LOGIN
================================ */

function login() {

    alert("Fitur login akan dikembangkan pada tahap berikutnya.");

}


/* ===============================
   PROSES FORM BOOKING
================================ */

document.getElementById("bookingForm").addEventListener("submit", function(event) {

    // Mencegah halaman melakukan refresh
    event.preventDefault();

    // Mengambil data dari formulir
    const nama = document.getElementById("nama").value;
    const telepon = document.getElementById("telepon").value;
    const layanan = document.getElementById("layanan").value;
    const tanggal = document.getElementById("tanggal").value;

    // Membuat objek data booking
    const dataBooking = {
        nama: nama,
        telepon: telepon,
        layanan: layanan,
        tanggal: tanggal,
        waktuPesan: new Date().toLocaleString("id-ID")
    };

    // Mengambil data booking yang sudah tersimpan
    let daftarBooking = JSON.parse(localStorage.getItem("daftarBooking")) || [];

    // Menambahkan booking baru
    daftarBooking.push(dataBooking);

    // Menyimpan kembali ke browser
    localStorage.setItem("daftarBooking", JSON.stringify(daftarBooking));

    // Menampilkan pemberitahuan
    alert(
        "Booking berhasil!\n\n" +
        "Nama: " + nama + "\n" +
        "Layanan: " + layanan + "\n" +
        "Tanggal: " + tanggal
    );

    // Mengosongkan formulir
    this.reset();

    // Menutup modal
    tutupBooking();

});
