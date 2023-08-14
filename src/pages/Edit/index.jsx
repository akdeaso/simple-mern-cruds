import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: false,
    image: null,
  });

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `https://crowded-cyan-sweatshirt.cyclic.app/api/v4/product/${id}`
      );
      const existingProduct = response.data;
      setFormData(existingProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value, type, files, checked } = event.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "file"
        ? files[0]
        : type === "number"
        ? parseInt(value)
        : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedFormData = new FormData();
      for (const key in formData) {
        updatedFormData.append(key, formData[key]);
      }
      const response = await axios.put(
        `https://crowded-cyan-sweatshirt.cyclic.app/api/v4/product/${id}`,
        updatedFormData
      );
      console.log("Updated data:", response.data);
      history.push("/");
      alert("Product Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={formData.price}
            onChange={handleInputChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
          <Input
            name="image"
            type="file"
            label="Image"
            onChange={handleInputChange}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            checked={formData.status}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
