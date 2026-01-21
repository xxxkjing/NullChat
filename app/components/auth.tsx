import styles from "./auth.module.scss";
import { IconButton } from "./button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";
import NeatIcon from "../icons/neat.svg";
import { getClientConfig } from "../config/client";
import { PasswordInput } from "./ui-lib";
import clsx from "clsx";

export function AuthPage() {
  const navigate = useNavigate();
  const accessStore = useAccessStore();
  const goChat = () => navigate(Path.Chat);

  const resetAccessCode = () => {
    accessStore.update((access) => {
      access.openaiApiKey = "";
      access.accessCode = "";
    });
  };

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["auth-page"]}>
      <div className={clsx("no-dark", styles["auth-logo"])}>
        <NeatIcon width={50} height={50} />
      </div>

      <div className={styles["auth-title"]}>{Locale.Auth.Title}</div>
      <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>

      <div className={styles["auth-password-input"]}>
        <PasswordInput
          style={{
            marginTop: "5vh",
            marginBottom: "5vh",
            width: "400px",
            maxWidth: "90%",
            fontSize: "16px",
            padding: "16px",
          }}
          aria={Locale.Settings.ShowPassword}
          aria-label={Locale.Auth.Input}
          value={accessStore.accessCode}
          type="text"
          placeholder={Locale.Auth.Input}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.accessCode = e.currentTarget.value),
            );
          }}
        />
      </div>

      <div className={styles["auth-actions"]}>
        <IconButton
          text={Locale.Auth.Confirm}
          type="primary"
          onClick={goChat}
        />
      </div>
    </div>
  );
}
