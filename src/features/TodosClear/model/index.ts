import { createEvent, sample } from "effector";

import { clearCompleted } from "../lib";

import { $todos } from "entities/Todo";

export const clearAllEv = createEvent();
export const clearCompletedEv = createEvent();

sample({
  clock: clearAllEv,
  fn: () => [],
  target: $todos,
});

sample({
  clock: clearCompletedEv,
  source: $todos,
  fn: (source) => {
    return clearCompleted(source);
  },
  target: $todos,
});
