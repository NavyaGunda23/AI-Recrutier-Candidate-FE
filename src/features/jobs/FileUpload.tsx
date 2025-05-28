import React, { useState, type ChangeEvent } from 'react';

const PdfUploader: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [folderId, setFolderId] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPdfFile(file || null);
  };

  const handleUpload = async () => {
    if (!pdfFile || !folderId) {
      setUploadStatus('Please select a PDF file and provide a folder ID.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('folderId', folderId);

    try {
      setUploadStatus('Uploading...');
      const response = await fetch('http://localhost:5172/api/upload-pdf', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus(`✅ Uploaded: ${result.file.name}`);
        console.log('Upload successful:', result);
      } else {
        setUploadStatus(`❌ Error: ${result.details}`);
        console.error('Upload failed:', result);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setUploadStatus('❌ Upload failed due to a network error.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Upload PDF</h2>
      <input
        type="text"
        placeholder="Enter Folder ID"
        value={folderId}
        onChange={(e) => setFolderId(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} style={{ marginTop: '10px' }}>
        Upload
      </button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default PdfUploader;
