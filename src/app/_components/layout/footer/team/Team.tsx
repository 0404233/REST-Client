import { Link } from 'i18n/navigation';
import Image from 'next/image';
import { teamConfig } from './team-config';

const Team = () => {
  const team = teamConfig.map((t) => (
    <Link key={t.alt} href={t.href} target={t.target}>
      <Image src={t.src} width={20} height={20} alt={t.alt} className={t.className} />
    </Link>
  ));

  return <div className="flex gap-4">{team}</div>;
};

export default Team;
