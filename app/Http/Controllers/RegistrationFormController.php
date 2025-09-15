<?php

namespace App\Http\Controllers;

use App\Models\RegistrationForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RegistrationFormController extends Controller
{

        public function index()
    {
        return Inertia::render('RegistrationForms/Index', [
            // --- PERBAIKAN: Gunakan withCount untuk menghitung jumlah pendaftar ---
            'forms' => RegistrationForm::withCount('submissions')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateForm($request);
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('form_ads', 'public');
        }
        if (isset($validated['is_active']) && $validated['is_active']) {
            RegistrationForm::where('is_active', true)->update(['is_active' => false]);
        }
        RegistrationForm::create($validated);
        return redirect()->route('registration-forms.index')->with('success', 'Formulir berhasil dibuat.');
    }

    public function update(Request $request, RegistrationForm $registrationForm)
    {
        $validated = $this->validateForm($request);
        if ($request->hasFile('image')) {
            if ($registrationForm->image) {
                Storage::disk('public')->delete($registrationForm->image);
            }
            $validated['image'] = $request->file('image')->store('form_ads', 'public');
        }
        if (isset($validated['is_active']) && $validated['is_active']) {
            RegistrationForm::where('id', '!=', $registrationForm->id)->update(['is_active' => false]);
        }
        $registrationForm->update($validated);
        return redirect()->route('registration-forms.index')->with('success', 'Formulir berhasil diperbarui.');
    }

    public function destroy(RegistrationForm $registrationForm)
    {
        if ($registrationForm->image) {
            Storage::disk('public')->delete($registrationForm->image);
        }
        $registrationForm->delete();
        return redirect()->route('registration-forms.index')->with('success', 'Formulir berhasil dihapus.');
    }

    private function validateForm(Request $request)
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
            'show_benefits' => 'boolean',
            'fields' => 'required|array',
            'fields.*' => 'string',
        ]);
    }
}

