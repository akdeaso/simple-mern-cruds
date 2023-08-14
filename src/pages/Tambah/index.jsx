import { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import "./index.scss";
import axios from "axios";

const Tambah = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: false,
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("price", formData.price);
      formDataObj.append("stock", formData.stock);
      formDataObj.append("status", formData.status);
      formDataObj.append("image", formData.image);

      const response = await axios.post(
        "https://crowded-cyan-sweatshirt.cyclic.app/api/v4/product",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product created:", response.data);
      history.push("/");
      alert("Product Created");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
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

export default Tambah;
