import AuthLinks from '../../../auth-links/AuthLinks';
import LanguageSwitcher from './language-switcher/LanguageSwitcher';

const UserAuthLanguageBar = () => {
  return (
    <div className="flex gap-4">
      <AuthLinks />
      <LanguageSwitcher />
    </div>
  );
};

export default UserAuthLanguageBar;
