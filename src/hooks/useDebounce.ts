import {useRef} from 'React';

export default function useDebounce(fn: Function, wait: number = 300) {
  const timer: any = useRef(0);

  return function (...args) {
    const self = this;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fn.apply(self, args), wait);
  }
}
