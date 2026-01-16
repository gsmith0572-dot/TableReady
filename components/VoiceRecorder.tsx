import React, { useState, useRef } from 'react';
import { parseVoiceOrder } from '../services/geminiService';

interface VoiceRecorderProps {
    onOrderParsed: (items: any[]) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onOrderParsed }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
                await processAudio(blob);
                // Stop all tracks to release mic
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const processAudio = async (blob: Blob) => {
        setIsProcessing(true);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64String = reader.result as string;
                // Remove data URL prefix (e.g., "data:audio/wav;base64,")
                const base64Data = base64String.split(',')[1];
                
                const items = await parseVoiceOrder(base64Data);
                onOrderParsed(items);
                setIsProcessing(false);
            };
        } catch (e) {
            console.error(e);
            setIsProcessing(false);
        }
    };

    return (
        <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={`
                fixed bottom-24 right-4 z-50 flex items-center justify-center size-14 rounded-full shadow-xl transition-all duration-300
                ${isRecording ? 'bg-red-500 recording-pulse scale-110' : 'bg-surface-dark border border-white/10 text-primary'}
                ${isProcessing ? 'animate-spin bg-surface-dark' : ''}
            `}
        >
            {isProcessing ? (
                 <span className="material-symbols-outlined text-[24px]">sync</span>
            ) : isRecording ? (
                <span className="material-symbols-outlined text-[24px] text-white">stop</span>
            ) : (
                <span className="material-symbols-outlined text-[24px]">mic</span>
            )}
        </button>
    );
};