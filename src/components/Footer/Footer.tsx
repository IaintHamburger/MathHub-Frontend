import type React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as DiscordIcon } from "@/assets/icons/icon_discord.svg";
import { ReactComponent as GitHubIcon } from "@/assets/icons/icon_github.svg";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-800/50 backdrop-blur-sm border-t border-blue-400/20 py-6">
      <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-6">
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
          <DiscordIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
          <GitHubIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
          <a href="/about">{t("navigate.about")}</a>
        </Button>
      </div>
      <div className="text-center mt-4">
        <p className="text-blue-200 text-sm">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;
