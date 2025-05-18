<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    /*public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'gender' => ['nullable', 'in:male,female,other'],
            'avatar' => ['nullable', 'image', 'max:2048'],
        ];
    }*/

    /*public function show()
    {
        $user = auth()->user();
        $avatarUrl = $user->avatar ? Storage::url('avatar/' . $user->avatar) : null;
        return Inertia::render('settings/profile', [
            'user' => $user,
            'avatarUrl' => $avatarUrl,
        ]);
    }*/

    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        //$request->user()->fill($request->validated());
        $user = $request->user();
        $hasChanges = false;

        /*if (!empty($validated['name']) && $user->name !== $validated['name']) {
            $user->name = $validated['name'];
            $hasChanges = true;
        }*/

        if ($request->filled('name') && $request->name !== $user->name) {
        $user->name = $request->name;
        $hasChanges = true;
        }

        /*if (!empty($validated['email']) && $user->email !== $validated['email']) {
            $user->email = $validated['email'];
            $user->email_verified_at = null;
            $hasChanges = true;
        }*/

        if ($request->filled('email') && $request->email !== $user->email) {
            $user->email = $request->email;
            $user->email_verified_at = null;
            $hasChanges = true;
        }
        
        /*if (!empty($validated['gender']) && $user->gender !== $validated['gender']) {
            $user->gender = $validated['gender'];
            $hasChanges = true;
        }*/
        
        if ($request->filled('gender')) {
            $user->gender = $request->gender;
            $hasChanges = true;
        }

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
            $hasChanges = true;
        }


        /*if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }*/

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
