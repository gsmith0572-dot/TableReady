import React, { useState } from 'react';

interface LogoUploaderProps {
    currentLogo?: string;
    restaurantName: string;
    onLogoChange: (logoUrl: string) => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ currentLogo, restaurantName, onLogoChange }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (PNG, JPG, etc.)');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be smaller than 2MB');
            return;
        }

        setUploading(true);

        // Convert to base64 for now (en producción usarías Firebase Storage)
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            onLogoChange(base64);
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const removeLogo = () => {
        onLogoChange('');
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {/* Logo Preview */}
                <div className="w-24 h-24 rounded-xl bg-white/5 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                    {currentLogo ? (
                        <img src={currentLogo} alt={restaurantName} className="w-full h-full object-cover" />
                    ) : (
                        <span className="material-symbols-outlined text-4xl text-white/40">restaurant</span>
                    )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1 space-y-2">
                    <label className="block">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg cursor-pointer transition-all">
                            <span className="material-symbols-outlined">upload</span>
                            {uploading ? 'Uploading...' : currentLogo ? 'Change Logo' : 'Upload Logo'}
                        </div>
                    </label>
                    {currentLogo && (
                        <button
                            onClick={removeLogo}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-all"
                        >
                            <span className="material-symbols-outlined">delete</span>
                            Remove Logo
                        </button>
                    )}
                    <p className="text-xs text-white/60">PNG, JPG up to 2MB. Square images work best.</p>
                </div>
            </div>
        </div>
    );
};
