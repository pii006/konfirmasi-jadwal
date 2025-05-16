document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('verifyForm');
  const input = document.getElementById('kodePemesanan');
  const feedback = document.getElementById('feedback');
  const popup = document.getElementById('customPopup');
  const zoomPopup = document.getElementById('zoomPopup');
  const zoomLink = document.getElementById('zoomLink');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const kode = input.value.trim();

    if (!kode) {
      feedback.textContent = "Kode pemesanan tidak boleh kosong.";
      feedback.className = "error";
      input.focus();
      return;
    }

    const regex = /^UBD-[A-Z0-9]+(-[A-Z0-9]+)*$/;

    if (!regex.test(kode) || kode.length < 12) {
      feedback.textContent = "Kode pemesanan tidak valid. Gunakan format UBD-XXXX-XXXX (min 12 karakter).";
      feedback.className = "error";
      input.focus();
      return;
    }

    feedback.textContent = "";
    feedback.className = "";

    showPopup("Selamat, sesi anda akan segera dimulai!");
    input.value = "";
  });

  function showPopup(message) {
    popup.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
      popup.classList.remove('show');
      showZoomPopup();
    }, 3000);
  }

  function showZoomPopup() {
    const meetingID = Math.floor(100000000 + Math.random() * 900000000);
    const link = `https://zoom.us/j/${meetingID}`;
    zoomLink.href = link;
    zoomLink.textContent = `Gabung Zoom`;
    zoomPopup.classList.add('show');
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});
