// src/components/Home.js 
import { useNavigate } from "react-router-dom";

const Home = () => { 

    const navigate = useNavigate()

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate("/chat")}>Chat</button>
            <button onClick={() => navigate("/v-call")}>V Call</button>
        </div>
    );
    
     
};

export default Home;
