"use client"

import {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Eye, EyeOff, Check, X} from "lucide-react"
import {type SignUpFormData, signUpSchema} from "../../lib/validation.ts";
import {Label} from "../ui/label.tsx";
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {getPasswordStrength} from "../../lib/password.ts";

interface SignupFormProps {
    onSubmit: (data: SignUpFormData) => void
    isLoading?: boolean
}

const SignupForm = ({onSubmit, isLoading = false}: SignupFormProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const password = watch("password")
    const confirmPassword = watch("confirmPassword")

    const {checks, score, label} = getPasswordStrength(password || "")
    const passwordsMatch = password === confirmPassword && confirmPassword !== ""

    const onFormSubmit = async (data: SignUpFormData) => {
        await onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 mt-auto">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                    disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        {...register("password")}
                        className={errors.password ? "border-destructive pr-10" : "pr-10"}
                        disabled={isLoading}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground"/>
                        ) : (
                            <Eye className="h-4 w-4 text-muted-foreground"/>
                        )}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                </div>

                {password && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                            <div
                                className={`h-1 flex-1 rounded ${
                                    score < 2 ? "bg-destructive" : score < 4 ? "bg-yellow-500" : "bg-green-500"
                                }`}
                            />
                            <span className="text-muted-foreground">{label}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                            {Object.entries({
                                "At least 8 characters": checks.length,
                                "Uppercase letter": checks.uppercase,
                                "Lowercase letter": checks.lowercase,
                                "Number": checks.number,
                                "Special character": checks.symbol,
                            }).map(([label, valid]) => (
                                <div key={label} className="flex items-center gap-1">
                                    {valid ? (
                                        <Check className="h-3 w-3 text-green-500"/>
                                    ) : (
                                        <X className="h-3 w-3 text-muted-foreground"/>
                                    )}
                                    <span className={valid ? "text-green-600" : "text-muted-foreground"}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...register("confirmPassword")}
                        className={
                            errors.confirmPassword || (confirmPassword && !passwordsMatch) ? "border-destructive pr-10" : "pr-10"
                        }
                        disabled={isLoading}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground"/>
                        ) : (
                            <Eye className="h-4 w-4 text-muted-foreground"/>
                        )}
                        <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                </div>

                {confirmPassword && !passwordsMatch &&
                    <p className="text-sm text-destructive">Passwords do not match</p>}

                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
            </div>

            <Button
                type="submit"
                className="w-full shadow-bubblegum-sm cursor-pointer"
                disabled={confirmPassword === "" || !passwordsMatch}
            >
                {isLoading ? "Creating account..." : "Create account"}
            </Button>
        </form>
    )
}

export default SignupForm