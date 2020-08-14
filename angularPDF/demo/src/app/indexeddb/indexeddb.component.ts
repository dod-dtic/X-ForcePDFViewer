import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AppComponent } from './../app.component';
import{ GlobalConstants } from './../global-constants';

const dbConfig: DBConfig = {
name: 'Offline-Storage',
version: 1,   
objectStoresMeta: [{
  store: 'PDF',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    { name: 'name', keypath: 'name', options: { unique: false } },
    { name: 'base64', keypath: 'base64', options: { unique: false } }
  ]
}]
};

@Component({
  selector: 'app-indexeddb',
  templateUrl: './indexeddb.component.html',
  styleUrls: ['./indexeddb.component.css']
})


export class IndexeddbComponent{

  constructor(private dbService: NgxIndexedDBService){
    var id=Date.now();
    this.dbService.add('PDF', { name: GlobalConstants.pdfname, base64: GlobalConstants.b64, id }).then(
      () => {
        // Do something after the value was added
        return '<li> <button id="'+ id +'">delete</button>'+ GlobalConstants.pdfname+'</li>';
      },
      error => {  
        console.log(error);
      } 
    );

  }     


  

});

 

    

  




  

  ngOnInit(): void {
  }

}

@NgModule({
  imports: [NgxIndexedDBModule.forRoot(dbConfig)

  ]
})

