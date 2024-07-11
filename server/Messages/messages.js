export const messages = {
  user: {
    created: "Your account has been successfully created. Welcome aboard!",
    accountExists:
      "An account with this email already exists. Please log in or use a different email.",
    loginSuccess:
      "You have successfully logged into your account. Welcome back!",
    invalidCredentials:
      "The credentials you provided are incorrect. Please try again.",
    accountLocked:
      "Your account has been locked due to multiple failed login attempts. Please contact support.",
    passwordResetSuccess:
      "Your password has been successfully reset. You can now log in with your new password.",
    passwordResetFailed:
      "Failed to reset password. Please ensure your reset link is valid and try again.",
    passwordChangeSuccess: "Your password has been successfully changed.",
    passwordChangeFailed: "Failed to change password. Please try again later.",
    notFound: "User not found, please try again!",
    invalid: "Invalid user, please check your credentials and try again.",
  },
  access: {
    invalidPassword:
      "Wrong password, please check your password and try again.",
    loginSuccess: "You have successfully logged into your account.",
    accessDenied:
      "You do not have the necessary permissions to perform this action. Please contact support if you believe this is an error.",
    unauthorizedAccess:
      "Unauthorized access attempt detected. Please log in with appropriate credentials.",
  },
  group: {
    created: "The group has been successfully created.",
    groupExists:
      "A group with this name already exists. Please choose a different name.",
    groupUpdated: "The group details have been successfully updated.",
    groupDeleted: "The group has been successfully deleted.",
  },
  system: {
    serviceUnavailable:
      "The service is temporarily unavailable. Please try again later.",
    maintenanceMode:
      "The system is currently undergoing maintenance. We apologize for any inconvenience caused.",
    internalServerError:
      "An unexpected error occurred. Please try again later or contact support.",
    badRequest:
      "The request could not be processed due to invalid input. Please check your data and try again.",
  },
  additional: {
    passwordResetSuccess: "Your password has been successfully reset.",
    passwordResetFailed: "Failed to reset password. Please try again.",
    accountLocked:
      "Your account has been locked due to multiple failed login attempts.",
    accountUnlocked:
      "Your account has been unlocked. Please try logging in again.",
    notificationSent: "Notification has been successfully sent.",
    notificationFailed: "Failed to send notification. Please try again later.",
    profileUpdated: "Your profile has been successfully updated.",
    profileUpdateFailed: "Failed to update profile. Please try again later.",
    feedbackReceived: "Thank you for your feedback! We appreciate your input.",
    supportRequestReceived:
      "Your support request has been received. Our team will get back to you shortly.",
  },
};