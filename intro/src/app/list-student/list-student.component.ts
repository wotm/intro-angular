import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../../model.student.interface';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
	students: any[] = [];
	editMode: boolean = false;
  generalAverage: number = 0;

  constructor(private studentService: StudentService) { }

  // Licefycle hook, ngOnInit s'exécute au chargement du composant
  ngOnInit() {
  	this.studentService
  		.getStudents()
  		.subscribe((res: Student[]) => {
  			this.students = res;
        this.studentService.setStudents(this.students);
        this.generalAverage = this.studentService.getGeneralAverage();
  		});
  }

  changeEditMode(e) {
    this.editMode = !this.editMode;
  }

  noteChange() {
    this.generalAverage = this.studentService.getGeneralAverage();
  }
}
