export default function LogoMark({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/chik.png"
      alt="Natu Kodi Farms"
      style={{ height: size, width: "auto", display: "block" }}
      className={className}
    />
  );
}
