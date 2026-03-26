// src/pages/MyCakes.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MyCakes() {
  const navigate = useNavigate();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const userId = localStorage.getItem("id"); // 当前 baker id
        if (!userId) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5000/api/cakes?userId=${userId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch cakes");
        }

        setCakes(data); // 假设后端返回的是数组
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  if (loading) return <p className="page">Loading your cakes...</p>;
  if (error) return <p className="page">Error: {error}</p>;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">My Cake Gallery</h1>
          <p className="page-subtitle">Manage and showcase your creations</p>
        </div>
        <button className="primary-btn" onClick={() => navigate("/cakes/new")}>
          + Add New Cake
        </button>
      </header>

      <section className="grid-cards">
        {cakes.map((c) => (
          <article key={c._id} className="cake-card">
            <div className="cake-thumb" />
            <div className="cake-body">
              <div className="cake-header">
                <h3>{c.name}</h3>
                <span className="cake-price">${c.price}</span>
              </div>
              <div className="cake-metrics">
                <div className="badge">{c.orders || 0} orders</div>
                <div className="badge">⭐ {c.rating || 0}</div>
              </div>
              <div className="cake-footer">
                <span className="revenue-label">Total Revenue</span>
                <span className="revenue-value">${c.revenue || 0}</span>
              </div>
            </div>
            <button
              className="pill-button full"
              onClick={() => navigate(`/cakes/${c._id}/edit`)}
            >
              Edit Cake
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}