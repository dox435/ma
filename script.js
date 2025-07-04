// Fake download simulation
document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      alert("Starting download... (this is a test)");
      const link = document.createElement("a");
      link.href = "#"; // Replace with actual download URL if needed
      link.download = "HyperInstaller.exe";
      link.click();
    });
  }
});
