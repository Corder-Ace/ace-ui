import {useState, useEffect,useRef} from 'React';
import {useDidHide, useDidShow} from '@tarojs/taro';
import {parseTimeData, now, isSameSecond, fallback, TimeData} from "@/utils/countDown";

interface useCountDown {
  time: TimeData,
  start: () => void,
  pause: () => void,
  reset: () => void
}

export default function useCountDown(time: number = 0, finish?: () => void): useCountDown {
  const [remain, setRemain] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const rafId: any = useRef();
  const isStarting: any = useRef(false);

  useEffect(() => {
    _reset();
  }, [time]);

  useEffect(() => {
    if (endTime > 0){
      rafId.current = macroTask();
      return () => clearTimeout(rafId.current)
    }
  }, [remain]);

  useDidShow(() => {
    if (remain > 0){
      _reset();
    }
  });
  useDidHide(() => _pause());
  // TODO: milliseconds
  // function tick() {
  //   macroTask();
  // }

  // function microTask() {
  //   return fallback(() => {
  //     if (!counting) return;
  //     _setRemain(getRemain());
  //
  //     if (remain > 0) {
  //       microTask();
  //     }
  //   })
  // }

  function macroTask() {
    return fallback(() => {
      if (!isStarting.current) return;
      const _remain = getRemain();

      if (!isSameSecond(_remain, remain) || _remain === 0) {
        _setRemain(_remain);
        return;
      }

      if (remain > 0) {
        clearTimeout(rafId.current);
        macroTask();
      }
    })
  }

  function getRemain(): number {
    return Math.max(endTime - now(), 0);
  }

  function _setRemain(_remain): void {
    setRemain(_remain);
    if (_remain === 0) {
      _pause();
      finish && finish();
    }
  }

  function _start(): void {
    if (isStarting.current) return;
    isStarting.current = true;

  }

  function _pause(): void {
    clearTimeout(rafId.current);
    isStarting.current = false;
  }

  function _reset(): void {
    _pause();
    const _endTime = now() + (time * 1000);
    setEndTime(_endTime);
    setRemain(_endTime - now());
    _start();
  }

  return {
    time: parseTimeData(remain),
    start: _start,
    pause: _pause,
    reset: _reset
  }
}
