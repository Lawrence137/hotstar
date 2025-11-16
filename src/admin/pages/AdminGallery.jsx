import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase';

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchGallery = async () => {
    const querySnapshot = await getDocs(collection(db, 'gallery'));
    const galleryData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGallery(galleryData);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }
    setUploading(true);
    try {
      const storageRef = ref(storage, `gallery/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'gallery'), {
        imageUrl,
        storagePath: storageRef.fullPath,
        createdAt: new Date(),
      });

      setImage(null);
      fetchGallery();
    } catch (error) {
      console.error('Error uploading image: ', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, storagePath) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'gallery', id));

      // Delete from Storage
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);

      fetchGallery();
    } catch (error) {
      console.error('Error deleting image: ', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Gallery</h1>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3">Upload New Image</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border"
              accept="image/*,video/*"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="relative group">
              <img
                src={item.imageUrl}
                alt="Gallery item"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(item.id, item.storagePath)}
                  className="bg-red-500 text-white p-2 rounded-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
