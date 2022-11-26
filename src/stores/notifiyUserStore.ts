import { defineStore } from "pinia";
import { Stack } from "@/interfaces/Stack";

import notify from "devextreme/ui/notify";
export const useNotifyUserStore = defineStore("notify-user-store", () => {
  enum NotifyType {
    Info = "info",
    Warning = "warning",
    Error = "error",
    Success = "success",
  }

  function notifyUserWithInfoMessage(message: string) {
    notifyUserWithMessage(message, NotifyType.Info);
  }

  function notifyUserWithWarningMessage(message: string) {
    notifyUserWithMessage(message, NotifyType.Warning);
  }

  function notifyUserWithErrorMessage(message: string) {
    notifyUserWithMessage(message, NotifyType.Error);
  }

  function notifyUserWithSuccessMessage(message: string) {
    notifyUserWithMessage(message, NotifyType.Success);
  }

  function notifyUserWithMessage(
    message: string,
    type: string,
    displayTime = 2000,
    position = "top center",
    direction = "down-push"
  ) {
    notify(
      {
        message,
        type,
        displayTime,
      },
      { position, direction } as Stack
    );
  }

  return {
    notifyUserWithInfoMessage,
    notifyUserWithWarningMessage,
    notifyUserWithErrorMessage,
    notifyUserWithSuccessMessage,
  };
});
