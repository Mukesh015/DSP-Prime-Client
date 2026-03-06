import { X, Mail, Phone, Lock, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "../../types/tank";
import { addUser, updateUser } from "../../api/user";

interface Props {
    open: boolean;
    onClose: () => void;
    user: User | null;
}

const AddUserModal = ({ open, onClose, user }: Props) => {

    const [form, setForm] = useState<User>({
        id: 0,
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
    });

    useEffect(() => {
        if (!user) {
            setForm({
                id: 0,
                name: "",
                email: "",
                phone: "",
                role: "",
                password: "",
            });
            return;
        }

        setForm({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            password: "",
        });

    }, [user]);

    if (!open) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdateUser = async () => {
        if (!user) return;
        try {
            await updateUser(form);
            onClose();
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await addUser(form);
            console.log("User added:", res);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-125 rounded-xl p-4 relative shadow-lg">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        {user ? "Update User" : "Add User"}
                    </h2>

                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-4">

                    <div className="flex items-center gap-4">
                        <label className="w-24 text-gray-600">Name</label>
                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 w-full">
                            <User2 size={16} className="text-gray-400 mr-2" />
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-24 text-gray-600">Email</label>
                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 w-full">
                            <Mail size={16} className="text-gray-400 mr-2" />
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-24 text-gray-600">Phone No</label>
                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 w-full">
                            <Phone size={16} className="text-gray-400 mr-2" />
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-24 text-gray-600">Role</label>
                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 w-full">
                            <input
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-24 text-gray-600">Password</label>
                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 w-full">
                            <Lock size={16} className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="outline-none w-full"
                            />
                        </div>
                    </div>

                </div>

                <div className="flex justify-end gap-4 mt-6">

                    <button
                        onClick={() => user ? handleUpdateUser() : handleSubmit()}
                        className="bg-indigo-500 text-white px-6 py-2 rounded-lg"
                    >
                        Save
                    </button>

                    <button
                        onClick={onClose}
                        className="border border-gray-200 px-6 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AddUserModal;