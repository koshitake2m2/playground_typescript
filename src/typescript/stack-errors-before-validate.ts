interface Todo {
  name: string;
  status: TodoStatus;
}

type TodoStatus = "new" | "in-progress" | "completed";

interface RawTodo {
  name?: string;
  status?: string;
}

type TodoError = string;

const validateTodo = (todo: RawTodo): TodoError[] => {
  const errors = [];
  if (!todo.name) {
    errors.push("Name is required");
  }
  if (!todo.status) {
    errors.push("Status is required");
  }
  if (todo.name && todo.name.length < 3) {
    errors.push("Name must be at least 3 characters");
  }
  if (
    todo.status &&
    !["new", "in-progress", "completed"].includes(todo.status)
  ) {
    errors.push("Invalid status");
  }
  return errors;
};

const createTodo = (todo: RawTodo): Todo | TodoError[] => {
  const errors = validateTodo(todo);
  if (errors.length) {
    return errors;
  }
  return {
    name: todo.name!,
    status: todo.status! as TodoStatus,
  };
};

console.log(createTodo({ name: "1234567890", status: "new" }));

export {};
