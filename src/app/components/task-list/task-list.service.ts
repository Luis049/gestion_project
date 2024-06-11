import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './interfaces/task.model.';
import { Projects } from '../interfaces/project.model';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  private taskUrl = 'http://localhost:3000/tasks';
  private proyectosUrl = 'http://localhost:3000/proyectos';

  constructor( private httpClient: HttpClient ) { }

  getTasks():Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.taskUrl);
  }

  getProjects(): Observable<Projects[]> {
    return this.httpClient.get<Projects[]>(this.proyectosUrl);
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.taskUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.taskUrl, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.httpClient.patch<Task>(
      `${this.taskUrl}/${id}`,
      task
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.taskUrl}/${id}`);
  }

  toggleTask(id: string): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.taskUrl}/${id}/toggle`, {});
  }



}
