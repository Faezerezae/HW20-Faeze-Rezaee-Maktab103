import axios, { AxiosError } from "axios";
import { Session } from "../utils/session";
import { serverUrl, taskUrls } from "./urls";
import { errorHandler } from "../utils/errorHandler";



export interface ITaskResponse {
  task: {
    id: number;
    title: string;
    description: string;
  };
}


export interface ITaskBody {
  id?: number;
  title: string;
  description: string;
  isCompletedTask?: boolean;
}


const session = new Session();

type TaskFuncType = (body: ITaskBody) => Promise<ITaskResponse>;
export const TaskApi: TaskFuncType = async (body: ITaskBody) => {
  const headers = {
    Authorization: `Bearer ${session.token}`,
    'Content-Type': 'application/json',
  };
  const response = await axios.post(serverUrl + taskUrls.task, body,{headers});
  return response.data as ITaskResponse;
};





type getTaskFuncType = () => Promise<ITaskResponse>;
export const getTaskInfoApi: getTaskFuncType = async () => {
  const response = await axios.get(serverUrl + taskUrls.task, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return response.data as ITaskResponse;
};

export const TaskInfo = async () => {
  try {
    const response = await getTaskInfoApi();
    return response;
  } catch (error) {
    console.log(error)
  }
};


export const deleteTaskApi = async (taskId?: number) => {
  const headers = {
    Authorization: `Bearer ${session.token}`,
    'Content-Type': 'application/json',
  };
  await axios.delete(`${serverUrl}${taskUrls.task}/${taskId}`, {headers,});
};


export const TaskCard = ({ title, id, isCompletedTask, description }: ITaskBody) => {

  return (<div className="grid grid-cols-1 gap-y-3 w-full my-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <span className="text-md font-medium text-gray-900 dark:text-white">
      title: {title}
    </span><p className="text-gray-500 " id={`task-desc-${id}`}>
      description: {description}
    </p>
    <div className="grid grid-cols-2">
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        data-btn-action="remove"
        data-task-id={id}
        onClick={() => deleteTaskApi(id)}
      >
        Remove
      </button>
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Edit
      </button>

    </div>
  </div>
  )
}