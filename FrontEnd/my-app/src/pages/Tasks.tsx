import React, { useEffect, useState } from 'react';
import { UserInfo, IUserInfoReponse } from '../utils/userInfo';
import { Link } from 'react-router-dom';
import { Session } from '../utils/session';
import { ITaskBody, TaskApi, TaskCard, TaskInfo, deleteTaskApi } from '../apis/task-crud';

export function Tasks() {
  const [userInfo, setUserInfo] = useState<IUserInfoReponse | null>(null);
  const fetchData = async () => {
    const taskInfo: any = await TaskInfo();
    console.log(taskInfo)
    setTasks(taskInfo);
  };


  useEffect(() => {
    const fetchUserInfo = async () => {
      const user: any = await UserInfo();
      setUserInfo(user);
    };

    fetchUserInfo();
    fetchData();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tasks, setTasks] = useState<ITaskBody[]>([]);


  const handleSubmit = async () => {
    const body: ITaskBody = {
      title,
      description,
    };
    try {
      const response: any = await TaskApi(body);
      console.log(response)
      setSuccess("Task created successfully.");
      fetchData();
      setError("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      setError("Error creating task.");
      setSuccess("");
    }
  };



  const handleDeleteTask = async (taskId: number) => {
    await deleteTaskApi(taskId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };


  return (
    <div className="w-[430px] h-[920px] m-0 p-4 mx-auto">
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-700 capitalize">
          welcome back {userInfo?.username} 👋
        </p>
        <Link
          to={"/login"}
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          logOut
        </Link>
      </div>

      <div className="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6">
        <div className="space-y-3">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            New Task
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="title"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="description"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Task
          </button>
        </div>
        <div
          className={`p-4 mt-6 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-red-800 dark:text-red-400 ${error ? "" : "hidden"
            }`}
          role="alert"
          id="createTaskError"
        >
          {error}
        </div>
        <div
          className={`p-4 mt-6 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-green-800 dark:text-green-400 ${success ? "" : "hidden"
            }`}
          role="alert"
          id="createTaskSuccessful"
        >
          {success}
        </div>
      </div>

      <div>
        <div>
          {tasks && tasks.map((task: any) => (
            <TaskCard key={task.id} {...task} onDelete={handleDeleteTask} />
          ))}
        </div>
      </div>

    </div>
  );
}