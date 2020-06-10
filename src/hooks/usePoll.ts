import {useEffect, useRef, useState, useDidShow, useDidHide} from "@tarojs/taro";

export default function usePoll(slice: number, data: any[], time: number): any[] {
  const [count, setCount] = useState(0);
  const timer: any = useRef(null);
  const len = data.length;
  const start = count % len;
  const end = (count + slice) % len ? (count + slice) % len : len;
  useEffect(() => toggleProduct(), [])
  useDidShow(() => toggleProduct())
  useDidHide(() => clearTimeout(timer.current));

  function toggleProduct() {
    timer.current = setTimeout(() => {
      setCount(prevState => prevState + slice);
      toggleProduct()
    }, time)
  }

  return data.slice(start, end);
}
