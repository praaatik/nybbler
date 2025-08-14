import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Security from './Security'

describe('Security Component', () => {
    const user = userEvent.setup()

    it('renders the security form with all required elements', () => {
        render(<Security/>)

        expect(screen.getByText('Security')).toBeInTheDocument()
        expect(screen.getByText('Manage your account security and password settings.')).toBeInTheDocument()
        expect(screen.getByLabelText('Current Password')).toBeInTheDocument()
        expect(screen.getByLabelText('New Password')).toBeInTheDocument()
        expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Change Password'})).toBeInTheDocument()
    })

    it('initially has the change password button disabled', () => {
        render(<Security/>)
        const changePasswordButton = screen.getByRole('button', {name: 'Change Password'})
        expect(changePasswordButton).toBeDisabled()
    })

    it('enables change password button when all fields are filled', async () => {
        render(<Security/>)

        const currentPasswordInput = screen.getByLabelText('Current Password')
        const newPasswordInput = screen.getByLabelText('New Password')
        const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
        const changePasswordButton = screen.getByRole('button', {name: 'Change Password'})

        await user.type(currentPasswordInput, 'currentpass123')
        await user.type(newPasswordInput, 'newpass123')
        await user.type(confirmPasswordInput, 'newpass123')

        expect(changePasswordButton).toBeEnabled()
    })

    describe('Password visibility toggle', () => {
        it('toggles current password visibility', async () => {
            render(<Security/>)

            const currentPasswordInput = screen.getByLabelText('Current Password')

            const currentPasswordContainer = currentPasswordInput.closest('.relative')
            const currentPasswordToggle = currentPasswordContainer?.querySelector('button')

            expect(currentPasswordInput).toHaveAttribute('type', 'password')

            await user.click(currentPasswordToggle!)
            expect(currentPasswordInput).toHaveAttribute('type', 'text')

            await user.click(currentPasswordToggle!)
            expect(currentPasswordInput).toHaveAttribute('type', 'password')
        })

        it('toggles new password visibility', async () => {
            render(<Security/>)

            const newPasswordInput = screen.getByLabelText('New Password')

            const newPasswordContainer = newPasswordInput.closest('.relative')
            const newPasswordToggle = newPasswordContainer?.querySelector('button')

            expect(newPasswordInput).toHaveAttribute('type', 'password')

            await user.click(newPasswordToggle!)
            expect(newPasswordInput).toHaveAttribute('type', 'text')

            await user.click(newPasswordToggle!)
            expect(newPasswordInput).toHaveAttribute('type', 'password')
        })
        it('toggles confirm password visibility', async () => {
            render(<Security/>)


            const confirmPasswordInput = screen.getByLabelText('Confirm New Password')

            const confirmPasswordContainer = confirmPasswordInput.closest('.relative')
            const newPasswordToggle = confirmPasswordContainer?.querySelector('button')

            expect(confirmPasswordInput).toHaveAttribute('type', 'password')

            await user.click(newPasswordToggle!)
            expect(confirmPasswordInput).toHaveAttribute('type', 'text')

            await user.click(newPasswordToggle!)
            expect(confirmPasswordInput).toHaveAttribute('type', 'password')
        })
    })

    describe('Password validation', () => {
        it('keeps button disabled when new password is missing', async () => {
            render(<Security />)

            const currentPasswordInput = screen.getByLabelText('Current Password')
            const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
            const changePasswordButton = screen.getByRole('button', { name: 'Change Password' })

            await user.type(currentPasswordInput, 'currentpass123')
            await user.type(confirmPasswordInput, 'newpass123')

            expect(changePasswordButton).toBeDisabled()
        })

        it('keeps button disabled when current password is missing', async () => {
            render(<Security />)

            const newPasswordInput = screen.getByLabelText('New Password')
            const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
            const changePasswordButton = screen.getByRole('button', { name: 'Change Password' })

            await user.type(newPasswordInput, 'newpass123')
            await user.type(confirmPasswordInput, 'newpass123')

            expect(changePasswordButton).toBeDisabled()
        })

        it('keeps button disabled when confirm password is missing', async () => {
            render(<Security />)

            const currentPasswordInput = screen.getByLabelText('Current Password')
            const newPasswordInput = screen.getByLabelText('New Password')
            const changePasswordButton = screen.getByRole('button', { name: 'Change Password' })

            await user.type(currentPasswordInput, 'currentpass123')
            await user.type(newPasswordInput, 'newpass123')

            expect(changePasswordButton).toBeDisabled()
        })

        it('shows error when new password is too short', async () => {
            render(<Security/>)

            const currentPasswordInput = screen.getByLabelText('Current Password')
            const newPasswordInput = screen.getByLabelText('New Password')
            const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
            const changePasswordButton = screen.getByRole('button', {name: 'Change Password'})

            await user.type(currentPasswordInput, 'currentpass123')
            await user.type(newPasswordInput, '1234567') // 7 characters
            await user.type(confirmPasswordInput, '1234567')
            await user.click(changePasswordButton)

            expect(screen.getByText('New password must be at least 8 characters')).toBeInTheDocument()
        })

        it('shows error when passwords do not match', async () => {
            render(<Security/>)

            const currentPasswordInput = screen.getByLabelText('Current Password')
            const newPasswordInput = screen.getByLabelText('New Password')
            const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
            const changePasswordButton = screen.getByRole('button', {name: 'Change Password'})

            await user.type(currentPasswordInput, 'currentpass123')
            await user.type(newPasswordInput, 'newpass123')
            await user.type(confirmPasswordInput, 'differentpass123')
            await user.click(changePasswordButton)

            expect(screen.getByText('New passwords do not match')).toBeInTheDocument()
        })

        it('shows error when new password is same as current password', async () => {
            render(<Security/>)

            const currentPasswordInput = screen.getByLabelText('Current Password')
            const newPasswordInput = screen.getByLabelText('New Password')
            const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
            const changePasswordButton = screen.getByRole('button', {name: 'Change Password'})

            await user.type(currentPasswordInput, 'samepass123')
            await user.type(newPasswordInput, 'samepass123')
            await user.type(confirmPasswordInput, 'samepass123')
            await user.click(changePasswordButton)

            expect(screen.getByText('New password must be different from current password')).toBeInTheDocument()
        })

        it('updates input values when typing', async () => {
            render(<Security/>)

            const currentPasswordInput = screen.getByLabelText('Current Password')
            const newPasswordInput = screen.getByLabelText('New Password')
            const confirmPasswordInput = screen.getByLabelText('Confirm New Password')

            await user.type(currentPasswordInput, 'test123')
            await user.type(newPasswordInput, 'newtest123')
            await user.type(confirmPasswordInput, 'newtest123')

            expect(currentPasswordInput).toHaveValue('test123')
            expect(newPasswordInput).toHaveValue('newtest123')
            expect(confirmPasswordInput).toHaveValue('newtest123')
        })

        it('handles successful password change', async () => {
            render(<Security/>)

            const currentPasswordInput = screen.getByLabelText('Current Password')
            const newPasswordInput = screen.getByLabelText('New Password')
            const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
            const changePasswordButton = screen.getByRole('button', {name: 'Change Password'})

            await user.type(currentPasswordInput, 'currentpass123')
            await user.type(newPasswordInput, 'newpass123')
            await user.type(confirmPasswordInput, 'newpass123')
            await user.click(changePasswordButton)

            expect(screen.queryByTestId('password-errors')).not.toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('has proper form labels', () => {
            render(<Security/>)

            expect(screen.getByLabelText('Current Password')).toBeInTheDocument()
            expect(screen.getByLabelText('New Password')).toBeInTheDocument()
            expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument()
        })
        it('has proper input placeholders', () => {
            render(<Security/>)

            expect(screen.getByPlaceholderText('Enter your current password')).toBeInTheDocument()
            expect(screen.getByPlaceholderText('Enter your new password')).toBeInTheDocument()
            expect(screen.getByPlaceholderText('Confirm your new password')).toBeInTheDocument()
        })
        it('toggle buttons have proper type attribute', () => {
            render(<Security/>)

            const toggleButtons = screen.getAllByRole('button').filter(button =>
                button !== screen.getByRole('button', {name: 'Change Password'})
            )

            toggleButtons.forEach(button => {
                expect(button).toHaveAttribute('type', 'button')
            })
        })
    })
})