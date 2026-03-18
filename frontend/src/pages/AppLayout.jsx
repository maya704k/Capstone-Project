import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./styles.css";
import logoHorizontal from "../assets/logo_horizontal.png"; 

export default function AppLayout() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("bakerToken");
    navigate("/baker/sign-in", { replace: true });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          {/* using the horizontal logo here */}
          <img 
            src={logoHorizontal} 
            alt="CakeCraft Logo" 
            style={{ width: '100%', height: 'auto', maxWidth: '180px' }} 
          />
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="nav-link">
            <span className="nav-icon">🏠</span> Dashboard
          </NavLink>
          <NavLink to="/cakes" className="nav-link">
            <span className="nav-icon">🍰</span> My Cakes
          </NavLink>
          <NavLink to="/orders" className="nav-link">
            <span className="nav-icon">📦</span> Orders
          </NavLink>
          <NavLink to="/settings" className="nav-link">
            <span className="nav-icon">⚙️</span> Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="avatar-circle" />
            <div className="user-info">
              <div className="user-name">Nelia Baker</div>
              <div className="user-role">Baker</div>
            </div>
          </div>
          <button className="signout-link" onClick={handleSignOut}>
            ⟵ Sign Out
          </button>
        </div>
      </aside>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}