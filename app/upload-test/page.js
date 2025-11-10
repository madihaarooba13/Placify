"use client";

export default function UploadTest() {
  const handleUpload = async (e) => {
    e.preventDefault();
    const fileInput = document.querySelector("#fileInput");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const res = await fetch("/api/profile/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    alert(data.url || data.error);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6 text-sky-800">
        📤 Upload Resume Test
      </h1>
      <form onSubmit={handleUpload} className="flex flex-col gap-3">
        <input type="file" id="fileInput" className="border p-2 rounded" />
        <button
          type="submit"
          className="bg-sky-600 text-white px-5 py-2 rounded hover:bg-sky-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
