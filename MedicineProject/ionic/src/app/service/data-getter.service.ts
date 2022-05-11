import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
 import { Observable, of } from 'rxjs';

export interface Patient {
  id: number,
  fullname:string,
  doctor:string,
  recipes_quantity:number
}

export interface Recipe {
  id: number,
  recipeName:string,
  quantity:number,
  desc:string,
  patientId:number
}



@Injectable({
  providedIn: 'root'
})
export class DataGetterService {

  private baseUrl: string = "http://localhost:8000/api"
  private userName = ''
  private token = ''
  private users = ['Admin', 'Fullname']

  private recipes: Recipe[] = []

  constructor(private http: HttpClient) { 
  }

  checkUser(user) {
    console.log(this.baseUrl)
    return this.http.post<any>(this.baseUrl + '?action=login', user)
  }

  setToken(token:string) {
    this.token = token;
  }

  getPatients() {
    return this.http.get<any>(
      this.baseUrl + '?action=get-patients&token='+this.token
    );
  }

  editPatient(patient) {
    console.log(patient)
    return this.http.post<any>(
      this.baseUrl + '?action=edit-patient&token=' + this.token, patient);
  }

  addPatient(patient) {
    return this.http.post<any>(
      this.baseUrl + '?action=add-patient&token=' + this.token, patient);
  }

  deletePatient(patient) {
    return this.http.post<any>(
      this.baseUrl + '?action=remove-patient&token=' + this.token, patient);
  }

  getUser() {
    return this.userName
  }

  setUser(name: string) {
    this.userName = name;
  }

  userExists(name: string) : boolean {
    return this.users.indexOf(name) !== -1
  }

  getRecipes(id: number) {
    return this.http.get<any>(
      this.baseUrl + `?action=get-recipes&patientId=${id}`+`&token=${this.token}`);
  }

  addRecipe(recipe) {
    return this.http.post<any>(
      this.baseUrl + `?action=add-recipe&token=${this.token}`, recipe);
 
  }

  deleteRecipe(recipe) {
    return this.http.post<any>(
      this.baseUrl + '?action=remove-recipe&token=' + this.token, recipe);
  }

  
  editRecipe(recipe) {
    return this.http.post<any>(
      this.baseUrl + '?action=edit-recipe&token=' + this.token, recipe);
  }

}
