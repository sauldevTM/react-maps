import logo from "../assets/react.svg";

function ReactLogo() {
  return (
    <img
      src={logo}
      alt="React Logotipo"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
      }}
    />
  );
}

export default ReactLogo;
