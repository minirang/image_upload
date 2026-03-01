document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const resultDiv = document.getElementById('result');
  uploadBtn.addEventListener('click', () => {
    fileInput.click();
  });
  fileInput.addEventListener('change', () => {
    if (!fileInput.files.length) return;
    resultDiv.textContent = "업로드 중...";
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    fetch('https://img.bloupla.net/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('업로드 성공:', data.url);
        resultDiv.innerHTML =
          `업로드 성공<br><a href="${data.url}" target="_blank">${data.url}</a>`;
      } else {
        console.error('업로드 실패:', data.error);
        resultDiv.textContent = "업로드 실패: " + data.error;
      }
    })
    .catch(error => {
      console.error('요청 오류:', error);
      resultDiv.textContent = "요청 오류: " + error;
    });
  });
});