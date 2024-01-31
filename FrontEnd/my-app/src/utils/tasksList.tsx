import axios, { AxiosError } from "axios";
import { errorHandler } from "./errorHandler";

let tasks: any[];

export async function fetchUserTasks() {
  if (!!tasks) return tasks;

  const token = window.sessionStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/task",
      headers: { Authorization: `Bearer ${token}` },
    });
    tasks = response.data;
    return tasks;
  } catch (error) {
    errorHandler(error as AxiosError);
  }
}

export function addTask(createdTask: any) {
  if (Array.isArray(tasks)) tasks.push(createdTask);
  else tasks = [createdTask];
}

export function removeTask(id: any) {
  tasks = tasks.filter((el) => el.id !== Number(id));
}

export async function getInprogressTasks() {
  const list = await fetchUserTasks();
  if (!list) return [];
  return list.filter((el) => !el.isCompleted);
}

export async function getCompletedTasks() {
  const list = await fetchUserTasks();
  if (!list) return [];
  return list.filter((el) => el.isCompleted);
}

export async function done(id: any) {
  tasks = tasks.map((el) => {
    if (el.id === Number(id)) {
      return { ...el, isCompleted: true };
    }
    return el;
  });
}

export async function undone(id: any) {
  tasks = tasks.map((el) => {
    if (el.id === Number(id)) {
      return { ...el, isCompleted: false };
    }
    return el;
  });
}
