import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import OfflineLogs from "./pages/reports/OfflineLogs";
import SMSLogs from "./pages/reports/SMSLogs";
import TankParameter from "./pages/TankParameter";
import UsersPage from "./pages/Users";
import Login from "./pages/Login";
// import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        // <BrowserRouter>

        //     <Routes>

        //         {/* Login Route */}
        //         <Route path="/login" element={<Login />} />

        //         {/* Protected Admin Routes */}
        //         <Route
        //             path="/"
        //             element={
        //                 <ProtectedRoute>
        //                     <Layout>
        //                         <Dashboard />
        //                     </Layout>
        //                 </ProtectedRoute>
        //             }
        //         />

        //         <Route
        //             path="/analytics"
        //             element={
        //                 <ProtectedRoute>
        //                     <Layout>
        //                         <Analytics />
        //                     </Layout>
        //                 </ProtectedRoute>
        //             }
        //         />

        //         <Route
        //             path="/notifications"
        //             element={
        //                 <ProtectedRoute>
        //                     <Layout>
        //                         <Notifications />
        //                     </Layout>
        //                 </ProtectedRoute>
        //             }
        //         />

        //         <Route
        //             path="/parameters"
        //             element={
        //                 <ProtectedRoute>
        //                     <Layout>
        //                         <TankParameter />
        //                     </Layout>
        //                 </ProtectedRoute>
        //             }
        //         />

        //         <Route
        //             path="/report/offline-logs"
        //             element={
        //                 <ProtectedRoute>
        //                     <Layout>
        //                         <OfflineLogs />
        //                     </Layout>
        //                 </ProtectedRoute>
        //             }
        //         />

        //         <Route
        //             path="/report/sms-logs"
        //             element={
        //                 <ProtectedRoute>
        //                     <Layout>
        //                         <SMSLogs />
        //                     </Layout>
        //                 </ProtectedRoute>
        //             }
        //         />

        //         <Route
        //             path="/users"
        //             element={
        //                 <ProtectedRoute>
        //                     <Layout>
        //                         <UsersPage />
        //                     </Layout>
        //                 </ProtectedRoute>
        //             }
        //         />

        //     </Routes>

        // </BrowserRouter>
        <BrowserRouter>

            <Layout>

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/parameters" element={<TankParameter />} />
                    <Route path="/report/offline-logs" element={<OfflineLogs />} />
                    <Route path="/report/sms-logs" element={<SMSLogs />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/login" element={<Login />} />
                </Routes>

            </Layout>

        </BrowserRouter>
    );
}

export default App;