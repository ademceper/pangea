import { Eye, EyeSlash } from "@phosphor-icons/react"
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react"
import { forwardRef } from "react"

import { kcSanitize } from "keycloakify/lib/kcSanitize"
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed"

import { cn } from "@pangea/ui/lib/utils"
import { Button } from "@pangea/ui/components/button"
import { Input } from "@pangea/ui/components/input"
import { Label } from "@pangea/ui/components/label"

export function KcFieldError(props: { message?: string; id?: string }) {
  const { message, id } = props
  if (!message) return null
  return (
    <p
      id={id ?? "input-error"}
      className="text-sm text-destructive"
      aria-live="polite"
      dangerouslySetInnerHTML={{ __html: kcSanitize(message) }}
    />
  )
}

type KcFieldProps = {
  id: string
  label: ReactNode
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function KcField(props: KcFieldProps) {
  const { id, label, error, required, children, className } = props
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      <KcFieldError message={error} id={`${id}-error`} />
    </div>
  )
}

type KcTextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  invalid?: boolean
  size?: "default" | "xl"
  variant?: "default" | "secondary"
}

export const KcTextInput = forwardRef<HTMLInputElement, KcTextInputProps>(
  function KcTextInput(
    { invalid, className, size = "xl", variant = "secondary", ...rest },
    ref
  ) {
    return (
      <Input
        ref={ref}
        size={size}
        variant={variant}
        aria-invalid={invalid ?? undefined}
        className={cn(
          invalid && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...rest}
      />
    )
  }
)

type KcPasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  invalid?: boolean
  size?: "default" | "xl"
  variant?: "default" | "secondary"
  showLabel: string
  hideLabel: string
}

export function KcPasswordInput(props: KcPasswordInputProps) {
  const {
    id,
    invalid,
    className,
    showLabel,
    hideLabel,
    size = "xl",
    variant = "secondary",
    ...rest
  } = props

  if (!id) {
    throw new Error("KcPasswordInput requires an id")
  }

  const { isPasswordRevealed, toggleIsPasswordRevealed } =
    useIsPasswordRevealed({ passwordInputId: id })

  return (
    <div className="relative">
      <Input
        id={id}
        type="password"
        size={size}
        variant={variant}
        aria-invalid={invalid ?? undefined}
        className={cn(
          "pr-12",
          invalid && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...rest}
      />
      <button
        type="button"
        aria-label={isPasswordRevealed ? hideLabel : showLabel}
        aria-controls={id}
        onClick={toggleIsPasswordRevealed}
        className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground hover:text-foreground"
      >
        {isPasswordRevealed ? (
          <EyeSlash className="size-5" aria-hidden />
        ) : (
          <Eye className="size-5" aria-hidden />
        )}
      </button>
    </div>
  )
}

type KcSubmitProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
}

export function KcSubmit({ label, className, ...rest }: KcSubmitProps) {
  return (
    <Button
      type="submit"
      size="xl"
      className={cn("w-full", className)}
      {...rest}
    >
      {label}
    </Button>
  )
}
