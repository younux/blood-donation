import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-donation-search-filter',
  templateUrl: './donation-search-filter.component.html',
  styleUrls: ['./donation-search-filter.component.scss']
})
export class DonationSearchFilterComponent implements OnInit {

  cityForm: FormGroup;
  categoryForm: FormGroup;
  keyWordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.cityForm.valueChanges.subscribe(
      formValues => {
        console.log(formValues);
      }
    )
    this.categoryForm.valueChanges.subscribe(
      formValues => {
        console.log(formValues);
      }
    )
    this.keyWordForm.valueChanges.subscribe(
      formValues => {
        console.log(formValues);
      }
    )
  }

  createForm() {
    this.cityForm = this.fb.group({
      city: [null],
    });
    this.categoryForm = this.fb.group({
      APlus: [true],
      AMinus: [true],
      BPlus: [true],
      BMinus: [true],
      ABPlus: [true],
      ABMinus: [true],
      OPlus: [true],
      OMinus: [true],
    });
    this.keyWordForm = this.fb.group({
      keyWord: [null],
    });
  }

  onSubmit(form: FormGroup){

  }

}


/*import { Component, OnInit } from '@angular/core';
 import {Router} from '@angular/router';
 import { ElementRef } from '@angular/core';
 import { Observable } from 'rxjs/Observable';
 import 'rxjs/add/observable/fromEvent';
 import 'rxjs/add/operator/filter';
 import 'rxjs/add/operator/debounceTime';
 import 'rxjs/add/operator/switch';

 import {NgForm} from '@angular/forms';

 @Component({
 selector: 'app-search',
 templateUrl: './search.component.html',
 styleUrls: ['./search.component.css']
 })
 export class SearchComponent implements OnInit {

 search_query = '';

 constructor(private _router: Router, private el: ElementRef) { }

 ngOnInit() {
 Observable.fromEvent(this.el.nativeElement, 'keyup')
 .map((e: any) => e.target.value) // extract the value of the input
 .filter((text: string) => text.length > 3) // filter out if empty
 .debounceTime(500) // only once every 500ms
 .subscribe((query: string) => {
 this._router.navigate(['/search', {q: query, page: 1}]);
 });
 }

 submit_search(event, form_data) {
 let query = form_data.value['q'];
 if (query) {
 this._router.navigate(['/search', {q: query, page: 1}]);
 }
 this.search_query = '';
 }
 }*/


/*************************************************/


/*<form #search_form='ngForm' class="navbar-form navbar-right" (ngSubmit)='submit_search($event, search_form)'>

<div class="form-group">
<input type="text" class="form-control" placeholder="Search" name="q" [(ngModel)]='search_query'>
</div>
<button type="submit" class="btn btn-default">Search</button>

</form>*/

/**************************************************/


/*
import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {SearchMovieService} from '../movies-services/search-movie.service';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css'],
})
export class SearchDetailComponent implements OnInit, OnDestroy {

  private routeSub: any;
  query: String;
  movies: any;
  total_pages: number;
  total_results: number;
  current_page = 1;
  loading = false;



  constructor(private _route: ActivatedRoute, private router: Router, private search_movie_service: SearchMovieService) {

  }

  ngOnInit() {
    this.routeSub = this._route.params.subscribe(params => {
      // verify if we have changed the query to reset the navbar by making movie null
      this.loading = true;
      if (this.query !== params['q']) {
        this.movies = null;
      }
      this.query = params['q'];
      this.current_page = parseInt(params['page']) || 1;
      this.search_movie_service.search(this.query, this.current_page).subscribe(response => {
        ({ search_result: this.movies, total_pages: this.total_pages , total_results: this.total_results} = response);
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  change_page(page: number) {
    this.router.navigate(['search', {q: this.query, page: page}]);
  }
}*/
