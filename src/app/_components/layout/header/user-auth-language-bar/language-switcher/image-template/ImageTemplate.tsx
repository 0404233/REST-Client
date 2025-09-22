import Image from 'next/image';

type ImageTemplateProps = {
  src: string;
  lang: string;
  activeLang: string;
  setLang: (lang: string) => void;
};

const ImageTemplate = ({ src, lang, activeLang, setLang }: ImageTemplateProps) => {
  return (
    <Image
      src={src}
      width={30}
      height={30}
      alt={lang}
      priority={true}
      className={`cursor-pointer transition-shadow duration-200 rounded-[10] ${
        activeLang === lang
          ? 'shadow-[0_0_7px_2px_var(--foreground)]'
          : 'hover:shadow-[0_0_7px_2px_var(--foreground)]'
      }`}
      onClick={() => setLang(lang)}
    />
  );
};

export default ImageTemplate;
