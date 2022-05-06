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

  constructor(
    private router: Router, 
    private dataGetter: DataGetterService,
    private alertContoller: AlertController
    ) { }

  ngOnInit() {
  }

  login() {
    if (this.dataGetter.userExists(this.userName)) {
      this.dataGetter.setUser(this.userName)
      this.router.navigate(['/home'])
    } else {
      this.userNotExistsAlert()
    }

  }

  async userNotExistsAlert() {
    const alert = await this.alertContoller.create({
      header: "Attention!",
      subHeader: "Autorization failure!",
      message: `User ${this.userName} was not found.` + "Incorrect user name.", 
      buttons: ['OK']
    });

    await alert.present();
  }

}
