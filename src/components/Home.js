// src/components/Home.js 
import { useNavigate } from "react-router-dom";

const Home = () => { 

    const navigate = useNavigate()

    return (
        <> 
            <button onClick={() => navigate("/chat")}>Chat</button>
            <button onClick={() => navigate("/v-call")}>V Call</button>
        </>
    );
    
     
};

export default Home;
