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
  RouterModule,
} from '@angular/router';
import { ServiceprojectService } from '../../service/serviceproject.service';
import { Projects } from '../interfaces/project.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    RouterModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  proyectoId!: string;
  isEdit = false;

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private serviceProjectService: ServiceprojectService
  ) {}

  ngOnInit(): void {
    this.proyectoId = this.route.snapshot.params['id'];
    if (this.proyectoId) {
      this.isEdit = true;
      this.serviceProjectService
        .getProject(this.proyectoId)
        .subscribe((resul) => {
          // console.log(resul);
          // this.myForm.patchValue(resul);
          // this.myForm.controls.email.disable(); para que no se pueda editar el correo
        });
    }
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

  onSave(): void {
    // console.log(this.myForm.value);
    const project: Projects = {
      name: this.myForm.value.name!,
      description: this.myForm.value.description!,
      // tasks: [],
    };
    if (this.isEdit) {
      this.serviceProjectService
        .updateProject(this.proyectoId, project)
        .subscribe(() => {
          // console.log('succes');
          this.toaster.success('Proyecto actualizado');
          this.router.navigateByUrl('/project-list');
        });
    } else {
      this.serviceProjectService.createProject(project).subscribe(() => {
        // console.log('succes');
        this.toaster.success('Proyecto creado');
        this.router.navigateByUrl('/project-list');
      });
    }
  }
}
