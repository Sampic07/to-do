import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITodo } from 'src/interfaces';

const TODOS = 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  createTodo(todo: ITodo): Observable<ITodo> {
    const newTodo = { $id: this._newId, name: todo.name }
    this._addTodo(newTodo);
    return of(newTodo);
  }

  getTodos(): Observable<ITodo[]> {
    return of(this._todos);
  }

  deleteById(id: number): Observable<number> {
    this._removeTodo(id);
    return of(id);
  }

  deleteAll(): Observable<boolean> {
    localStorage.removeItem(TODOS);
    return of(true);
  }

  private get _newId(): number {
    return this._todos.length > 0 ? ++this._todos[this._todos.length - 1].$id! : 1;
  }

  private get _todos(): ITodo[] {
    return JSON.parse(localStorage.getItem(TODOS) || '[]');
  }

  private _addTodo(todo: ITodo) {
    const todos: ITodo[] = [...this._todos];
    todos.push(todo);
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }

  private _removeTodo(id: number) {
    const todos = this._todos.filter(t => t.$id !== id)
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }
}
