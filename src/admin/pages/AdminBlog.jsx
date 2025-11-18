import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const fetchBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, 'blogs'));
    const blogsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBlogs(blogsData);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = '';
    if (image) {
      if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
        alert('Cloudinary credentials are not set in environment variables.');
        setUploading(false);
        return;
      }

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
          imageUrl = data.secure_url;
        } else {
          console.error('Cloudinary upload error:', data);
          alert(data.error ? data.error.message : 'Upload failed.');
          setUploading(false);
          return;
        }
      } catch (error) {
        console.error('Error uploading image: ', error);
        setUploading(false);
        return;
      }
    }

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        author,
        imageUrl,
        createdAt: new Date(),
      });

      setTitle('');
      setContent('');
      setAuthor('');
      setImage(null);
      document.getElementById('image-input-blog').value = '';
      fetchBlogs();
    } catch (error) {
      console.error('Error adding blog: ', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      // Note: Deleting from Cloudinary requires backend authentication and is not handled here.
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog: ', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Blog</h1>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3">Add New Blog Post</h2>
        <form onSubmit={handleAddBlog} className="space-y-4">
          <div>
            <label className="block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="block">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border"
              rows="5"
              required
            ></textarea>
          </div>
          <div>
            <label className="block">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="block">Image</label>
            <input
              id="image-input-blog"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border"
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={uploading}
          >
            {uploading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Existing Blog Posts</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="border p-2">{blog.title}</td>
                <td className="border p-2">{blog.author}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlog;
