import { Link } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFoundMessage, setNotFoundMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://crowded-cyan-sweatshirt.cyclic.app/api/v4/product"
      );
      setProducts(response.data);
      setLoading(false);
      setNotFoundMessage("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setProducts([]);
        setNotFoundMessage("No products found.");
      } else {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const searchProducts = async () => {
    if (search === "") {
      fetchProducts();
    } else {
      try {
        const response = await axios.get(
          `https://crowded-cyan-sweatshirt.cyclic.app/api/v4/product?search=${search}`
        );
        setProducts(response.data);
        setLoading(false);
        if (response.data.length === 0) {
          setNotFoundMessage("No products found.");
        } else {
          setNotFoundMessage("");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProducts([]);
          setNotFoundMessage("No products found.");
        } else {
          console.log(error);
        }
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    searchProducts();
  }, [search]);

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Masukan kata kunci..."
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : products.length === 0 || notFoundMessage ? (
            <tr>
              <td>{notFoundMessage}</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td className="text-right">RP {product.price}</td>
                <td className="text-center">
                  <Link
                    to={`/detail/${product._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/edit/${product._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <Link to="#" className="btn btn-sm btn-danger">
                    Delete
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
