import { ReactComponent as GitHubIcon } from "@/assets/icons/icon_github.svg";
import { ReactComponent as GoogleIcon } from "@/assets/icons/icon_google.svg";
import { ReactComponent as MicrosoftIcon } from "@/assets/icons/icon_microsoft.svg";
import { ReactComponent as XIcon } from "@/assets/icons/icon_x.svg";

import { Button } from "@/components/ui/button";

export default function SocialIcon() {
  return (
    <div className="flex justify-center space-x-6">
      <Button
        type="button"
        variant="ghost"
        className="w-12 h-12 rounded-full border border-blue-400/30 hover:bg-slate-700/50 p-0"
      >
        <GoogleIcon />
      </Button>

      {/* GitHub */}
      <Button
        type="button"
        variant="ghost"
        className="w-12 h-12 rounded-full border border-blue-400/30 hover:bg-slate-700/50 p-0"
      >
        <GitHubIcon />
      </Button>

      {/* X (Twitter) */}
      <Button
        type="button"
        variant="ghost"
        className="w-12 h-12 rounded-full border border-blue-400/30 hover:bg-slate-700/50 p-0"
      >
        <XIcon />
      </Button>

      {/* Microsoft */}
      <Button
        type="button"
        variant="ghost"
        className="w-12 h-12 rounded-full border border-blue-400/30 hover:bg-slate-700/50 p-0"
      >
        <MicrosoftIcon />
      </Button>
    </div>
  );
}
