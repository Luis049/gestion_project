import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projects } from '../components/interfaces/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceprojectService {

  private proyectosUrl = 'http://localhost:3000/proyectos';

  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<Projects[]> {
    return this.httpClient.get<Projects[]>(this.proyectosUrl);
  }

  getProject(id: string): Observable<Projects> {
    return this.httpClient.get<Projects>(`${this.proyectosUrl}/${id}`);
  }

  createProject(project: Projects): Observable<Projects> {
    return this.httpClient.post<Projects>(this.proyectosUrl, project);
  }

  updateProject(id: string, project: Projects): Observable<Projects> {
    return this.httpClient.patch<Projects>(
      `${this.proyectosUrl}/${id}`,
      project
    );
  }

  deleteProject(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.proyectosUrl}/${id}`);
  }

}
