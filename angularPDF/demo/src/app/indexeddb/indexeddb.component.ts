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
    //creates unique id for the PDF based on the number of miliseconds elapsed
    var id=Date.now();
    //adds pdf using ngx-indexeddb
    this.dbService.add('PDF', { name: GlobalConstants.pdfname, base64: GlobalConstants.b64, id }).then(
      () => {
        // add li block to HTML with name of PDF and delete/open buttons

        //adds Li block with PDF name
        var newli =document.createElement("li");
        var newContent=document.createTextNode(GlobalConstants.pdfname);
        newli.appendChild(newContent);

        //Adds Delete Button for each entry to the database
        var b=document.createElement('button');
        b.innerHTML='Delete';
        var c=this;
        b.onclick= function(){c.dbService.delete('PDF', id).then(
              () => {
                  // Do something after delete
              },
              error => {
                  console.log(error);
              }
          );
        }; 
        newli.appendChild(b);

        /* non-working open in viewer button. Once you have access to Gateway document links, this function needs to be customized
        */
        var b2=document.createElement('button');
        b2.innerHTML='Open in Viewer';
        b2.onclick=function(){

        };
        newli.appendChild(b2);

           
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

