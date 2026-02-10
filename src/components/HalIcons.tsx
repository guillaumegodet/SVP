import svgPaths from "../imports/svg-uwzcwn46ei";

interface IconProps {
  className?: string;
  color?: string;
  size?: number | string;
}

// Icône trombone (fichier attaché)
export function PaperclipIcon({ className = "size-[18px]", color = "currentColor", size }: IconProps) {
  const finalSize = size || 18;
  return (
    <svg className={className} fill="none" viewBox="0 0 18 18" width={finalSize} height={finalSize}>
      <path d={svgPaths.p3e5a2c00} fill={color} />
    </svg>
  );
}

// Icône notice (trombone barré / pas de fichier attaché)
export function NoAttachIcon({ className = "size-[18px]", color = "currentColor", size }: IconProps) {
  const finalSize = size || 18;
  return (
    <svg className={className} fill="none" viewBox="0 0 18 18" width={finalSize} height={finalSize}>
      <path d={svgPaths.p36eed000} fill={color} />
    </svg>
  );
}
