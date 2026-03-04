import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

function App() {
    return (
        <BrowserRouter>

            <Layout>

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>

            </Layout>

        </BrowserRouter>
    );
}

export default App;