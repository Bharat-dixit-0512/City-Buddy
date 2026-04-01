import { Download } from "lucide-react";
import toast from "react-hot-toast";
import useAppInstallPrompt from "../../hooks/useAppInstallPrompt";

const AppInstallButton = ({ className = "" }) => {
  const { canInstall, promptInstall } = useAppInstallPrompt();

  if (!canInstall) {
    return null;
  }

  const handleInstall = async () => {
    const accepted = await promptInstall();

    if (accepted) {
      toast.success("CityBuddy is ready to use like an app.");
    }
  };

  return (
    <button
      className={`theme-keep-contrast inline-flex items-center gap-2 rounded-full bg-[#FFD60A] px-3 py-2 text-sm font-semibold text-[#023047] shadow-sm hover:-translate-y-0.5 hover:brightness-105 hover:shadow-md ${className}`}
      onClick={handleInstall}
      type="button"
    >
      <Download size={16} />
      Install App
    </button>
  );
};

export default AppInstallButton;
