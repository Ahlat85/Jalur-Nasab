$(document).ready(function() {
  $("#btn-cetak").on("click", e => {
    const element = document.getElementById("slide")
    const options = {
    
    }
    html2pdf().set(options).from(element).save();
    Swal.fire(
      "Berhasil!",
      "Berhasil mencetak halaman ke pdf!",
      "success"
    );
  });
});