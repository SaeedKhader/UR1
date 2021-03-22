export const debounce = (callback: (...args: any[]) => void, delay: number) => {
  let timer: number
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = window.setTimeout(() => callback(...args), delay)
  }
}
