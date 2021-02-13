import React, { useState, useEffect } from 'react';
import Header from './Header';
import API from '../api';

async function fetchProducts() {
  return API.getProducts();
}

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    file: '',
  });
  const [file, setFile] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProducts();

      const products = data.map((item) => {
        return {
          ...item,
          isEditing: false,
        };
      });

      setProducts(products);
    }

    fetchData();
  }, []);

  const handleOnCreateProduct = async (e) => {
    e.preventDefault();
    await API.createProduct(newProduct);

    const data = await fetchProducts();
    setProducts(data);
  };

  const handleOnChangeNewProduct = (event, type) => {
    setNewProduct((state) => ({
      ...state,
      [type]: event.target.value,
    }));
  };

  const handleOnDeleteButton = async (index, id) => {
    const data = [...products];
    data.splice(index, 1);
    setProducts(data);

    await API.deleteProduct(id);
  };

  const handleOnEditButton = async (index) => {
    const data = [...products];

    data[index].isEditing = !data[index].isEditing;

    setProducts(data);
  };

  const handleOnEditProduct = async (event, index, type) => {
    const data = [...products];
    data[index][type] = event.target.value;

    setProducts(data);
  };

  const handleOnSaveEdit = async (index, id) => {
    handleOnEditButton(index);

    const product = products[index];

    delete product.isEditing;

    await API.updateProduct(id, product);
  };

  const handleOnChangeNewImage = async (event, type) => {
    const data = event.target.files[0];

    const url = await API.sendFile(data);
    setNewProduct((state) => ({
      ...state,
      [type]: url,
    }));
  };

  const handleOnEditImage = async (event, index, type) => {
    const data = [...products];
    const file = event.target.files[0];

    const url = await API.sendFile(file);

    data[index][type] = url;

    setProducts(data);
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-new-product-container">
          <form onSubmit={handleOnCreateProduct}>
            <h2>Criar novo produto</h2>
            <input
              type="text"
              placeholder="Nome"
              required
              value={newProduct.name}
              onChange={(e) => handleOnChangeNewProduct(e, 'name')}
            />
            <input
              type="text"
              placeholder="Descrição"
              required
              value={newProduct.description}
              onChange={(e) => handleOnChangeNewProduct(e, 'description')}
            />
            <input
              type="number"
              placeholder="Preço"
              required
              value={newProduct.price}
              onChange={(e) => handleOnChangeNewProduct(e, 'price')}
            />
            <input
              type="file"
              placeholder="Imagem"
              onChange={(e) => handleOnChangeNewImage(e, 'image')}
            />

            <button>Criar produto</button>
          </form>
        </div>

        <div className="dashboard-product-list">
          <h1>Lista de produtos</h1>

          <div>
            {products.map((product, index) => (
              <div key={index} className="product">
                <div>
                  {!product.isEditing ? (
                    <div className="product-info">
                      <img src={product.image}></img>
                      <span>Nome: {product.name}</span>
                      <span>Descrição: {product.description}</span>
                      <span>Preço: {product.price}</span>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={(e) => handleOnEditImage(e, index, 'image')}
                      />
                      <input
                        type="text"
                        placeholder="Nome"
                        required
                        value={product.name}
                        onChange={(e) => handleOnEditProduct(e, index, 'name')}
                      />
                      <input
                        type="text"
                        placeholder="Descrição"
                        required
                        value={product.description}
                        onChange={(e) =>
                          handleOnEditProduct(e, index, 'description')
                        }
                      />
                      <input
                        type="number"
                        placeholder="Preço"
                        required
                        value={product.price}
                        onChange={(e) => handleOnEditProduct(e, index, 'price')}
                      />
                    </>
                  )}
                </div>

                {product.isEditing ? (
                  <button onClick={() => handleOnSaveEdit(index, product.id)}>
                    Salvar
                  </button>
                ) : (
                  <button onClick={() => handleOnEditButton(index)}>
                    Editar
                  </button>
                )}
                <button onClick={() => handleOnDeleteButton(index, product.id)}>
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
