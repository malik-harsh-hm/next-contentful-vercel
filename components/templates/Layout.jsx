import Link from "next/link";
import Login from "../atoms/Login";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Login />
        <Link href="/">
          <a>
            <h1>
              <span>Good</span>
              <span>Food Recipes</span>
            </h1>
            <h2>Spread The Joy</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>Copyright 2023</p>
      </footer>
    </div>
  );
}