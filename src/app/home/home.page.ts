import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';
import { AddComponent } from '../modals/add/add.component';
import { ModalController, AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import * as firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ref = firebase.database().ref();
  persons: any = [];
 constructor(
    private storage: Storage,
    private modal: ModalController,
    private alertController: AlertController,
    private toast: Toast,
    private network: Network,
    ) {
      this.verConexion();
      let con = this.network.type
      if(con === "wifi" || con === "4g"){
        this.ref.on('value',response =>{
          let datos = snapshotToArray(response)
          this.persons = datos;
          console.log(datos);
        });
      }else{
        this.storage.forEach((v,k)=>{
          console.log('value',v);
          console.log('key',k);
          this.persons.push(v);
          })
      }
      this.storage.forEach((v,k)=>{
        console.log('value',v);
        console.log('key',k);
        })
        this.toast.show(`Bienvenido!`, '50000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
    }
    async add(){
      console.log("Abrir modal...")
      const modal = await this.modal.create({
        component: AddComponent,
        cssClass: 'my-modal'
      })
      modal.present();

      let fin = await modal.onDidDismiss()
    if (fin.data.success){
      console.log("Verificacion de conexión");
      this.verConexion();
    }
  }

    verConexion(){
      if(this.network.type === 'wifi'){
        console.log("wifi")
        this.toast.show(`Estas por wifi!`, '50000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
      if(this.network.type === 'none'){
        console.log("none")
        this.toast.show(`Sin conexión :(!`, '50000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
        this.storage.forEach((v,k)=>{
          console.log('value',v);
          console.log('key',k);
          this.persons.push(v);
          })
      }
      this.network.onConnect().subscribe(data => {
        console.log(data)
        this.storage.forEach((v,k)=>{
          console.log('value',v);
          console.log('key',k);
          let insert = this.ref.push();
          insert.set(v);
          })
          this.ref.on('value',response =>{
            let datos = snapshotToArray(response)
            this.persons = datos;
            console.log(datos);
          
          });
          this.storage.clear()
      }, error => console.error(error));
     
      this.network.onDisconnect().subscribe(data => {
        console.log(data)
        this.storage.forEach((v,k)=>{
          console.log('value',v);
          console.log('key',k);
          this.persons.push(v);
          })
          this.storage.clear()
      }, error => console.error(error));
    }

}
export const snapshotToArray = snapshot => {
  console.log("Entra al snapshot")
  let returnArr = [];

  snapshot.forEach(childerSnapshot => {
    let item = childerSnapshot.val();
    item.key = childerSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}