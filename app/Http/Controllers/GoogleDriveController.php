<?php

namespace App\Http\Controllers;

use Google_Client;
use Google_Service_Drive;
use Google_Service_Drive_DriveFile;
use Illuminate\Http\Request;

class GoogleDriveController extends Controller
{
    /**
     * Helper untuk inisialisasi layanan Google Drive.
     */
    private function getDriveService()
    {
        $client = new Google_Client();
        $credentialsPath = storage_path('app/google-credentials.json');

        if (!file_exists($credentialsPath)) {
            throw new \Exception('File kredensial Google tidak ditemukan.');
        }

        $client->setAuthConfig($credentialsPath);
        // Scope DRIVE diperlukan untuk bisa me-rename file.
        $client->addScope(Google_Service_Drive::DRIVE);
        
        return new Google_Service_Drive($client);
    }

    /**
     * Menampilkan daftar file dan folder, serta menangani pencarian.
     */
    public function listFiles(Request $request)
    {
        try {
            $driveService = $this->getDriveService();
            $folderId = $request->input('folderId', '1-Hq5FzzgSGzeKtvsxXYsM-JaJF29GD9y'); // GANTI DENGAN ID FOLDER ANDA
            $searchTerm = $request->input('search', '');

            $query = "trashed=false";
            if (!empty($searchTerm)) {
                // Jika ada kata kunci, cari file berdasarkan nama di semua folder yang bisa diakses
                $query .= " and name contains '{$searchTerm}'";
            } else {
                // Jika tidak ada, tampilkan isi folder saat ini
                $query .= " and '{$folderId}' in parents";
            }

            $optParams = [
                'pageSize' => 50,
                'fields' => 'files(id, name, mimeType, webViewLink, iconLink, thumbnailLink, size, modifiedTime, createdTime, owners(displayName))',
                'q' => $query,
            ];

            $results = $driveService->files->listFiles($optParams);
            return response()->json($results->getFiles());

        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal mengambil file: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Mengubah nama file atau folder di Google Drive.
     */
    public function renameFile(Request $request, $fileId)
    {
        $request->validate(['newName' => 'required|string|max:255']);
        try {
            $driveService = $this->getDriveService();
            $file = new Google_Service_Drive_DriveFile();
            $file->setName($request->newName);
            
            $driveService->files->update($fileId, $file, ['fields' => 'name']);
            return response()->json(['success' => 'Nama file berhasil diubah.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal mengubah nama file: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Mengarahkan pengguna ke link unduhan langsung.
     */
    public function downloadFile($fileId)
    {
        try {
            $driveService = $this->getDriveService();
            
            $file = $driveService->files->get($fileId, ['fields' => 'webContentLink, webViewLink, exportLinks']);
            
            $downloadUrl = $file->getWebContentLink();
            if (!$downloadUrl) {
                $exportLinks = $file->getExportLinks();
                $downloadUrl = $exportLinks['application/pdf'] ?? $file->getWebViewLink();
            }

            return redirect()->away($downloadUrl);
        } catch (\Exception $e) {
            return redirect()->route('drive.library')->with('error', 'Gagal mengunduh file.');
        }
    }
}

