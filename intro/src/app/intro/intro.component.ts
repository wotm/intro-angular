import { Component } from '@angular/core';
import { Student } from '../../model/student.interface';
import { HttpClient } from '@angular/common/http';
// import d'opérateurs propres à la version 6 de Rxjs
import { take, filter, map, tap, mergeMap, delay } from 'rxjs/operators';

interface Photo {
	albumId?: number; //? indique que la clé ou l'argument est facultatif
	id: number;
	title?: string;
	url?: string;
	thumbnailUrl?: string;
	src?: string;
	alt?: string;
}


@Component({
	selector: 'app-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['./intro.component.css']
})

export class IntroComponent {
	// Propriétés
	public message: string =  "Petit message en provenance de la classe AppComponent";
	public id: string = "span_1";
	public urlImage: string = "https://cdn.radiofrance.fr/s3/cruiser-production/2017/04/f0dcd310-66d6-41c0-a17c-531c8fb555ba/640_loups_rediff_gettyimages-681933961.jpg";
	public style1: any = {
		'color': 'green',
		'text-decoration': 'underline'
	};
	private highlightGoodStudents: boolean = false;
	public groups: string[] = ['ESD', 'POEI Java', 'POEC Symfony'];
	public compteur: number = 3;
	public images: Photo[] = [];

	public players =  [
		{
			name: 'Chiellini', 
			team: 'Juventus', 
			num: 3, 
			injured: true},
		{
			name: 'Bonucci', 
			team: 'Milan AC', 
			num: 19, 
			injured: false
		},
		{
			name: 'Barzagli', 
			team: 'Juventus', 
			num: 15, 
			injured: false
		}
	];

	public student = {
		name: 'Nabil',
		age: 89,
		retired: false
	};

	public students: Student[] = [
		{
			id: 1,
			photo: 'http://static1.ozap.com/articles/7/54/78/77/@/4579052-thomas-30-ans-ostreiculteur-nouvelle-128x128-2.jpg', 
			firstName: 'Paul', 
			lastName: 'Henry', 
			notes: [17,18,19],
			group: 'POEI Java'
		},
		{
			id: 2,
			photo: 'http://static1.ozap.com/articles/7/54/78/77/@/4579052-thomas-30-ans-ostreiculteur-nouvelle-128x128-2.jpg', 
			firstName: 'Alexis', 
			lastName: 'Jean', 
			notes: [15,10,12],
			group: 'POEI Java'
		},
		{
			id: 3,
			photo: 'http://static1.ozap.com/articles/7/54/78/77/@/4579052-thomas-30-ans-ostreiculteur-nouvelle-128x128-2.jpg', 
			firstName: 'Patrick', 
			lastName: 'Jacques', 
			notes: [10,7,17],
			group: 'ESD'
		},
	];

	public selectedGroup: string = '0';

	constructor(private http: HttpClient) {
	// this.http = new HttpClient();
	// Injection de dépendance, un objet de type HttpClient est créé dès l'instanciation de la classe StudentComponent
	// StudentComponent dispose d'une propriété http lui permettant de faire des requêtes ajax
	}

	// Méthodes
	getAverage(notes: number[]):number {
		let sum = 0;
		for (let i=0;i<notes.length;i++)
			sum+= notes[i];

		return Math.round((sum / notes.length) * 10) / 10; // or toFixed(2) on a float value !
	}

	test():void {
		this.compteur += 1;
	}

	highlightStudents():void {
		this.highlightGoodStudents = !this.highlightGoodStudents;
	}

	selectGroup(e: any) {
		this.selectedGroup = e.target.value;
	}

	testAjax() {
  	let test = this.http
  		.get<Photo[]>('https://jsonplaceholder.typicode.com/photos')
  		.pipe(
  			delay(500),
  			// map(res => []) //altère le flux par remplacement
  			mergeMap(data => data),
  			 //take(3),
  			filter(el => el.id < 20),
  			map(el => {
  				return {id: el.id, url: el.thumbnailUrl, alt: 'image_' + el.id};
  			}),
  			tap(() => {
  				// cet opérateur n'agit pas sur la valeur du flux (stream)
  				//console.log('tap => side effect');
  			})
  		)
  		.subscribe(res => {
  			console.log(res);
  			// filtrage en utilisant la méthode .filter native des tableaux javascript
  			//this.images = res.filter(x => x.id < 21);
  			//console.log(this.images);
  			this.images.push(res); // on ajoute au tableau les réponses
  		});
  	}
}