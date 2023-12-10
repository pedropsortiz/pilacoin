import "./style.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export function Home(){

    axios.get(BACKEND_URL + "/pilas")
    .then(function(response){
        console.log("Response: "+response);
    })
    .catch(function(error){
        console.log("Error: "+error);
    })
    .finally(function(){
        console.log("Finally,");
    });


    return (
        <div className="content">
            <h1>Pilas na sua Wallet</h1>
            <div>PILAS</div>
        </div>
    );
}