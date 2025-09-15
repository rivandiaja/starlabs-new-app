<?php

namespace App\Exports;

use App\Models\RegistrationForm;
use App\Models\RegistrationSubmission;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class SubmissionsExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
    protected $form;

    public function __construct(RegistrationForm $form)
    {
        $this->form = $form;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->form->submissions()->latest()->get();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        // Membuat header kolom secara dinamis
        $headers = [];
        foreach ($this->form->fields as $field) {
            $headers[] = ucwords(str_replace('_', ' ', $field));
        }
        $headers[] = 'Menyetujui Ketentuan';
        $headers[] = 'Waktu Mendaftar';
        
        return $headers;
    }

    /**
     * @param RegistrationSubmission $submission
     *
     * @return array
     */
    public function map($submission): array
    {
        // Memetakan data pendaftar ke setiap kolom
        $row = [];
        foreach ($this->form->fields as $field) {
            $row[] = $submission->data[$field] ?? '';
        }
        $row[] = ($submission->data['agreement'] ?? false) ? 'Ya' : 'Tidak';
        $row[] = $submission->created_at->format('d-m-Y H:i:s');

        return $row;
    }
}