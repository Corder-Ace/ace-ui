import {forEach} from "./utils";

export default function transformData(config, fns) {

  forEach(fns, function transform(fn) {
    config = fn(config);
  });

  return config;
}
