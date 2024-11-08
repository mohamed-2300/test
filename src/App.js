// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Liste des produits avec des catégories ajoutées
    const products = [
        { id: 1, name: 'Oppo RENO12 F 5G', category: 'Électronique', description: "Description d'oppo", price: 10, image: '/4.jpg' },
        { id: 2, name: 'JACKET NOIR', category: 'Vêtements', description: 'Description du jacket noir', price: 20, image: '/1.jpg' },
        { id: 3, name: 'matelas & linge', category: 'Maison', description: 'Description de matlete', price: 15, image: '/7.jpg' },
        { id: 4, name: 'sumsung galaxy A34', category: 'Électronique', description: 'Description de sumsung a34', price: 25, image: '/5.jpg' },
        { id: 5, name: 'JACKET BLEU', category: 'Vêtements', description: 'Description du jecket bleu', price: 30, image: '/3.jpg' },
        { id: 6, name: 'meubles', category: 'Maison', description: 'Description des meubles', price: 40, image: '/8.jpg' },
        { id: 7, name: 'XIAOMI redmi 12', category: 'Électronique', description: 'Description xiaomi redmi 12', price: 18, image: '/6.jpg' },
        { id: 8, name: 'TRICKO NOIR', category: 'Vêtements', description: 'Description du tricko noir', price: 22, image: '/2.jpg' },
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
