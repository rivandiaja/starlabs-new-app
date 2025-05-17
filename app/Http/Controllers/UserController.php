<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    // List all users
    public function index()
    {
        //$users = User::select('id', 'name', 'email', 'role')->paginate(10);//
        $users = User::with('role')->get();
        return Inertia::render('dashboard/UserManagement/index', [
            'users' => $users,
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('dashboard/UserManagement/create', [
            'roles' => Role::all(),
        ]);
    }

    // Store new user
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role_id'  => 'required|exists:roles,id',
            'phone'    => 'nullable|string|max:20',
            'gender'   => 'nullable|in:Male,Female,Other',
            'avatar'   => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $data['password'] = Hash::make($data['password']);

        User::create($data);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    // Show edit form
    public function edit(User $user)
    {
        return Inertia::render('dashboard/UserManagement/edit', [
            'user'  => $user->load('role'),
            'roles' => Role::all(),
        ]);
    }

    // Update user
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6',
            'role_id'  => 'required|exists:roles,id',
            'phone'    => 'nullable|string|max:20',
            'gender'   => 'nullable|in:Male,Female,Other',
            'avatar'   => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        if ($data['password']) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    // Delete user
    public function destroy(User $user)
    {
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
