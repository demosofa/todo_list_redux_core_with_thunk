/**@typedef {{id: number, title: string, completed: boolean, createdAt: string}} Todo*/

import TODO from "../constants/todo";

/**@type {Todo[]} */
const initState = [];

/**@type {import("redux").Reducer<Todo[], {type: import("../constants/todo").default, payload: Partial<Todo> | string}}>} */
export default function todoReducer(state = initState, action) {
  /**@type {Todo[]} */
  const clone = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TODO.CREATE:
      return [...clone, ...action.payload];

    case TODO.UPDATE:
      const idx = clone.findIndex((item) => item.id == action.payload.id);
      Object.assign(clone[idx], action.payload);
      return clone;

    case TODO.DELETE:
      return clone.filter((item) => item.id !== action.payload);

    default:
      return clone;
  }
}
