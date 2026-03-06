import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await login(email, password);
            if (res.success) {
                localStorage.setItem("token", res.data.token);
                navigate("/");
            } else {
                alert(res.message || "Login failed");
            }
        } catch (error) {
            console.error(error);
            alert(" Login failed. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-[420px] bg-white shadow-lg rounded-xl p-8">

                {/* Header */}
                <div className="flex flex-col items-center mb-8">

                    <div className="bg-indigo-100 p-3 rounded-full mb-3">
                        <Shield className="text-indigo-600" size={28} />
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-700">
                        Admin Login
                    </h1>

                    <p className="text-sm text-gray-500">
                        Sign in to access the dashboard
                    </p>

                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>

                        <label className="text-sm text-gray-600">Email</label>

                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 mt-1">

                            <Mail size={18} className="text-gray-400 mr-2" />

                            <input
                                type="email"
                                placeholder="admin@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full outline-none"
                                required
                            />

                        </div>

                    </div>

                    {/* Password */}
                    <div>

                        <label className="text-sm text-gray-600">Password</label>

                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 mt-1">

                            <Lock size={18} className="text-gray-400 mr-2" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full outline-none"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} className="text-gray-400" />
                                ) : (
                                    <Eye size={18} className="text-gray-400" />
                                )}
                            </button>

                        </div>

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-medium transition"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Login;