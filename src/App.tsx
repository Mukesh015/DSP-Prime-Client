import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import OfflineLogs from "./pages/reports/OfflineLogs";
import SMSLogs from "./pages/reports/SMSLogs";

function App() {
    return (
        <BrowserRouter>

            <Layout>

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/report/offline-logs" element={<OfflineLogs />} />
                    <Route path="/report/sms-logs" element={<SMSLogs />} />
                </Routes>

            </Layout>

        </BrowserRouter>
    );
}

export default App;