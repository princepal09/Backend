
interface IPattern {
  title: string;
  subtitle: string;
}

const AuthImagePattern = ({
  title,
  subtitle,
}: IPattern) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md title-center">
        {/* Animated Grid Pattern */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`
                aspect-square rounded-2xl bg-primary/10
                ${i % 2 === 0 ? "animate-pulse" : ""}
              `}
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-4">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-base-content/60">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;