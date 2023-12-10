import "./style.css";
import logo from "../../assets/logo.png";

export function Topbar() {
  return (
    <div className="topbar">
        <img src={logo} alt="Logo da Wallet Pila" width="200" />
    </div>
  );
}
