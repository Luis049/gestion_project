import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [

  {
    path: '',
    component: ProjectListComponent,
  },
  {
    path: 'project-list',
    component: ProjectListComponent,
  },
  {
    path: 'create-project',
    component: ProjectFormComponent,
  },
  // {
  //   path: 'task/:id/project/:id',
  //   component: ProjectFormComponent,
  // },
  {
    path: 'project/:id',
    component: ProjectFormComponent,
  },
  {
    path: 'tasks-list',
    component: TaskListComponent,
  },
  {
    path: 'create-task/:id',
    component: TaskFormComponent,
  },
  {
    path: 'task/:id/:nameTask',
    component: TaskFormComponent,
  },
];
