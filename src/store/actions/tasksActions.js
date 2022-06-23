import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from '../types';

export const tasksRequest = () => ({
    type: TASKS_REQUEST,
})
 
export const tasksSuccess = data => ({
    type: TASKS_SUCCESS,
    payload: data,
})

export const tasksFailure = error => ({
    type: TASKS_FAILURE,
    payload: error,
})

export const getTasks = path => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`https://goscrum-api.alkemy.org/task/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then(res => res.json())
    .then(data => dispatch(tasksSuccess(data.result)))
    .catch(error => dispatch(tasksFailure(error)))
};

export const createTask = values => (dispatch) => {
  dispatch(tasksRequest());
  fetch("https://goscrum-api.alkemy.org/task/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({task: values}),
    }).then((res) => res.json()
        .then((data) => {
            dispatch(getTasks(""))
          }
        )
        .catch(error => dispatch(tasksFailure(error)))
    );
}

export const deleteTask = id => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`https://goscrum-api.alkemy.org/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then(res => res.json())
    .then(() => dispatch(getTasks("")))
    .catch(error => dispatch(tasksFailure(error)))
}

export const editTaskStatus = data => (dispatch) => {
  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];

  const newStatusIndex = statusArray.indexOf(data.status) > 1 ? 0 : statusArray.indexOf(data.status) + 1;

  fetch(`https://goscrum-api.alkemy.org/task/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      task: {
        title: data.title,
        importance: data.importance,
        status: statusArray[newStatusIndex],
        description: data.description,
      }
    })
  }).then(res => res.json())
    .then(data => dispatch(getTasks("")))
    .catch(error => dispatch(tasksFailure(error)))
}