import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, updateUser } from "../api/user";
import { Pencil, Trash2 } from "lucide-react";
import AddUserModal from "../components/modals/AddUserModal";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
}

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [updatedUser, setUpdatedUser] = useState<User | null>(null);

    console.log('updatedUser', updatedUser)

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.data); // <-- using .data
            setPagination(res.pagination);

        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUser(userId);
            await fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error("Error deleting user", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [page, limit]);

    const totalPages = pagination
        ? Math.ceil(pagination.total / pagination.limit)
        : 1;

    return (
        <div className="bg-white rounded-xl shadow-sm">

            {/* Header */}

            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">

                <h2 className="text-xl font-semibold text-gray-700">
                    Users
                </h2>

                <div className="flex gap-3">

                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
                    >
                        Add User
                    </button>

                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
                        Export
                    </button>

                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
                        Print Table
                    </button>

                </div>
            </div>

            {/* Filter */}

            <div className="flex justify-between items-center px-6 py-4">

                <div className="flex items-center gap-2 text-gray-600">

                    Show

                    <select
                        className="border border-gray-200 rounded px-2 py-1"
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>

                    entries

                </div>

                <div className="flex items-center gap-2">

                    <span className="text-gray-600">Search:</span>

                    <input
                        className="border border-gray-200 rounded px-3 py-1"
                        placeholder="Search..."
                    />

                </div>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left">SL. NO.</th>
                            <th className="px-6 py-3 text-left">NAME</th>
                            <th className="px-6 py-3 text-left">E-MAIL</th>
                            <th className="px-6 py-3 text-left">PHONE NUMBER</th>
                            <th className="px-6 py-3 text-left">ROLE</th>
                            <th className="px-6 py-3 text-left">ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className="border-b border-gray-200 hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">
                                    {(page - 1) * limit + index + 1}
                                </td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4 flex gap-3">
                                    <button
                                        onClick={() => {
                                            setUpdatedUser(user)
                                            setOpenModal(true);
                                        }}
                                        className="text-indigo-500"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-500">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* Footer */}

            <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500">

                <span>

                    Showing {(page - 1) * limit + 1} to{" "}
                    {Math.min(page * limit, pagination?.total || 0)} of{" "}
                    {pagination?.total || 0} entries

                </span>

                {/* Pagination */}

                <div className="flex items-center gap-2">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 border border-gray-200 rounded disabled:opacity-40"
                    >
                        ‹ Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(Math.max(0, page - 2), page + 1)
                        .map((p) => (

                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`px-3 py-1 rounded ${p === page
                                    ? "bg-indigo-500 text-white"
                                    : "border border-gray-200"
                                    }`}
                            >
                                {p}
                            </button>

                        ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 border border-gray-200 rounded disabled:opacity-40"
                    >
                        Next ›
                    </button>

                </div>

            </div>
            <AddUserModal
                open={openModal}
                user={updatedUser}
                onClose={() => {
                    setOpenModal(false)
                    fetchUsers();
                }}
            />

        </div>
    );
};

export default UsersPage;