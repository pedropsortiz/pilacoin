import "./style.css";
import {Link} from "react-router-dom";

export function Menu(){
    return(
        <div className="menu">
            <nav className="menu">
                <Link to="/" className="menu"> Seus Pilas </Link>
            </nav>
            <nav className="menu">
                <Link to="/pilasValidacao" className="menu"> Pilas em Validação </Link>
            </nav>
            <nav className="menu">
                <Link to="/pilasValidados" className="menu"> Pilas Validados </Link>
            </nav>
            <nav className="menu">
                <Link to="/blocosDescobertos" className="menu"> Blocos Descobertos </Link>
            </nav>
            <nav className="menu">
                <Link to="/blocosValidados" className="menu"> Blocos Validados </Link>
            </nav>      
        </div>
    )
}