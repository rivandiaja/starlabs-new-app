import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: {
    name: string;
  }; // or role.name if using relation
}

interface Props {
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/users' },
];

const Users: React.FC<Props> = ({ users }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="User Management" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="glass-card p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">All Users</h3>
                    <a
                    href="/users/create"
                    className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                    + Add User
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                    <thead className="text-white border-b border-white">
                        <tr>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Role</th>
                        <th className="py-2 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                        <tr key={user.id} className="hover:bg-star-light/5 transition">
                            <td className="py-3 px-4 font-medium">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">{user.role?.name}</td>
                            <td className="py-3 px-4 text-right space-x-2">
                                <Link
                                href={`/users/${user.id}/edit`}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition"
                                >
                                Edit
                                </Link>

                                <Link
                                href={`/users/${user.id}`}
                                method="delete"
                                /*onClick={() => {
                                    if (confirm('Are you sure you want to delete this user?')) {
                                    herf(`/users/${user.id}`);
                                    }
                                }}*/
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
                                >
                                Delete
                                </Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </AppLayout>
    );
};

export default Users;
