import assert from "assert";

type TodoError = string;

class TodoName {
  private constructor(public name: string) {}
  static of(name?: string): TodoName | TodoError[] {
    const errors = [];
    if (!name) {
      errors.push("Name is required");
      return errors;
    }
    if (name.length < 10) {
      errors.push("Name must be at least 10 characters");
    }
    if (name.toLowerCase() === name) {
      errors.push("Name must contain at least one uppercase character");
    }
    if (errors.length) {
      return errors;
    }

    return new TodoName(name);
  }
}

class TodoStatus {
  private constructor(public value: string) {}

  static readonly New = new TodoStatus("new");
  static readonly InProgress = new TodoStatus("in-progress");
  static readonly Completed = new TodoStatus("completed");

  static readonly values = [
    TodoStatus.New,
    TodoStatus.InProgress,
    TodoStatus.Completed,
  ];
  static findByName(name: string): TodoStatus | undefined {
    return TodoStatus.values.find((status) => status.value === name);
  }

  static of(status?: string): TodoStatus | TodoError[] {
    const errors = [];
    if (!status) {
      errors.push("Status is required");
      return errors;
    }
    const value = this.findByName(status);
    if (!value) {
      errors.push("Invalid status");
      return errors;
    }
    return value;
  }
}

class Todo {
  private constructor(public name: TodoName, public status: TodoStatus) {}
  static of(name?: string, status?: string): Todo | TodoError[] {
    const todoName = TodoName.of(name);
    const todoStatus = TodoStatus.of(status);

    if (todoName instanceof TodoName && todoStatus instanceof TodoStatus) {
      return new Todo(todoName, todoStatus);
    }
    const errors = [
      ...(Array.isArray(todoName) ? todoName : []),
      ...(Array.isArray(todoStatus) ? todoStatus : []),
    ];
    return errors;
  }

  static ofBeforeValidate(name?: string, status?: string): Todo | TodoError[] {
    const errors = this._collectErrors(name, status);
    if (errors.length) {
      return errors;
    }

    const todoName = TodoName.of(name);
    const todoStatus = TodoStatus.of(status);

    // validation済みである前提なのでassertする
    assert(todoName instanceof TodoName);
    assert(todoStatus instanceof TodoStatus);

    return new Todo(todoName, todoStatus);
  }

  static _collectErrors(name?: string, status?: string): TodoError[] {
    const errors = [];
    const todoName = TodoName.of(name);
    if (Array.isArray(todoName)) {
      errors.push(...todoName);
    }
    const todoStatus = TodoStatus.of(status);
    if (Array.isArray(todoStatus)) {
      errors.push(...todoStatus);
    }
    return errors;
  }
}

console.log(Todo.of("hello", "new"));
console.log(Todo.of("1234567890XXX", "new"));

export {};
