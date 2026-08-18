import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SettingsView } from './SettingsView'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}))

vi.mock('@/shared/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      updateUser: vi.fn(),
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } } }),
      resetPasswordForEmail: vi.fn(),
      signOut: vi.fn(),
    },
    from: () => ({
      update: () => ({ eq: vi.fn().mockResolvedValue({ error: null }) }),
    }),
  }),
}))

describe('SettingsView Payment Tab & Add Card Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('navigates to Payment Methods tab and renders Add Card button', async () => {
    const user = userEvent.setup()
    render(<SettingsView userType="fan" email="fan@example.com" />)

    const paymentTabBtn = screen.getByRole('button', { name: /payment methods/i })
    await user.click(paymentTabBtn)

    expect(screen.getByText(/no payment methods yet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add card/i })).toBeInTheDocument()
  })

  it('opens Add Card modal when clicking Add Card button', async () => {
    const user = userEvent.setup()
    render(<SettingsView userType="fan" email="fan@example.com" />)

    await user.click(screen.getByRole('button', { name: /payment methods/i }))
    await user.click(screen.getByRole('button', { name: /add card/i }))

    expect(screen.getByRole('heading', { name: /add payment method/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/alex morgan/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/4532 0000 0000 0000/i)).toBeInTheDocument()
  })

  it('validates card inputs and successfully adds a card', async () => {
    const user = userEvent.setup()
    render(<SettingsView userType="fan" email="fan@example.com" />)

    await user.click(screen.getByRole('button', { name: /payment methods/i }))
    await user.click(screen.getByRole('button', { name: /add card/i }))

    // Fill out form
    await user.type(screen.getByPlaceholderText(/alex morgan/i), 'Jane Doe')
    await user.type(screen.getByPlaceholderText(/4532 0000 0000 0000/i), '4242424242424242')
    await user.type(screen.getByPlaceholderText(/mm\/yy/i), '12/28')
    await user.type(screen.getByPlaceholderText(/123/i), '888')

    // Submit form
    await user.click(screen.getByRole('button', { name: /save card/i }))

    await waitFor(
      () => {
        expect(screen.getByText(/payment method added successfully/i)).toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    expect(screen.getByText(/Jane Doe · Expires 12\/28/i)).toBeInTheDocument()
    expect(screen.getByText(/•••• •••• •••• 4242/i)).toBeInTheDocument()
  })

  it('allows removing an added card', async () => {
    const user = userEvent.setup()
    render(<SettingsView userType="fan" email="fan@example.com" />)

    await user.click(screen.getByRole('button', { name: /payment methods/i }))
    await user.click(screen.getByRole('button', { name: /add card/i }))

    await user.type(screen.getByPlaceholderText(/alex morgan/i), 'Jane Doe')
    await user.type(screen.getByPlaceholderText(/4532 0000 0000 0000/i), '4242424242424242')
    await user.type(screen.getByPlaceholderText(/mm\/yy/i), '12/28')
    await user.type(screen.getByPlaceholderText(/123/i), '888')
    await user.click(screen.getByRole('button', { name: /save card/i }))

    await waitFor(() => {
      expect(screen.getByText(/•••• •••• •••• 4242/i)).toBeInTheDocument()
    })

    const removeBtn = screen.getByRole('button', { name: /remove card/i })
    await user.click(removeBtn)

    await waitFor(() => {
      expect(screen.getByText(/payment method removed/i)).toBeInTheDocument()
    })
    expect(screen.getByText(/no payment methods yet/i)).toBeInTheDocument()
  })
})
