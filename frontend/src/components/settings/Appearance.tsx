import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card.tsx";
import { Label } from "../ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx";
import { useTheme } from "../../hooks/use-theme.tsx";

const Appearance = () => {
    const { setMode, mode, setTheme, theme } = useTheme();
    return (
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
                            <SelectTrigger id="mode" data-testid="mode-select">
                                <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="theme">Display Theme</Label>
                        <Select value={theme} onValueChange={setTheme}>
                            <SelectTrigger id="theme" data-testid="theme-select">
                                <SelectValue placeholder="Select theme" />
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
    );
};
export default Appearance;
