type LoadingProps = {
  w: number;
  h: number;
  b: number;
};

const LoadingSkeleton = ({ w, h, b }: LoadingProps) => {
  return (
    <section className="container flex flex-col items-center flex-grow justify-center">
      <div
        className={`animate-spin rounded-full h-${h} w-${w} border-b-${b} border-rose-400`}
      ></div>
    </section>
  );
};

export default LoadingSkeleton;
