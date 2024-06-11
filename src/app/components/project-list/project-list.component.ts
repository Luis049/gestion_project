import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceprojectService } from '../../service/serviceproject.service';
import { Projects } from '../interfaces/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, NgIf, RouterModule, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  router = inject(Router);
  projects: Projects[] = [];
  displayedColumns: string[] = ['name', 'description', 'porcentaje', 'action'];
  toaster = inject(ToastrService);

  constructor(private readonly serviceProjectService: ServiceprojectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.serviceProjectService.getProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  edit(proyectoId: string) {
    // console.log(proyectoId);
    this.router.navigateByUrl('/project/' + proyectoId);
  }

  delete(proyectoId: string) {
    this.serviceProjectService.deleteProject(proyectoId).subscribe(() => {
      this.loadProjects();
      this.toaster.success('Proyecto eliminado');
    });
  }
  assignTask(proyectoId: string ): void {
    // console.log('id:',proyectoId);
    this.router.navigateByUrl('/create-task/' + proyectoId  );
  }
}
