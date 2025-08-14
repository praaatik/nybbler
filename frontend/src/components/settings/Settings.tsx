"use client"

import {useTheme} from "../../hooks/use-theme.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card.tsx";
import {Separator} from "@radix-ui/react-select";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {Label} from "../ui/label.tsx";
import Security from "./Security.tsx";

interface SettingsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const SettingsModal = ({open, onOpenChange}: SettingsModalProps) => {
    const {setMode, mode, setTheme, theme} = useTheme();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>Manage your application preferences.</DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-6 py-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Appearance</CardTitle>
                            <CardDescription>Customize the look and feel of the application from here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="mode">Display Mode</Label>
                                    <Select value={mode} onValueChange={setMode}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select mode"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="mode">Display Theme</Label>
                                    <Select value={theme} onValueChange={setTheme}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select theme"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">Default</SelectItem>
                                            <SelectItem value="bubblegum">Bubblegum</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Separator/>
                    <Security/>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsModal