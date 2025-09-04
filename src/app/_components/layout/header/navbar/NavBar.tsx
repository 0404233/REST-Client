import Logo from '../logo/Logo';
import UserAuthLanguageBar from '../user-auth-language-bar/UserAuthLanguageBar';

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center">
      <Logo />
      <UserAuthLanguageBar />
    </nav>
  );
};

export default NavBar;
