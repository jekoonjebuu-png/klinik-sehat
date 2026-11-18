/* ===============================
   FUNGSI BOOKING
================================ */

function booking(namaLayanan = "") {
    const modal = document.getElementById("bookingModal");
    const pilihanLayanan = document.getElementById("layanan");

    modal.hidden = false;

    if (namaLayanan !== "") {
        pilihanLayanan.value = namaLayanan;
    }
}

function tutupBooking() {
    const modal = document.getElementById("bookingModal");
    modal.hidden = true;
}

document.getElementById("bookingModal").addEventListener("click", function(event) {
    if (event.target === this) {
        tutupBooking();
    }
});


/* ===============================
   PROSES FORM BOOKING
================================ */

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const telepon = document.getElementById("telepon").value.trim();
    const layanan = document.getElementById("layanan").value;
    const tanggal = document.getElementById("tanggal").value;

    const dataBooking = {
        nama: nama,
        telepon: telepon,
        layanan: layanan,
        tanggal: tanggal,
        status: "Menunggu Konfirmasi",
        hasilLab: "",
        catatanLab: "",
        waktuPesan: new Date().toLocaleString("id-ID")
    };

    let daftarBooking = JSON.parse(localStorage.getItem("daftarBooking")) || [];
    daftarBooking.push(dataBooking);
    localStorage.setItem("daftarBooking", JSON.stringify(daftarBooking));

    alert(
        "Booking berhasil!\n\n" +
        "Nama: " + nama + "\n" +
        "Layanan: " + layanan + "\n" +
        "Tanggal: " + tanggal + "\n\n" +
        "Gunakan Nomor HP Anda (" + telepon + ") untuk mengecek hasil pemeriksaan."
    );

    this.reset();
    tutupBooking();
});


/* ===============================
   PROSES CEK HASIL PEMERIKSAAN
================================ */

document.getElementById("cekHasilForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nomorCari = document.getElementById("cariTelepon").value.trim();
    const hasilContainer = document.getElementById("hasilContainer");
    const daftarBooking = JSON.parse(localStorage.getItem("daftarBooking")) || [];

    // Mencari semua data booking yang cocok dengan nomor HP
    const dataDitemukan = daftarBooking.filter(item => item.telepon === nomorCari);

    hasilContainer.innerHTML = "";

    if (dataDitemukan.length === 0) {
        hasilContainer.innerHTML = `
            <div class="hasil-kosong">
                Data pemeriksaan dengan nomor HP <strong>${nomorCari}</strong> tidak ditemukan.
            </div>
        `;
        return;
    }

    dataDitemukan.forEach(item => {
        const kartu = document.createElement("div");
        kartu.className = "hasil-card";

        const statusSaatIni = item.status || "Menunggu Konfirmasi";
        const isiHasil = item.hasilLab
            ? `<div class="hasil-nilai"><strong>Hasil Lab:</strong> ${item.hasilLab}</div>
               <div class="hasil-catatan"><strong>Catatan:</strong> ${item.catatanLab || "-"}</div>`
            : `<div class="hasil-pending">Hasil pemeriksaan belum keluar. Status saat ini: <strong>${statusSaatIni}</strong>.</div>`;

        kartu.innerHTML = `
            <div class="hasil-card-header">
                <div>
                    <h3>${item.layanan}</h3>
                    <small>Pasien: <strong>${item.nama}</strong> • Tanggal: ${item.tanggal}</small>
                </div>
                <span class="status-pill">${statusSaatIni}</span>
            </div>
            <hr>
            ${isiHasil}
        `;

        hasilContainer.appendChild(kartu);
    });
});
