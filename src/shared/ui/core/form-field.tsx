import * as React from 'react'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  id: string
  name?: string
  label?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  value?: string
  defaultValue?: string
  autoComplete?: string
  pattern?: string
  title?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  /** Override the default input with a custom child (e.g. a textarea) */
  children?: React.ReactNode
  className?: string
  inputClassName?: string
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      placeholder,
      hint,
      error,
      required,
      disabled,
      value,
      defaultValue,
      autoComplete,
      pattern,
      title,
      onChange,
      onBlur,
      children,
      className,
      inputClassName,
    },
    ref
  ) => {
    const hasError = Boolean(error)

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground/80 select-none"
          >
            {label}
            {required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        {children ? (
          children
        ) : (
          <input
            ref={ref}
            id={id}
            name={name ?? id}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            autoComplete={autoComplete}
            pattern={pattern}
            title={title}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${id}-error` : hint ? `${id}-hint` : undefined
            }
            onChange={onChange}
            onBlur={onBlur}
            className={cn(
              // Base
              'w-full rounded-[var(--radius-md)] px-3.5 py-3 text-sm text-foreground',
              'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]',
              'placeholder:text-muted-foreground',
              'outline-none transition-all duration-200',
              // Focus
              'focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,212,200,0.15)]',
              // Error
              hasError && 'border-destructive focus:border-destructive focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]',
              // Disabled
              disabled && 'opacity-50 cursor-not-allowed',
              inputClassName
            )}
          />
        )}

        {error && (
          <p id={`${id}-error`} role="alert" className="text-xs text-destructive font-medium">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${id}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = 'FormField'

export { FormField, type FormFieldProps }
