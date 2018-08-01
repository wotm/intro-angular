import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StudentService } from '../services/student.service';
import { catchError } from 'rxjs/operators'; 

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @Input('data') student = {
    id: 0,
    photo: '',
    firstName: '',
    lastName: '',
    notes: [],
    group: ''
  };

  @Input('') editMode: boolean = false;
  @Input('studentAverage') studentAverage: number = 0;
  // La propriété changeEmitter reçoit un objet de type EventEmitter
  @Output() changeEmitter: EventEmitter<any> = new EventEmitter();


  // Méthodes
	constructor(private studentService:StudentService) {}

  ngOnInit() {
  }

  changeNote(id: number, indexNote: number) {
    this.changeEmitter.emit(null);
  }

  inputChange(e: any, indexNote: number) {
    let val: number = parseFloat(e.target.value);
    
    if (val >= 0 && val <=20) {
      // En cas d'erreur dans le requête http PUT, il faudra réinitialiser l'étudiant
      this.student.notes[indexNote] = val; // On met à jour l'étudiant côté client
      this.studentService
        .updateStudent(this.student.id, this.student)
        .pipe(
          //catchError à implémenter
        )
        .subscribe(res => {
          this.changeEmitter.emit(null);
        })
    }
    else {
      this.student.notes[indexNote] = 0;
    }
  }
}
