import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            margin: 0,
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "28px",
            marginTop: "8px",
            marginBottom: "12px",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "#667085",
            marginBottom: "24px",
          }}
        >
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: "8px",
            background: "#2563EB",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;