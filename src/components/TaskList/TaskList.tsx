import React, { useState } from "react";
import todo from "../../@type/todo.type";
import styles from "./TaskList.module.scss";
interface propsTaskList {
  doneTaskList?: boolean;
  todos: todo[];
  handleDoneTodo: (id: string, done: boolean) => void;
  StartCurrentTodo: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
}
const TaskList = (props: propsTaskList) => {
  const {
    doneTaskList,
    todos,
    handleDoneTodo,
    StartCurrentTodo,
    handleDeleteTodo,
  } = props;
  const handleDone =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      handleDoneTodo(id, e.target.checked);
    };
  return (
    <div className="mb-2">
      <h2 className={styles.title}>
        {doneTaskList ? "hoàn thành" : "Chưa hoàn thành"}
      </h2>
      <div className={styles.tasks}>
        {todos.length > 0 &&
          todos.map((item) => (
            <div className={styles.task} key={item.id}>
              <input
                type="checkbox"
                name="task"
                checked={!!item.done}
                className={styles.checkbox}
                onChange={handleDone(item.id)}
              />
              <span
                className={`${styles.taskname} ${
                  item.done && styles.taskNameDone
                }`}>
                {item?.name}
              </span>
              <div className={styles.actions}>
                <button
                  className={styles.taskBtn}
                  onClick={() => StartCurrentTodo(item.id)}>
                  E
                </button>
                <button
                  className={styles.taskBtn}
                  onClick={() => handleDeleteTodo(item.id)}>
                  D
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;
