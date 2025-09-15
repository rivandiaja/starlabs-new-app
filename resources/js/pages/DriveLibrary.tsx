import { useState, useEffect, useMemo, useRef, FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Folder, ChevronRight, Search, List, LayoutGrid, MoreVertical, Download, Edit, Info, Trash2, ExternalLink, X, ArrowLeft, LoaderCircle } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

// Tipe untuk file dari Google Drive API
export interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    webViewLink: string;
    iconLink: string;
    thumbnailLink?: string;
    size?: string | null;
    modifiedTime?: string;
    owners?: { displayName: string }[];
}

const FOLDER_MIME_TYPE = 'application/vnd.google-apps.folder';
const ROOT_FOLDER_ID = '1-Hq5FzzgSGzeKtvsxXYsM-JaJF29GD9y'; // GANTI DENGAN ID FOLDER ANDA

// Helper Functions
const formatBytes = (bytes?: string | null) => {
    if (!bytes || parseInt(bytes) === 0) return '-';
    const b = parseInt(bytes);
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return `${parseFloat((b / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getCsrfToken = () => (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';

// --- KOMPONEN MODAL UNTUK PREVIEW FILE ---
const FilePreviewModal = ({ file, onClose }: { file: DriveFile | null, onClose: () => void }) => {
    if (!file) return null;
    const embedLink = file.webViewLink.replace('/view', '/preview');
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full h-full flex flex-col p-4 sm:p-8">
                <header className="flex-shrink-0 flex items-center justify-between text-white bg-black/20 p-3 rounded-t-xl">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <img src={file.iconLink} alt="icon" className="w-6 h-6 flex-shrink-0"/>
                        <span className="font-semibold truncate">{file.name}</span>
                    </div>
                    <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 font-semibold transition-colors">
                        <ArrowLeft size={18} />
                        Kembali
                    </button>
                </header>
                <div className="flex-grow bg-gray-800 rounded-b-xl overflow-hidden">
                    <iframe src={embedLink} className="w-full h-full border-none" title={file.name}></iframe>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Modal Info ---
const FileInfoModal = ({ isOpen, file, onClose }: { isOpen: boolean, file: DriveFile | null, onClose: () => void }) => {
    if (!isOpen || !file) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div onClick={e => e.stopPropagation()} className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-sm text-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold truncate">{file.name}</h3>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-white/10"><X size={20} /></button>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-white/70">Ukuran:</span><span className="font-semibold">{formatBytes(file.size)}</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-white/70">Terakhir Diubah:</span><span className="font-semibold">{formatDate(file.modifiedTime)}</span></div>
                    <div className="flex justify-between"><span className="text-white/70">Pemilik:</span><span className="font-semibold">{file.owners?.[0]?.displayName || '-'}</span></div>
                </div>
                <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className="mt-6 block w-full text-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold">
                    Buka di Google Drive
                </a>
            </div>
        </div>
    );
};


export default function DriveLibrary() {
    const [files, setFiles] = useState<DriveFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentFolderId, setCurrentFolderId] = useState(ROOT_FOLDER_ID);
    const [folderHistory, setFolderHistory] = useState([{ id: ROOT_FOLDER_ID, name: 'File Library' }]);
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [renamingFile, setRenamingFile] = useState<DriveFile | null>(null);
    const [infoFile, setInfoFile] = useState<DriveFile | null>(null);
    const [newName, setNewName] = useState('');
    const [previewFile, setPreviewFile] = useState<DriveFile | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'File Library', href: route('drive.library') },
    ];
    
    const fetchFiles = (folderId: string, search: string) => {
        setIsLoading(true);
        const query = new URLSearchParams({ folderId, search }).toString();
        fetch(`/api/drive-library?${query}`)
            .then(res => res.json())
            .then((data: DriveFile[] | { error: string }) => {
                if (Array.isArray(data)) setFiles(data); else setFiles([]);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    };

    useEffect(() => {
        const handler = setTimeout(() => { fetchFiles(currentFolderId, searchTerm); }, 300);
        return () => clearTimeout(handler);
    }, [currentFolderId, searchTerm]);

    const { folders, regularFiles } = useMemo(() => {
        const folders = files.filter(file => file.mimeType === FOLDER_MIME_TYPE).sort((a, b) => a.name.localeCompare(b.name));
        const regularFiles = files.filter(file => file.mimeType !== FOLDER_MIME_TYPE).sort((a, b) => a.name.localeCompare(b.name));
        return { folders, regularFiles };
    }, [files]);
    
    const handleFolderClick = (folder: DriveFile) => {
        setFolderHistory([...folderHistory, { id: folder.id, name: folder.name }]);
        setCurrentFolderId(folder.id);
    };

    const handleBreadcrumbClick = (folderId: string, index: number) => {
        if (isLoading) return;
        setFolderHistory(folderHistory.slice(0, index + 1));
        setCurrentFolderId(folderId);
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderId', currentFolderId);

        try {
            await fetch('/api/drive-library/upload', {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': getCsrfToken() },
                body: formData,
            });
            fetchFiles(currentFolderId, searchTerm);
        } catch (error) {
            alert('Gagal mengunggah file.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRenameSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        if (!renamingFile || !newName) return;
        try {
            await fetch(`/api/drive-library/rename/${renamingFile.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
                body: JSON.stringify({ newName }),
            });
            fetchFiles(currentFolderId, searchTerm);
        } finally {
            setRenamingFile(null);
        }
    };

    const ActionMenu = ({ file }: { file: DriveFile }) => {
        return (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-white/10 text-white rounded-md shadow-lg z-10">
                <a href={route('drive.download', file.id)} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/10 w-full"><Download size={14} /> Download</a>
                <button onClick={() => { setRenamingFile(file); setNewName(file.name); setOpenMenuId(null); }} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/10 w-full"><Edit size={14} /> Rename</button>
                <button onClick={() => { setInfoFile(file); setOpenMenuId(null); }} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/10 w-full"><Info size={14} /> Info</button>
                <Link href={`/api/drive-library/delete/${file.id}`} method="delete" as="button" onSuccess={() => fetchFiles(currentFolderId, searchTerm)} onBefore={() => confirm(`Yakin ingin menghapus "${file.name}"?`)} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/10 w-full text-red-400"><Trash2 size={14} /> Delete</Link>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="File Library" />
            <div className="p-4 sm:p-6" onClick={() => setOpenMenuId(null)}>
                <div className="glass-card p-6 rounded-2xl shadow-lg flex flex-col min-h-[80vh]">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
                        <div className="relative w-full sm:w-auto">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                            <input type="text" placeholder="Cari di semua folder..." onChange={(e) => setSearchTerm(e.target.value)} className="input-glass w-full sm:w-64 pl-9"/>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setLayout('grid')} className={`p-2 rounded-md ${layout === 'grid' ? 'bg-blue-500/50' : 'bg-black/20 hover:bg-white/10'}`}><LayoutGrid size={20} /></button>
                            <button onClick={() => setLayout('list')} className={`p-2 rounded-md ${layout === 'list' ? 'bg-blue-500/50' : 'bg-black/20 hover:bg-white/10'}`}><List size={20} /></button>
                            <a href={`https://drive.google.com/drive/folders/${currentFolderId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold transition">
                                <ExternalLink size={20} />
                                <span>Kelola di Drive</span>
                            </a>
                        </div>
                    </div>

                    <nav className="flex items-center text-sm font-semibold text-white/70 mb-6">
                        {folderHistory.map((folder, index) => (
                            <div key={folder.id} className="flex items-center">
                                <button onClick={() => handleBreadcrumbClick(folder.id, index)} className="hover:text-white disabled:text-white disabled:cursor-default" disabled={isLoading || index === folderHistory.length - 1}>
                                    {folder.name}
                                </button>
                                {index < folderHistory.length - 1 && <ChevronRight size={16} className="mx-1.5 text-white/40" />}
                            </div>
                        ))}
                    </nav>

                    {isLoading ? ( <div className="text-center py-20 text-white/70">Memuat file...</div> ) : (
                        <div className="flex-grow">
                            {layout === 'grid' ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
                                    {folders.map(file => (
                                        <div key={file.id} className="group relative">
                                            <button onClick={() => handleFolderClick(file)} className="cursor-pointer aspect-square w-full rounded-lg bg-black/20 flex items-center justify-center overflow-hidden mb-2 border-2 border-transparent group-hover:border-blue-500 transition">
                                                <Folder className="h-16 w-16 text-blue-400"/>
                                            </button>
                                            <p className="text-xs text-center text-white/80 break-words h-8">{file.name}</p>
                                        </div>
                                    ))}
                                    {regularFiles.map(file => (
                                        <div key={file.id} className="group relative">
                                            <button onClick={() => setPreviewFile(file)} className="cursor-pointer aspect-square w-full rounded-lg bg-black/20 flex items-center justify-center overflow-hidden mb-2 border-2 border-transparent group-hover:border-blue-500 transition">
                                                {file.thumbnailLink ? <img src={file.thumbnailLink.replace('=s220', '=s400')} alt={file.name} className="w-full h-full object-cover"/> : <img src={file.iconLink} alt="icon" className="h-12 w-12" />}
                                            </button>
                                            <div className="absolute top-2 right-2" onClick={e => e.stopPropagation()}>
                                                <button onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)} className="p-1 rounded-full bg-black/30 hover:bg-black/50 opacity-0 group-hover:opacity-100"><MoreVertical size={16}/></button>
                                                {openMenuId === file.id && <ActionMenu file={file} />}
                                            </div>
                                            <p className="text-xs text-center text-white/80 break-words h-8">{file.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-white/80">
                                        <thead className="text-gray-400 border-b border-white/20">
                                            <tr>
                                                <th className="py-2 px-3">Nama</th>
                                                <th className="py-2 px-3">Terakhir Diubah</th>
                                                <th className="py-2 px-3">Pemilik</th>
                                                <th className="py-2 px-3 text-right">Ukuran</th>
                                                <th className="py-2 px-3 text-right"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {folders.map(file => (
                                                 <tr key={file.id} className="hover:bg-white/5">
                                                     <td className="py-2 px-3"><button onClick={() => handleFolderClick(file)} className="flex items-center gap-2 hover:underline"><Folder size={16} className="text-blue-400" />{file.name}</button></td>
                                                     <td>{formatDate(file.modifiedTime)}</td>
                                                     <td>{file.owners?.[0]?.displayName || '-'}</td>
                                                     <td className="text-right">-</td>
                                                     <td className="py-2 px-3 text-right relative" onClick={e => e.stopPropagation()}>
                                                        <button onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)} className="p-1 rounded-full hover:bg-white/10"><MoreVertical size={16}/></button>
                                                        {openMenuId === file.id && <ActionMenu file={file} />}
                                                     </td>
                                                 </tr>
                                            ))}
                                            {regularFiles.map(file => (
                                                 <tr key={file.id} className="hover:bg-white/5">
                                                     <td className="py-2 px-3">
                                                         <button onClick={() => setPreviewFile(file)} className="flex items-center gap-2 hover:underline">
                                                             <img src={file.iconLink} className="w-4 h-4"/>{file.name}
                                                         </button>
                                                     </td>
                                                     <td className="py-2 px-3">{formatDate(file.modifiedTime)}</td>
                                                     <td className="py-2 px-3">{file.owners?.map(o => o.displayName).join(', ') || '-'}</td>
                                                     <td className="py-2 px-3 text-right">{formatBytes(file.size)}</td>
                                                     <td className="py-2 px-3 text-right relative" onClick={e => e.stopPropagation()}>
                                                        <button onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)} className="p-1 rounded-full hover:bg-white/10"><MoreVertical size={16}/></button>
                                                        {openMenuId === file.id && <ActionMenu file={file} />}
                                                     </td>
                                                 </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                    {(folders.length === 0 && regularFiles.length === 0) && !isLoading && ( <div className="text-center py-20 text-white/70">Folder ini kosong.</div> )}
                </div>
            </div>

            <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
            
            {renamingFile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setRenamingFile(null)}>
                    <form onSubmit={handleRenameSubmit} onClick={e => e.stopPropagation()} className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4 text-white">Ubah Nama</h3>
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="input-glass w-full mb-4 text-white"/>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setRenamingFile(null)} className="px-4 py-2 rounded-md text-white hover:bg-white/10">Batal</button>
                            <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white">Simpan</button>
                        </div>
                    </form>
                </div>
            )}
            
            <FileInfoModal isOpen={!!infoFile} onClose={() => setInfoFile(null)} file={infoFile} />
        </AppLayout>
    );
}

