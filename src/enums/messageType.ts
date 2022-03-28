export enum MessageType {
  /**
   * Message sent when the content script has retrieved the user locale.
   */
  NewLocale = 'locale',
  /**
   * Message sent when the content script has fetched the reservations.
   */
  NewReservations = 'reservations',
  /**
   * Message sent when the content script receive a new date from the DatePicker input.
   */
  NewDate = 'date',
  /**
   * Message sent to display a list of reservations.
   */
  RenderReservations = 'renderReservation',
}
