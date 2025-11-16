import React, { useState } from 'react';

const CloudinaryUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl('');
    setError('');
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setError('Cloudinary credentials are not set in environment variables.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.secure_url);
        console.log('Uploaded image URL:', data.secure_url);
      } else {
        setError(data.error ? data.error.message : 'Upload failed.');
        console.error('Cloudinary upload error:', data);
      }
    } catch (err) {
      setError('Network error or failed to upload.');
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
      <h3>Upload Media to Cloudinary</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading || !image} style={{ marginLeft: '10px', padding: '8px 15px', cursor: 'pointer' }}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {imageUrl && (
        <div>
          <p>Upload successful!</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
          <p>URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
