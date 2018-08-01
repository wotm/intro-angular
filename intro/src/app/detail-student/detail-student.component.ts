import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StudentService } from '../services/student.service';
import { switchMap } from 'rxjs/operators';
import { Student } from '../../model.student.interface';


@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {
	student: Student = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit() {
  	this.activatedRoute.paramMap
  		.pipe(
  			switchMap((params: ParamMap) => {
  				return this.studentService
  					.getStudent(parseInt(params.get('id')));
  			})
  		)
  		.subscribe((res: Student) => this.student = res);
	}
}
