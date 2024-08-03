import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { CourseComponent } from './course/course.component';

export const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
    title: 'Home',
  },
  {
    path: 'course',
    component: CourseComponent,
    title: 'Course',
  },
];
