import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

const AdminMarketplace = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image.');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      // Add product to Firestore
      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
      });

      // Clear form
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Marketplace</h1>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="block">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border"
              required
            ></textarea>
          </div>
          <div>
            <label className="block">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Product
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Existing Products</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">
                  <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover" />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
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

export default AdminMarketplace;
