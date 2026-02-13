'use client';

type IconType = 'stroke' | 'fill';

type Props = {
  name: string;
  size?: number;
  className?: string;
  title?: string;
  iconType?: IconType;
};

export default function Icon({ name, size = 20, className, title }: Props) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}