import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataGetterService } from '../service/data-getter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: string
  password: string;

  constructor(
    private router: Router, 
    private dataGetter: DataGetterService,
    private alertContoller: AlertController
    ) { }

  ngOnInit() {
  }

  login() {
   this.dataGetter.checkUser({
      nickname: this.userName,
      password: this.password
    }).subscribe(result => {
      if (result.hasOwnProperty('error')) {
        this.userNotExistsAlert(result.error);
      }
      else {
        if (result.hasOwnProperty('token')) {
          this.dataGetter.setUser(this.userName);
          this.dataGetter.setToken(result.token);
          this.router.navigate(['/home']);
        }
        else {
          this.userNotExistsAlert('Unexpected error!');
        }
      }
    })
  
  
  }

  async userNotExistsAlert(message) {
    const alert = await this.alertContoller.create({
      header: "Attention!",
      subHeader: "Autorization failure!",
      message: message, 
      buttons: ['OK']
    });

    await alert.present();
  }

}
