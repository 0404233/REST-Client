import { Link } from 'i18n/navigation';
import Image from 'next/image';

const RssLogo = () => {
  return (
    <Link href="https://rs.school/courses/reactjs" target="_blank">
      <Image
        src="/rss-logo.svg"
        width={40}
        height={40}
        alt="RSS Logo"
        className="cursor-pointer rounded-[30] transition-shadow duration-200 hover:shadow-[0_0_5px_2px_rgba(240,46,170)]"
      />
    </Link>
  );
};

export default RssLogo;
