// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Liste des produits avec des catégories ajoutées
    const products = [
        { id: 1, name: 'Produit 1', description: 'Description du produit 1', price: 10, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Produit 2', description: 'Description du produit 2', price: 20, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Produit 3', description: 'Description du produit 3', price: 15, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Produit 4', description: 'Description du produit 4', price: 25, image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Produit 5', description: 'Description du produit 5', price: 30, image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Produit 6', description: 'Description du produit 6', price: 40, image: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Produit 7', description: 'Description du produit 7', price: 18, image: 'https://via.placeholder.com/150' },
        { id: 8, name: 'Produit 8', description: 'Description du produit 8', price: 22, image: 'https://via.placeholder.com/150' },
        { id: 9, name: 'Produit 9', description: 'Description du produit 9', price: 35, image: 'https://via.placeholder.com/150' },
        { id: 10, name: 'Produit 10', description: 'Description du produit 10', price: 35, image: 'https://via.placeholder.com/150' },
        { id: 11, name: 'Produit 11', description: 'Description du produit 11', price: 35, image: 'https://via.placeholder.com/150' },
        { id: 12, name: 'Produit 12', description: 'Description du produit 12', price: 35, image: 'https://via.placeholder.com/150' },
        { id: 13, name: 'Produit 13', description: 'Description du produit 13', price: 35, image: 'https://via.placeholder.com/150' },
        { id: 14, name: 'Produit 14', description: 'Description du produit 13', price: 35, image: 'https://via.placeholder.com/150' },
        { id: 15, name: 'Produit 15', description: 'Description du produit 13', price: 35, image: 'https://via.placeholder.com/150' },
        { id: 16, name: 'Produit 16', description: 'Description du produit 13', price: 35, image: 'https://via.placeholder.com/150' },
    ];

    const onAddToCart = (product) => {
        setCartItems((prevCartItems) => {
            const itemExists = prevCartItems.find((item) => item.id === product.id);
            if (itemExists) {
                return prevCartItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCartItems, { ...product, quantity: 1 }];
            }
        });
    };

    const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Router>
            <div className="app-container">
                <header className="header">
                    <h1 className="logo">Mon E-commerce</h1>
                    <Link to="/cart" className="cart-link">Panier ({cartItems.length})</Link>
                </header>

                <div className="category-filter">
                    <label>Filtrer par catégorie:</label>
                    <select onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="All">Tous</option>
                        <option value="Électronique">Électronique</option>
                        <option value="Vêtements">Vêtements</option>
                        <option value="Maison">Maison</option>
                    </select>
                </div>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="product-list">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="product-card">
                                        <img src={product.image} alt={product.name} className="product-image" />
                                        <h2 className="product-name">{product.name}</h2>
                                        <p className="product-description">{product.description}</p>
                                        <p className="product-price">{product.price} €</p>
                                        <button className="add-to-cart-button" onClick={() => onAddToCart(product)}>Ajouter au panier</button>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <div className="cart">
                                <h2>Panier</h2>
                                {cartItems.length === 0 ? (
                                    <p>Votre panier est vide</p>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <p className="cart-item-name">{item.name}</p>
                                            <p className="cart-item-quantity">Quantité : {item.quantity}</p>
                                            <p className="cart-item-price">Prix : {item.price * item.quantity} €</p>
                                        </div>
                                    ))
                                )}
                                <h3 className="total-price">Total : {totalPrice} €</h3>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
