const DELAY = 500

/**
 * Trying to retrieve an element of the document.
 * As it may not be present in the DOM when the function is executed, it can be re-triggered after a delay.
 * @param selector query selector used to find the element in the document
 * @param timeout time at which the function will stop to retry
 * @returns the queried element or null if the function times out.
 */
export const getElement = async (
  selector: string,
  timeout: number = 10000
): Promise<Element | null> => {
  const element = document.querySelector(selector)
  if (!element && timeout) {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(getElement(selector, timeout - DELAY)), DELAY)
    )
  }
  return element
}
