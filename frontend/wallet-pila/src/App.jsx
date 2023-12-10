import { Footer } from "./components/footer";
import { Mainbody } from "./components/mainbody";
import { Topbanner } from "./components/topbanner";
import { Topbar } from "./components/topbar";
import "./global.css"
import { Menu } from "./components/menu";
import { Routes, Route } from "react-router-dom";
import { PilasValidacao } from "./pages/pilas_validacao";
import { PilasValidados } from "./pages/pilas_validados";
import { BlocosValidados } from "./pages/blocos_validados";
import { BlocosDescobertos } from "./pages/blocos_descobertos";
import { Home } from "./pages/home";

function App() {
  return (
   <>
   <Topbar/>
   <Topbanner/>
   <Mainbody>
      <Menu/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/pilasValidacao" element={<PilasValidacao/>}/>
        <Route path="/pilasValidados" element={<PilasValidados/>}/>
        <Route path="/blocosValidados" element={<BlocosValidados/>}/>
        <Route path="/blocosDescobertos" element={<BlocosDescobertos/>}/>
      </Routes>
   </Mainbody>
   <Footer/>
   </>
  );
}

export default App;
