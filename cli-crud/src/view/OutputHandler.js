/**
 * Handles displaying output to the user via the terminal.
 * @class
 */
class OutputHandler {
  /**
   * Show the list of users.
   * @param {Array} users - The list of users to display.
   */
  showUsers(users) {
    console.table(users)
  }

    /*Show a single user in table format*/
  showUser(user) {
    console.table([user])
  }

  /**
   * Display a success message.
   * @param {string} message - The success message to display.
   */
  showSuccess(message) {
    console.log(`\n✅ ${message}`)
  }

  /**
   * Display an error message.
   * @param {string} message - The error message to display.
   */
  showError(message, error) {
    console.error(`\n❌ ${message}`)
    if (error) {
      console.error(`\n${error}`)
    }
  }
}

export default new OutputHandler()