/**
 * Displays a notification using the AlertifyJS library.
 *
 * @param {string} message - The text of the message that will be displayed in the notification.
 * @param {string} type - Notification type. Can be 'success' - green, 'message' - blue, 'error' - red, 'warning' - yellow.
 * @param {number} time - The time in seconds that the notification will be displayed.
 */
function showAllerty(message = 'Allertify message', type = 'error', time = 5) {
  alertify.notify(message, type, time);
}
