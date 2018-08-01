import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { students } from '../../model.student.interface';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
	public message: string = "Message en provenance du service";
	private urlServer: string = "http://localhost:5000";
	private students: Student[] = [];

  constructor(private http: HttpClient) { }

  
  private round(nb: number, precision: number = 2):number {
  	return parseFloat(nb.toFixed(precision));
  }

  public getStudent(id: number) {
    return this.http.get(this.urlServer + '/students/' + id);
  }

   public getStudents() {
   	// renvoie Observable, la souscription se fera côté composant
    return this.http.get(this.urlServer + '/students');
  }

  public setStudents(students: Student[]): Student[] {
  	this.students = students;
  	return this.students;
  }

  public getGeneralAverage(): number {
  	let totalNotes: number[] = [];
  	this.students.forEach((student:Student) => {
  		// .concat renvoie la concaténation de deux tableaux
  		totalNotes = totalNotes.concat(student.notes);
  	});
  	return this.round(totalNotes.reduce((total: number, val: number) => total + val) / totalNotes.length);		
  }

  public getAverage(notes: number[]):number {
  	return this.round(
  		notes.reduce((total: number, val: number) => total + val) / notes.length);
  	)
  }

  public updateStudent(id: number, student: Student) {
    return this.http.put(`${this.urlServer}/students/${id}`, student);
  }
}
