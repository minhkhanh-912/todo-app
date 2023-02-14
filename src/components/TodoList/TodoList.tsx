import React, { useEffect, useState } from "react";
import todo from "../../@type/todo.type";
import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import styles from "./TodoList.module.scss";

interface handleNewTodo {
  (todo: todo[]): todo[];
}
const asynsTodoLocal = (handleNewTodo: handleNewTodo) => {
  const todosString = localStorage.getItem("todos");
  const todosObj: todo[] = JSON.parse(todosString || "[]");
  const newObj: todo[] = handleNewTodo(todosObj);
  localStorage.setItem("todos", JSON.stringify(newObj));
};
const TodoList = () => {
  const [todos, settodos] = useState<todo[]>([]);
  const todosDone = todos.filter((todo) => todo.done === true);
  const todosNotDone = todos.filter((todo) => todo.done === false);
  const [currentTodo, setcurrentTodo] = useState<todo | null>(null);
  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    const todosObj: todo[] = JSON.parse(todosString || "[]");
    settodos(todosObj);
  }, []);
  const handleaddtodo = (name: string) => {
    const todo: todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    };
    settodos((pre) => [...pre, todo]);
    const handler = (todos: todo[]) => [...todos, todo];
    asynsTodoLocal(handler);
  };

  const handleDoneTodo = (id: string, done: boolean) => {
    const handler = (todos: todo[]) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });
    };
    settodos(handler);
    asynsTodoLocal(handler);
  };
  const StartCurrentTodo = (id: string) => {
    const newtodo = todos.find((todo) => todo.id === id);
    if (newtodo) setcurrentTodo(newtodo);
  };
  const EditTodo = (name: string) => {
    setcurrentTodo((pre) => {
      if (pre) return { ...pre, name };
      return null;
    });
  };
  const finishEditTodo = () => {
    const handler = (todos: todo[]) => {
      return todos.map((todo) => {
        if (todo.id === (currentTodo as todo).id) {
          return currentTodo as todo;
        }
        return todo;
      });
    };
    settodos(handler);
    setcurrentTodo(null);
    asynsTodoLocal(handler);
  };
  const handleDeleteTodo = (id: string) => {
    const handler = (todos: todo[]) => {
      return todos.filter((todo) => todo.id !== id);
    };
    settodos(handler);
    asynsTodoLocal(handler);
  };
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          onSubmit={handleaddtodo}
          currentTodo={currentTodo}
          EditTodo={EditTodo}
          finishEditTodo={finishEditTodo}></TaskInput>
        <TaskList
          todos={todosNotDone}
          handleDoneTodo={handleDoneTodo}
          StartCurrentTodo={StartCurrentTodo}
          handleDeleteTodo={handleDeleteTodo}></TaskList>
        <TaskList
          doneTaskList
          todos={todosDone}
          handleDoneTodo={handleDoneTodo}
          StartCurrentTodo={StartCurrentTodo}
          handleDeleteTodo={handleDeleteTodo}></TaskList>
      </div>
    </div>
  );
};

export default TodoList;
