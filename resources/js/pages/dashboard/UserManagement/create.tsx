import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Role {
    id: number;
    name: string;
}

interface Props {
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/users' },
    { title: 'Add', href: '/users/create' },
];

const CreateUser: React.FC<Props> = ({ roles }) => {
    const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    role_id: '',
    phone: '',
    gender: '',
    avatar: null as File | null,
});

    const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/users'); // will go to UserController@store
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Add User" />
        <form onSubmit={submit} className="glass-card p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-white">Add User</h2>

            <input
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="input w-full"
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

            <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            className="input w-full"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

            <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            className="input w-full"
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

            <select
            value={data.role_id}
            onChange={e => setData('role_id', e.target.value)}
            className="input w-full"
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
            Create
            </button>
        </form>
        </AppLayout>
    );
};

export default CreateUser;
