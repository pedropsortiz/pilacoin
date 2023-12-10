import { Footer } from "./components/footer";
import { Mainbody } from "./components/mainbody";
import { Topbanner } from "./components/topbanner";
import { Topbar } from "./components/topbar";
import "./global.css"
import { Menu } from "./components/menu";
import { Home } from "./pages/home";

function App() {
  return (
   <>
   <Topbar/>
   <Topbanner/>
   <Mainbody>
      <Menu/>
      <Home/>
   </Mainbody>
   <Footer/>
   </>
  );
}

export default App;
