import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


// composants
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { StudentComponent } from './student/student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { MenuComponent } from './menu/menu.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';

//services
import { StudentService } from './services/student.service';
import { AddStudentFormComponent } from './add-student-form/add-student-form.component';


// table de routage
const appRoutes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'students', component: ListStudentComponent },
  { path: '', component: ListStudentComponent },
  { path: 'students/:id', component: DetailStudentComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    StudentComponent,
    ListStudentComponent,
    MenuComponent,
    DetailStudentComponent,
    AddStudentFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
