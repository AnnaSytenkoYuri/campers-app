'use client';
type ButtonProps = {
    className: string;
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    ariaLabel?: string;
}

const ButtonComponent = ({
    className,
    onClick,
    children,
    type = 'button',
    disabled = false,
    ariaLabel,
}: ButtonProps) => {
    const clickAction = onClick ? onClick : () => {};
    return (
        <button
            className={className}
            onClick={clickAction}
            type={type}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
};

export default ButtonComponent;