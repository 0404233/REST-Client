import { Link } from 'i18n/navigation';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/icon.png"
        width={70}
        height={70}
        alt="Logo"
        priority={true}
        className="w-auto h-auto cursor-pointer transition-scale duration-200 hover:scale-[1.1]"
      />
    </Link>
  );
};

export default Logo;
