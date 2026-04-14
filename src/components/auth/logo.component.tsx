interface Props {
  src: string; // URL del logo
  alt?: string | "CobraYa Logo";
  className?: string;
}

const LogoComponent = ({ src, alt, className }: Props) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: "100%",
        maxWidth: "250px",
        height: "auto",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain
              transition-transform duration-300
              scale-110   /* zoom en móvil */
              sm:scale-200
              md:scale-300 /* zoom en pantallas medianas en adelante */
              "
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};

export default LogoComponent;
