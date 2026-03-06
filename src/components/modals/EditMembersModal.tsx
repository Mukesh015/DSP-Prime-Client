import { useEffect, useState } from "react";
import { X, Check, Trash2, Plus, ArrowBigLeft, ChevronLeft } from "lucide-react";
import type { User } from "../../types/tank";
import { addUser, deleteUser, getAllUsers, updateUser } from "../../api/user";

interface Member extends User {
    isNew?: boolean;
}

interface Props {
    open: boolean;
    onClose: () => void;
}

const EditMembersModal = ({ open, onClose }: Props) => {

    const [members, setMembers] = useState<Member[]>([]);
    const [editId, setEditId] = useState<number | null>(null);

    const fetchAllMembers = async () => {
        try {
            const res = await getAllUsers();
            setMembers(res.data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    const handleChange = (
        id: number,
        field: "name" | "phone",
        value: string
    ) => {

        setMembers((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, [field]: value } : m
            )
        );

    };

    /* -------------------------
        Save Member
    ------------------------- */

    const handleSave = async (member: Member) => {
        try {
            if (member.isNew) {
                await addUser(member);  
            } else {
                await updateUser(member);
            }
            setEditId(null);
        } catch (error) {
            console.error(error);
        }
    };

    /* -------------------------
        Delete Member
    ------------------------- */

    const handleDelete = async (id: number) => {

        try {

            await deleteUser(id);
            setMembers((prev) => prev.filter((m) => m.id !== id));

        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        fetchAllMembers();
    }, []);

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-187.5 rounded-xl shadow-lg">

                {/* HEADER */}

                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">

                    <h2 className="text-lg font-semibold">Edit Members</h2>

                    <button onClick={onClose}>
                        <X size={20} />
                    </button>

                </div>

                {/* TABLE */}

                <div className="p-6">

                    <table className="w-full text-sm">

                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="px-4 py-3 text-left">ID</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Phone</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {members.map((m, i) => {

                                const editing = editId === m.id;

                                return (

                                    <tr key={m.id} className="border-b border-gray-200">

                                        <td className="px-4 py-3">{i + 1}</td>

                                        <td className="px-4 py-3">

                                            {editing ? (

                                                <input
                                                    value={m.name}
                                                    onChange={(e) =>
                                                        handleChange(m.id, "name", e.target.value)
                                                    }
                                                    className="border border-gray-200 rounded px-3 py-1 w-full"
                                                />

                                            ) : (
                                                m.name
                                            )}

                                        </td>

                                        <td className="px-4 py-3">

                                            {editing ? (

                                                <input
                                                    value={m.phone}
                                                    onChange={(e) =>
                                                        handleChange(m.id, "phone", e.target.value)
                                                    }
                                                    className="border border-gray-200 rounded px-3 py-1 w-full"
                                                />

                                            ) : (
                                                m.phone
                                            )}

                                        </td>

                                        <td className="px-4 py-3 flex gap-2">

                                            {editing ? (

                                                <button
                                                    onClick={() => handleSave(m)}
                                                    className="bg-green-500 text-white p-2 rounded"
                                                >
                                                    <Check size={16} />
                                                </button>

                                            ) : (

                                                <button
                                                    onClick={() => setEditId(m.id)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>

                                            )}

                                            <button
                                                onClick={() => handleDelete(m.id)}
                                                className="bg-red-500 text-white p-2 rounded"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default EditMembersModal;