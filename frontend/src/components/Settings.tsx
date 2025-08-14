"use client"

import {useTheme} from "../hooks/use-theme.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog.tsx";
import {Button} from "./ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card.tsx";
import {Separator} from "@radix-ui/react-select";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select.tsx";
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";
import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";


interface SettingsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const SettingsModal = ({open, onOpenChange}: SettingsModalProps) => {
    const {setMode, mode, setTheme, theme} = useTheme();
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    })
    const [passwordErrors, setPasswordErrors] = useState<string[]>([])

    const validatePasswords = () => {
        const errors: string[] = []

        if (!passwordData.currentPassword) {
            errors.push("Current password is required")
        }

        if (!passwordData.newPassword) {
            errors.push("New password is required")
        } else if (passwordData.newPassword.length < 8) {
            errors.push("New password must be at least 8 characters")
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            errors.push("New passwords do not match")
        }

        if (passwordData.currentPassword === passwordData.newPassword) {
            errors.push("New password must be different from current password")
        }

        setPasswordErrors(errors)
        return errors.length === 0
    }

    const handlePasswordChange = () => {
        if (validatePasswords()) {
            // TODO: handle password change here
        }
    }

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

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Security</CardTitle>
                            <CardDescription>Manage your account security and password settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            type={showPasswords.current ? "text" : "password"}
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData((prev) => ({
                                                ...prev,
                                                currentPassword: e.target.value
                                            }))}
                                            placeholder="Enter your current password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPasswords((prev) => ({
                                                ...prev,
                                                current: !prev.current
                                            }))}
                                        >
                                            {showPasswords.current ? <EyeOff className="h-4 w-4"/> :
                                                <Eye className="h-4 w-4"/>}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="newPassword"
                                            type={showPasswords.new ? "text" : "password"}
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData((prev) => ({
                                                ...prev,
                                                newPassword: e.target.value
                                            }))}
                                            placeholder="Enter your new password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPasswords((prev) => ({...prev, new: !prev.new}))}
                                        >
                                            {showPasswords.new ? <EyeOff className="h-4 w-4"/> :
                                                <Eye className="h-4 w-4"/>}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showPasswords.confirm ? "text" : "password"}
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData((prev) => ({
                                                ...prev,
                                                confirmPassword: e.target.value
                                            }))}
                                            placeholder="Confirm your new password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPasswords((prev) => ({
                                                ...prev,
                                                confirm: !prev.confirm
                                            }))}
                                        >
                                            {showPasswords.confirm ? <EyeOff className="h-4 w-4"/> :
                                                <Eye className="h-4 w-4"/>}
                                        </Button>
                                    </div>
                                </div>

                                {passwordErrors.length > 0 && (
                                    <div className="space-y-1">
                                        {passwordErrors.map((error, index) => (
                                            <p key={index} className="text-sm text-destructive">
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                <Button
                                    onClick={handlePasswordChange}
                                    disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                                    className="w-full sm:w-auto"
                                >
                                    Change Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsModal