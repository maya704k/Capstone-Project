import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCake() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id"); // current id
 
  console.log("Current userId:", userId);
  // keep same style
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    servings: "",
    prepTime: "",
    size: "",
    shape: "",
    flavor: "",
    filling: "",
    tiers: "",
    frosting: "",
    userId: userId, 
  });

  // deal change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Please fill in required fields: Name and Price");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Your cake is now live.");
        navigate("/cakes"); 
      } else {
        alert(data.error || "Failed to save cake");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server is not responding. Check your connection.");
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <header className="page-header">
        <div className="page-header-left">
          <button className="icon-back" type="button" onClick={() => navigate(-1)}>⟵</button>
          <div>
            <h1 className="page-title">Add New Cake</h1>
            <p className="page-subtitle">Create a new cake listing for customers</p>
          </div>
        </div>
        <div className="page-header-actions">
          <button className="ghost-btn" type="button" onClick={() => navigate(-1)}>Cancel</button>
          <button className="primary-btn" onClick={handleSubmit}>Save &amp; Publish</button>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="long-form">
        {/* photo*/}
        <section className="card">
          <h3 className="card-title">Cake Images</h3>
          <p className="card-subtitle">Upload high-quality photos (Logic pending: Cloudinary/Multer)</p>
          <div className="image-upload-main">
            <div className="image-drop">
              <span className="upload-icon">⬆</span>
              <p>Main Image Slot</p>
            </div>
          </div>
        </section>

        {/* info */}
        <section className="card">
          <h3 className="card-title">Basic Information</h3>
          <div className="grid-2 gap-lg">
            <label className="field full">
              <span className="field-label">Cake Name <span className="required">*</span></span>
              <input
                name="name"
                className="input"
                placeholder="e.g., Red Velvet Dream Cake"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <label className="field">
            <span className="field-label">Description <span className="required">*</span></span>
            <textarea
              name="description"
              className="textarea"
              placeholder="Describe your cake..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>

          <div className="grid-3 gap-lg">
            <label className="field">
              <span className="field-label">Base Price ($) <span className="required">*</span></span>
              <div className="input-with-prefix">
                <span>$</span>
                <input
                  name="price"
                  type="number"
                  className="input no-padding"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
            <label className="field">
              <span className="field-label">Servings</span>
              <input
                name="servings"
                className="input"
                placeholder="e.g., 10–12 people"
                value={formData.servings}
                onChange={handleChange}
              />
            </label>
            <label className="field">
              <span className="field-label">Preparation Time</span>
              <input
                name="prepTime"
                className="input"
                placeholder="e.g., 24–48 hours"
                value={formData.prepTime}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        {/* size */}
        <section className="card">
          <h3 className="card-title">Cake Specifications</h3>
          <div className="grid-3 gap-lg">
            {[
              { label: "Size", key: "size" },
              { label: "Shape", key: "shape" },
              { label: "Flavour", key: "flavor" },
              { label: "Filling", key: "filling" },
              { label: "Number of Tiers", key: "tiers" },
              { label: "Frosting Type", key: "frosting" },
            ].map((item) => (
              <label key={item.key} className="field">
                <span className="field-label">{item.label}</span>
                <input
                  name={item.key}
                  className="input"
                  value={formData[item.key]}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>
        </section>

        {/* choice */}
        <section className="card">
          <h3 className="card-title">Customization Options</h3>
          <p className="card-subtitle">Allow customers to personalize this cake</p>
          <div className="checkbox-column">
            <label className="checkbox">
              <input type="checkbox" />{" "}
              <span>
                Allow custom messages
                <span className="checkbox-sub">Customers can add personalized text</span>
              </span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />{" "}
              <span>
                Allow color customization
                <span className="checkbox-sub">Customers can choose cake colors</span>
              </span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />{" "}
              <span>
                Rush orders available
                <span className="checkbox-sub">Prepared in under 24 hours (extra fees)</span>
              </span>
            </label>
            <label className="checkbox">
              <input type="checkbox" />{" "}
              <span>
                Dietary options
                <span className="checkbox-sub">Gluten-free, vegan, sugar-free options</span>
              </span>
            </label>
          </div>
        </section>
      </form>
    </div>
  );
}