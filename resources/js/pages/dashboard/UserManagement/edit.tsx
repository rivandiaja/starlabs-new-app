import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    role_id: number;
}

interface Props {
    user: User;
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/users' },
    { title: 'Edit', href: '#' },
];

const EditUser: React.FC<Props> = ({ user, roles }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        role_id: user.role_id,
        phone: user.phone || '',
        gender: user.gender || '',
        avatar: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`); // goes to UserController@update
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Edit User" />
        <form onSubmit={submit} className="glass-card p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-white">Edit User</h2>

            <input
            type="text"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="input w-full"
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

            <input
            type="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            className="input w-full"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

            <input
            type="password"
            placeholder="(Leave blank to keep current password)"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            className="input w-full"
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

            <select
            value={data.role_id}
            onChange={e => setData('role_id', e.target.value)}
            className = "mt-1 block w-full rounded-md border border-input bg-background py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                
            >
            <option value="">Select Role</option>
            {roles.map(role => (
                <option key={role.id} value={role.id}>
                {role.name}
                </option>
            ))}
            </select>
            {errors.role_id && <div className="text-red-500 text-sm">{errors.role_id}</div>}

            <input
            type="file"
            onChange={e => setData('avatar', e.target.files?.[0] ?? null)}
            className="input w-full"
            />
            {errors.avatar && <div className="text-red-500 text-sm">{errors.avatar}</div>}

            <button
            type="submit"
            disabled={processing}
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
            Save Changes
            </button>
        </form>
        </AppLayout>
    );
};

export default EditUser;
