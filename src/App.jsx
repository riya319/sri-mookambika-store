
import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Samsung 4K Smart TV",
    brand: "Samsung",
    category: "Televisions",
    price: 42999,
    oldPrice: 54999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=700",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Double Door Refrigerator",
    brand: "LG",
    category: "Refrigerators",
    price: 32990,
    oldPrice: 38990,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=700",
    badge: "Great Deal",
  },
  {
    id: 3,
    name: "Front Load Washing Machine",
    brand: "IFB",
    category: "Washing Machines",
    price: 27990,
    oldPrice: 33990,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=700",
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    brand: "Sony",
    category: "Audio",
    price: 4990,
    oldPrice: 6990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    badge: "Trending",
  },
  {
    id: 5,
    name: "Automatic Coffee Maker",
    brand: "Philips",
    category: "Home Appliances",
    price: 6499,
    oldPrice: 7999,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700",
    badge: "Special Price",
  },
  {
    id: 6,
    name: "Smartphone",
    brand: "Samsung",
    category: "Mobiles",
    price: 18999,
    oldPrice: 22999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",
    badge: "Popular",
  },
];

const categories = [
  "All Products",
  "Mobiles",
  "Televisions",
  "Refrigerators",
  "Washing Machines",
  "Audio",
  "Home Appliances",
];

const WHATSAPP_NUMBER = "91YOURNUMBER";
const STORE_PHONE = "+91YOURNUMBER";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All Products" || product.category === category;

    const searchableText =
      `${product.name} ${product.brand} ${product.category}`.toLowerCase();

    return (
      matchesCategory &&
      searchableText.includes(search.toLowerCase().trim())
    );
  });

  function chooseCategory(item) {
    setCategory(item);
    setSidebarOpen(false);
  }

  function goToProducts() {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function openWhatsApp(message) {
    if (WHATSAPP_NUMBER === "91YOURNUMBER") {
      alert("Please add your store's WhatsApp number in App.jsx first.");
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function enquire(product) {
    const message =
      `Hello Sri Mookambika Enterprises! I am interested in ${product.name} by ${product.brand}. ` +
      `The listed price is ₹${product.price.toLocaleString("en-IN")}. ` +
      "Please confirm availability and your best price.";

    openWhatsApp(message);
  }

  return (
    <div className="store">
      {/* Announcement */}
      <div className="announcement">
        Welcome to Sri Mookambika Enterprises
        <span> · Quality electronics, trusted service</span>
      </div>

      {/* Main header: menu button is in normal page flow */}
      <header className="header">
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={sidebarOpen}
          aria-controls="store-sidebar"
        >
          {sidebarOpen ? "×" : "☰"}
        </button>

        {/* Text-only branding; no SM square logo */}
        <a
          className="brand"
          href="#home"
          onClick={() => {
            setCategory("All Products");
            setSearch("");
            setSidebarOpen(false);
          }}
        >
          <span className="brand-text">
            <strong>SRI MOOKAMBIKA</strong>
            <small>ENTERPRISES</small>
          </span>
        </a>

        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search TVs, mobiles, appliances..."
            aria-label="Search products"
          />
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <a className="contact-link" href={`tel:${STORE_PHONE}`}>
          <span>☎</span> Contact Us
        </a>
      </header>

      {/* Sliding left sidebar */}
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      <aside
        id="store-sidebar"
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
        aria-hidden={!sidebarOpen}
        inert={!sidebarOpen}
      >
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <strong>SRI MOOKAMBIKA</strong>
            <small>ENTERPRISES</small>
          </div>
          <button
            type="button"
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <p className="sidebar-label">MENU</p>

        <button
          type="button"
          className="sidebar-link"
          onClick={() => {
            setCategory("All Products");
            setSearch("");
            setSidebarOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="sidebar-icon">⌂</span>
          Home
        </button>

        <p className="sidebar-label">SHOP BY CATEGORY</p>

        <nav className="sidebar-nav" aria-label="Sidebar product categories">
          {categories.map((item, index) => (
            <button
              type="button"
              key={item}
              className={`sidebar-link ${category === item ? "sidebar-active" : ""}`}
              onClick={() => chooseCategory(item)}
            >
              <span className="sidebar-icon">
                {["▦", "▯", "▣", "❄", "◉", "♫", "⌂"][index]}
              </span>
              <span>{item}</span>
              {category === item && <span className="sidebar-dot">●</span>}
            </button>
          ))}
        </nav>

        <p className="sidebar-label">CONTACT</p>

        <a className="sidebar-link" href={`tel:${STORE_PHONE}`}>
          <span className="sidebar-icon">☎</span>
          Call the Store
        </a>

        <button
          type="button"
          className="sidebar-link"
          onClick={() =>
            openWhatsApp(
              "Hello Sri Mookambika Enterprises! I would like to enquire about your products."
            )
          }
        >
          <span className="sidebar-icon">↗</span>
          WhatsApp Us
        </button>

        <div className="sidebar-help">
          <strong>Need help choosing?</strong>
          <p>Ask us about products, availability and current prices.</p>
          <button
            type="button"
            onClick={() =>
              openWhatsApp(
                "Hello Sri Mookambika Enterprises! I need help choosing a product."
              )
            }
          >
            Talk to our team ↗
          </button>
        </div>
      </aside>

      {/* Quick categories */}
      <nav className="category-nav" aria-label="Product categories">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            className={`category ${category === item ? "category-active" : ""}`}
            onClick={() => chooseCategory(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">
              YOUR EVERYDAY ELECTRONICS DESTINATION
            </span>

            <h1>
              Upgrade your world with <span>better tech.</span>
            </h1>

            <p>
              Discover electronics and home appliances for every home.
              Browse your favourites and contact us for today's best price.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={goToProducts}
            >
              Explore Products <span>→</span>
            </button>

            <div className="hero-points">
              <span>✓ Trusted service</span>
              <span>✓ Personal assistance</span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1000"
              alt="Smart television for your home"
            />
            <div className="hero-tag">
              <span>SMARTER CHOICES</span>
              <strong>Made for your home.</strong>
            </div>
          </div>
        </section>

        <section className="benefits" aria-label="Store benefits">
          <div className="benefit">
            <span className="benefit-icon">◇</span>
            <div>
              <strong>Quality Products</strong>
              <small>Explore trusted brands</small>
            </div>
          </div>

          <div className="benefit">
            <span className="benefit-icon">₹</span>
            <div>
              <strong>Great Value</strong>
              <small>Ask us for current offers</small>
            </div>
          </div>

          <div className="benefit">
            <span className="benefit-icon">♡</span>
            <div>
              <strong>Personal Support</strong>
              <small>We're here to help</small>
            </div>
          </div>

          <div className="benefit">
            <span className="benefit-icon">☎</span>
            <div>
              <strong>Easy Enquiries</strong>
              <small>Call or WhatsApp us</small>
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR COLLECTION</span>
              <h2>
                {category === "All Products" ? "Find your next favourite" : category}
              </h2>
              <p>Explore electronics picked for everyday living.</p>
            </div>

            <span className="product-count">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <span className="product-badge">{product.badge}</span>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                </div>

                <div className="product-info">
                  <span className="product-brand">{product.brand}</span>
                  <h3>{product.name}</h3>

                  <div className="price-row">
                    <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                    <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
                  </div>

                  <p className="price-note">
                    Contact us to confirm today's price
                  </p>

                  <button
                    type="button"
                    className="whatsapp-button"
                    onClick={() => enquire(product)}
                  >
                    WhatsApp Enquiry <span>↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try another search or choose a different category.</p>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Products");
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </section>

        <section className="contact-banner">
          <div>
            <span className="eyebrow">NEED HELP CHOOSING?</span>
            <h2>Let's find the right product for you.</h2>
            <p>
              Contact our team for product details, availability and pricing.
            </p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              openWhatsApp(
                "Hello Sri Mookambika Enterprises! I would like to enquire about your products."
              )
            }
          >
            Chat on WhatsApp ↗
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <strong>SRI MOOKAMBIKA ENTERPRISES</strong>
          <p>Your destination for electronics and home appliances.</p>
        </div>
        <small>
          © {new Date().getFullYear()} Sri Mookambika Enterprises. All rights
          reserved.
        </small>
      </footer>
    </div>
  );
}

export default App;
