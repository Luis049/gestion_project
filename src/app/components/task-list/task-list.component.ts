import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Projects } from '../interfaces/project.model';
import { Task } from './interfaces/task.model.';
import { TaskListService } from './task-list.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterModule,
    RouterLink,
    NgFor,
    MatSlideToggleModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  router = inject(Router);
  tasks: Task[] = [];
  projects: Projects[] = [];
  displayedColumns: string[] = ['name', 'estado', 'projectName', 'action'];

  constructor(private readonly taskListService: TaskListService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.fetchProjectsAndTasks();
  }

  private loadTasks(): void {
    this.taskListService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  fetchProjectsAndTasks(): void {
    this.taskListService.getProjects().subscribe((projects) => {
      // console.log('Proyectos obtenidos:', projects); // Debug
      this.projects = projects;
      this.taskListService.getTasks().subscribe((tasks) => {
        // console.log('Tareas obtenidas:', tasks); // Debug
        this.tasks = this.combineTasksAndProjects(tasks, this.projects);
        // console.log('Tareas combinadas:', this.tasks); // Debug
      });
    });
  }

  combineTasksAndProjects(tasks: Task[], projects: Projects[]): any[] {
    return tasks.map((task) => {
      const project = projects.find((p) => p.proyectoId === task.proyectoId);
      // console.log('proyecto:', project);
      return {
        ...task,
        projectName: project ? project.name : 'Proyecto no encontrado',
      };
    });
  }

  edit(taskId: string, taskName: string): void {
    // console.log("id, ",taskId, " name, ", taskName);
    this.router.navigateByUrl('/task/' + taskId + '/' + taskName);
  }

  delete(taskId: string): void {
    this.taskListService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleEstado(task: Task) {
    this.taskListService.toggleTask(task.taskId || '').subscribe((updatedTask) => {
      task.estado = updatedTask.estado;
    });
  }
}
