import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth:AuthService,
    private router:Router,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  public onLogin(){
    this.auth.authLogin().then(res=>{
     this.router.navigate(['home']);  
     this.presentToast('bottom',`Hola, bienvenido ${this.auth.getCurrentUser().displayName}`)    
    }).catch(err=>{
      console.log(err);
    });
  }

  public async presentToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }
  

}
