import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataGetterService } from '../service/data-getter.service';
import { FireDataServiceService } from '../service/fire-data-service.service';

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
    private alertContoller: AlertController,
    private fireBaseService: FireDataServiceService
    ) { }

  ngOnInit() {
    //this.fireBaseService.setUser('Admin')
    //this.router.navigate(['/home'])
  }

  login() {
   this.fireBaseService.checkUser({
      nickname: this.userName,
      password: this.password
    }).then(
      res => {
          this.dataGetter.setUser(this.userName);
          //this.dataGetter.setToken(result.token); //mysql
          this.router.navigate(['/home']);
        },
     err => {
          this.userNotExistsAlert(err.message);
          console.log(err)
        }
    );
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
