import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { Network } from '@ionic-native/network/ngx';
import * as firebase from 'firebase';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  ref = firebase.database().ref();
  listFormGroup : FormGroup;
  constructor(
    public modalCtrl:ModalController,
    private formBuilder: FormBuilder,
    private modal: ModalController,
    private storage: Storage,
    private alertController: AlertController,
    private toast: Toast,
    private network: Network,
  ) { }

  ngOnInit() {
    this.listFormGroup = this.formBuilder.group({
      'name' : ['', Validators.required],
      'age' : ['', Validators.required],
      'gender' : ['', Validators.required],
      'ocupation' : ['', Validators.required],
      'zone' : ['', Validators.required],
    })
  }
  add(){
    let con = this.verConexion();
    if(con === 'wifi'){
      console.log("LO HARA POR WIFI");
      let insert = this.ref.push();
      insert.set(this.listFormGroup.value);
      this.modal.dismiss({'success': true});
    }else{
      let date = new Date();
      let key = String(date.getTime())
      this.storage.set(key,this.listFormGroup.value)
      this.modal.dismiss({'success': true});
    }

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  verConexion(){
    if(this.network.type === 'wifi'){
      console.log("wifi")
      this.toast.show(`Estas por wifi!`, '50000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
      return "wifi";
    }
    if(this.network.type === 'none'){
      console.log("none")
      this.toast.show(`Sin coneccion :(!`, '50000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
      return "none";
    }
    this.network.onConnect().subscribe(data => {
      console.log(data)
      return "wifi";
    }, error => console.error(error));
   
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      return "none";
    }, error => console.error(error));
  }
}
