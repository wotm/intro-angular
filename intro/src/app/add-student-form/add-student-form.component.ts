import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/student.interface';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css']
})
export class AddStudentFormComponent implements OnInit {
	public student: Student = {
	    id: 0,
	    photo: '',
	    firstName: '',
	    lastName: '',
	    notes: [],
	    group: ''
	};

	public groups: string[] = ['ESD', 'POEI Java', 'POEC Symfony'];

  constructor() { }

  ngOnInit() {
  }

  validForm(f) {
  	console.log(f);
  	// si formulaire valide => appel au service pour requête ajax POST	
  }

}
