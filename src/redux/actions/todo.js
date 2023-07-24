import axios from "axios";
import TODO from "../constants/todo";

const url = "https://64bdea0c2320b36433c7e526.mockapi.io/todos";

/**@typedef {Partial<import("../reducers/todo").Todo>} Todo */

/**@typedef {import("redux-thunk").ThunkMiddleware<Todo>} TodoThunk */

/**@returns {TodoThunk} */
export const fetchTodo = () => async (dispatch) => {
  const res = await axios.get(url);
  dispatch(createTodo(res.data));
};

/**
 *
 * @param {Todo} payload
 * @returns {TodoThunk}
 */
export const postTodo = (payload) => async (dispatch) => {
  const res = await axios.post(url, payload);
  dispatch(createTodo([res.data]));
};

/**
 *
 * @param {Todo} payload
 * @returns {TodoThunk}
 */
export const putTodo = (payload) => async (dispatch) => {
  const res = await axios.put(url + "/" + payload.id, payload);
  dispatch(updateTodo(res.data));
};

/**
 *
 * @param {string} payload
 * @returns {TodoThunk}
 */
export const deleteTodo = (payload) => async (dispatch) => {
  await axios.delete(url + "/" + payload);
  dispatch(removeTodo(payload));
};

/**@typedef {(payload: Todo) => ({type: TODO, payload: Todo})} TodoAction*/

/**@type {TodoAction} */
export const createTodo = (payload) => ({ type: TODO.CREATE, payload });

/**@type {TodoAction} */
export const updateTodo = (payload) => ({ type: TODO.UPDATE, payload });

/**@type {(payload: string) => ({type: TODO, payload: string})} */
export const removeTodo = (payload) => ({ type: TODO.DELETE, payload });
