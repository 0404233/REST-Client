import { ChangeEvent } from 'react';

type ProgrammingLanguagesProps = {
  handleChangeLanguage: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const ProgrammingLanguages = ({ handleChangeLanguage }: ProgrammingLanguagesProps) => {
  return (
    <select
      name="language"
      id="language"
      className=" text-xl outline-none cursor-pointer border-1 border-transparent transition hover:border-b-[var(--border-b)]"
      onChange={(e) => handleChangeLanguage(e)}
    >
      <option value="curl" className="bg-gray-900">
        сURL
      </option>
      <option value="javascript_fetch" className="bg-gray-900 mb-1">
        JavaScript (Fetch)
      </option>
      <option value="nodejs" className="bg-gray-900 mb-1">
        NodeJS
      </option>
      <option value="python" className="bg-gray-900 mb-1">
        Python
      </option>
      <option value="java" className="bg-gray-900 mb-1">
        Java
      </option>
      <option value="csharp" className="bg-gray-900 mb-1">
        C#
      </option>
      <option value="go" className="bg-gray-900 mb-1">
        Go
      </option>
    </select>
  );
};

export default ProgrammingLanguages;
