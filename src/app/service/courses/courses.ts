import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CoursePayload {
  title: string;
  level: string;
  duration?: string;
  img?: string;
  color?: string;
  category?: 'bd' | 'info' | 'lp' | 'pw';
}

export interface Course extends CoursePayload {
  id: number | string;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number | string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(payload: CoursePayload): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, payload);
  }

  updateCourse(id: number | string, payload: CoursePayload): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, payload);
  }

  deleteCourse(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}