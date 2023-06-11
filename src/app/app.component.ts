import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITodo } from 'src/interfaces';
import { TodoService } from './shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Todo App';
  todos: ITodo[] = [];

  todo = "";

  private todoSubscriptions: Subscription[] = [];

  get totalTodo(): number { return this.todos.length }

  constructor(private _todoSvc: TodoService) { }

  ngOnInit(): void {
    this.todoSubscriptions.push(this._todoSvc.getTodos().subscribe(todos => this.todos = [...todos]));
  }

  ngOnDestroy(): void {
    this.todoSubscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  createTodo(): void {
    if (!this.todo) return
    const todo: ITodo = { name: this.todo };
    this.todo = '';
    this._todoSvc.createTodo(todo).subscribe(todo => { this.todos.push(todo) });
  }

  deleteTodo(todo: ITodo): void {
    const index = this.todos.indexOf(todo);
    this._todoSvc.deleteById(todo.id!).subscribe(id => this.todos.splice(index, 1));
  }

  clearAll(): void {
    this._todoSvc.deleteAll().subscribe(isDeleted => {
      if (isDeleted) this.todos = [];
    })
  }

}
