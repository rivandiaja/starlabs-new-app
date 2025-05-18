import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { CameraIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    email: string;
    gender?: string;
    avatar?: File | null;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name || '',
        email: auth.user.email || '',
        gender: auth.user.gender || '',
        avatar: null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', data.name ?? '');
        formData.append('email', data.email ?? '');
        formData.append('gender', data.gender ?? '');
        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }

        router.post(route('profile.update'), formData, {
            preserveScroll: true,
            forceFormData: true, // ← Important if you're using Inertia v1+
        });

    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('avatar', e.target.files[0]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="max-w-3xl mx-auto w-full space-y-8">

                    {/* Profile Picture Section */}
                    <div className="relative mx-auto w-32 h-32">
                        {/* Circular avatar image */}
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                            <img
                            src=
                            {
                                data.avatar
                                ? URL.createObjectURL(data.avatar)
                                : auth.user.avatar
                                    ? `/storage/${auth.user.avatar}` // ✅ this line
                                    : '/default-avatar.png'
                            }
                            alt="Profile Picture"
                            className="w-full h-full object-cover"
                            />

                        </div>

                        {/* Floating upload button outside the circle */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full shadow-lg z-10"
                            aria-label="Change profile picture"
                        >
                            <CameraIcon className="w-5 h-5" />
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                    </div>


                    {/* Form Section */}
                    <div className="w-full p-6 rounded-lg">
                        <HeadingSmall title="Profile information" description="Update your name and email address" />

                        <form onSubmit={submit} className="space-y-6 mt-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className="text-muted-foreground -mt-4 text-sm">
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Click here to resend the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gender</Label>

                                <select
                                    id="gender"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-input bg-background py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                                >
                                    <option value="">Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                                <InputError className="mt-2" message={errors.gender} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save</Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Saved</p>
                                </Transition>
                            </div>
                        </form>
                    </div>

                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
