import RssLogo from './rss-logo/RssLogo';
import Team from './team/Team';

const Footer = () => {
  return (
    <footer className="flex justify-between items-center py-2">
      <Team />
      <h1 className="text-2xl font-bold italic">2025</h1>
      <RssLogo />
    </footer>
  );
};

export default Footer;
