// image-upload.js — Handles image uploads to ImageBB

async function uploadImageToImageBB(file) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", IMAGEHOST_KEY);

  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData
  });

  if (!response.ok) throw new Error("فشل رفع الصورة");
  const data = await response.json();
  if (!data.success) throw new Error(data.error?.message || "فشل رفع الصورة");
  return data.data.url; // Returns the hosted image URL
}

// Show image preview before upload
function previewImage(inputEl, imgEl) {
  inputEl.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => { imgEl.src = e.target.result; imgEl.style.display = "block"; };
    reader.readAsDataURL(file);
  });
}
