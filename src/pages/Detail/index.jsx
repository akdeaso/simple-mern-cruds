import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./index.scss";

const Detail = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `https://crowded-cyan-sweatshirt.cyclic.app/api/v4/product/${params.id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp {product.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
          <tr>
            <td>Photo</td>
            <td>
              : <img src={product.image_url} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
