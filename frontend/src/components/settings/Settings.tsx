"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog.tsx";
import { Separator } from "@radix-ui/react-select";
import Security from "./Security.tsx";
import Appearance from "./Appearance.tsx";

interface SettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>Manage your application preferences.</DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-6 py-4">
                    <Appearance />
                    <Separator />
                    <Security />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;
