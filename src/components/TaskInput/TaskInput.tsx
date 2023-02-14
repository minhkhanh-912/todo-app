import React, { useState } from "react";
import todo from "../../@type/todo.type";
import styles from "./TaskInput.module.scss";

interface Props {
  onSubmit: (name: string) => void;
  currentTodo: todo | null;
  EditTodo: (name: string) => void;
  finishEditTodo: () => void;
}
const TaskInput = (props: Props) => {
  const { onSubmit, currentTodo, EditTodo, finishEditTodo } = props;
  const [name, setname] = useState<string>("");
  const handleAddtodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTodo) {
      finishEditTodo();
    } else {
      onSubmit(name);
    }
    setname("");
  };
  const onchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      EditTodo(e.target.value);
    } else {
      setname(e.target.value);
    }
  };
  return (
    <div className={styles.title}>
      <h1>To do list typescript</h1>
      <form action="" className={styles.form} onSubmit={handleAddtodo}>
        <input
          type="text"
          value={currentTodo ? currentTodo.name : name}
          placeholder="Enter your task..."
          onChange={onchangeInput}
        />
        <button type="submit">{currentTodo ? "V" : "X"}</button>
      </form>
    </div>
  );
};

export default TaskInput;
