import { useEffect, useState } from "react";

const isStandaloneMode = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

const useAppInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(() =>
    typeof window === "undefined" ? false : isStandaloneMode()
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const updateInstallState = () => {
      setIsInstalled(isStandaloneMode());
    };

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", updateInstallState);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateInstallState);
    } else {
      mediaQuery.addListener(updateInstallState);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", updateInstallState);

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateInstallState);
      } else {
        mediaQuery.removeListener(updateInstallState);
      }
    };
  }, []);

  const promptInstall = async () => {
    if (!installPrompt) {
      return false;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome !== "accepted") {
      return false;
    }

    setInstallPrompt(null);
    setIsInstalled(true);
    return true;
  };

  return {
    canInstall: Boolean(installPrompt) && !isInstalled,
    isInstalled,
    promptInstall,
  };
};

export default useAppInstallPrompt;
