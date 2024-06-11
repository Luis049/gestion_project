import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';

interface Study {
  name: string;
}

@Component({
  selector: 'app-task-list-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatCheckboxModule,
    MatIconModule,
    NgFor,
    CommonModule
  ],

  templateUrl: './task-list-modal.component.html',
  styleUrl: './task-list-modal.component.css'
})
export class TaskListModalComponent {

  studies: Study[] = [
    { name: 'Lección de francés'},
    { name: 'Clase de matemáticjiejdijeidjei' },
    { name: 'Tarea de biología' }
  ];

  constructor(
    public dialogRef: MatDialogRef<TaskListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  removeStudy(study: Study): void {
    this.studies = this.studies.filter(s => s !== study);
  }

}
