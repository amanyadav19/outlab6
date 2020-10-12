import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface form_data {
  name: string;
  email: string;
  feedback: string;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
	private geturl = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
	private posturl = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/'

	httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getInitialData(): Observable<form_data> {
  	return this.http.get<form_data>(this.geturl).pipe(
        retry(3)
      );
  }

  postData(data: form_data) {
  return this.http.post<form_data>(this.posturl, JSON.stringify(data), this.httpOptions).pipe(
  		tap((data) => console.log("successful"))
    );
}
}
