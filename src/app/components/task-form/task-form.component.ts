  import { NgIf } from '@angular/common';
  import { Component, OnInit, inject } from '@angular/core';
  import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
  import { MatButtonModule } from '@angular/material/button';
  import { MatInputModule } from '@angular/material/input';
  import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterModule,
  } from '@angular/router';
  import { v4 as uuidv4 } from 'uuid';
  import { Task } from '../task-list/interfaces/task.model.';
  import { TaskListService } from '../task-list/task-list.service';

  @Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      NgIf,
      RouterModule,
      RouterLink,
    ],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css',
  })
  export class TaskFormComponent implements OnInit {
    router = inject(Router);
    task: any;
    taskId!: string;
    taskName!: string;
    proyectoId!: string;
    isEdit = false;

    public myForm: FormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
    });

    constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private taskListService: TaskListService
    ) {
      // console.log(route)
    }

    ngOnInit(): void {
      this.proyectoId = this.route.snapshot.params['id'];

      this.taskId = this.route.snapshot.params['id'];
      this.taskName = this.route.snapshot.params['nameTask'];

      if (this.taskId) {
        this.isEdit = true;
        this.taskListService.getTask(this.taskId).subscribe((resul) => {
          // this.myForm.patchValue(resul); me muestra los valores
        });
      }

      this.route.paramMap.subscribe((params) => {
        this.proyectoId = params.get('proyectoId') || uuidv4();
        // console.log('proyectoId :', this.proyectoId);

        this.taskId = params.get('taskId') || uuidv4();
        // console.log('id :',this.taskId)
        // console.log('parametros :',params)
        this.taskId = params.get('id') || '';
        this.taskName = params.get('nameTask') || '';
      });
    }

    isValidField(field: string): boolean | null {
      return (
        this.myForm.controls[field].errors && this.myForm.controls[field].touched
      );
    }

    getFieldError(field: string): string | null {
      if (!this.myForm.controls[field]) return null;

      const errors = this.myForm.controls[field].errors || {};

      for (const key of Object.keys(errors)) {
        switch (key) {
          case 'required':
            return 'Este campo es requerido';
          case 'minlength':
            return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
        }
      }
      return null;
    }

    Save(): void {
      const task: Task = {
        name: this.myForm.value.name,
        // proyectoId: this.proyectoId,
      };
      if (this.isEdit) {
        this.taskListService.updateTask(this.taskId, task).subscribe(() => {
          this.router.navigateByUrl('/tasks-list');
        });
      } else {
        this.taskListService.createTask(task).subscribe(() => {
          this.router.navigateByUrl('/tasks-list');
        });
      }
    }
  }
