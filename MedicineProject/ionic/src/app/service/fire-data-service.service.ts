import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {map} from 'rxjs/operators'
import { throws } from 'assert';
import { increment } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FireDataServiceService {

  patients: Observable<any[]>;
  private recipes: Observable<any[]>
  private userName: string

  constructor(private readonly afs: AngularFirestore,
    private afAuth: AngularFireAuth) {
    const patientsCollection = afs.collection('patients');
    this.patients = patientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id
        return {id, ...(data as object)}
      }))
    )
   }

   getPatients() {
     return this.patients;
   }

   addPatient(patient) {
     this.afs.collection('patients')
     .add({ 
        fullname: patient.fullname,
        doctor: patient.doctor,
     })
   }

   editPatient(patient) {
     const doc = this.afs
     .doc('patients/'+patient.id)

      return doc
      .update({
        fullname: patient.fullname,
        doctor: patient.doctor,
      })
   }

   deletePatient(patient) {
     return this.afs
     .doc('patients/' + patient.id)
     .delete();
   }

   getRecipes(id) {
     this.recipes = this.afs
     .doc('patients/'+id)
     .collection('recipes').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id
        return {id, ...(data as object)}
      })))

     return this.recipes;
   }

   addRecipe(recipe) {

    const doc = this.afs.doc('patients/' + recipe.patientId);
    
    doc.collection('recipes')
    .add({ 
       recipeName: recipe.recipeName,
       quantity: recipe.quantity,
       desc: recipe.desc,
       patientId: recipe.patientId
    })

    doc.update({
      recipes_quantity: increment(1)
    })
    
   }

   editRecipe(recipe) {
    const doc = this.afs
    .doc('patients/'+recipe.patientId + "/recipes/"+recipe.id)

     return doc
     .update({
       recipeName: recipe.recipeName,
       quantity: recipe.quantity,
       desc: recipe.desc
     })
  }

   deleteRecipe(recipe) {

    const doc = this.afs.doc('patients/' + recipe.patientId);
    doc.update({
      recipes_quantity: increment(-1)
    });
    
    return this.afs
    .doc('patients/' + recipe.patientId + "/recipes/" + recipe.id)
    .delete();
   }

   checkUser(user) {
     return this.afAuth.signInWithEmailAndPassword(
       user.nickname,
       user.password
     )
   }

   getUser() {
     return this.userName;
   }

   setUser(name:string) {
     this.userName = name;
   }
}
