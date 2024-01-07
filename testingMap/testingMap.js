import { LightningElement, api ,track,wire} from 'lwc';
//import getloacation from '@salesforce/apex/getrecorddetail.getrecorddetail'
import getEventDetails from '@salesforce/apex/DisplayMapController.getEventDetails';
import getWasteDetails from '@salesforce/apex/DisplayMapController.getWasteDetails';
import getNGODetails from '@salesforce/apex/DisplayMapController.getNGODetails';
//import resources from '@salesforce/resourceUrl/myResource' ;
export default class TestingMap extends LightningElement {
  //  logo = resources+'imageforemail.png'
  mapOptions = {
    'disableDefaultUI': true // when true disables Map|Satellite, +|- zoom buttons
    //'draggable': false, // when false prevents panning by dragging on the map
  };
center = {
    location: { Street: 'Airoli', PostalCode: '400708' },
};

 // @api recordId;
  // recordid='0015j00001VMUhXAAX';
     @track error;
   @track mapMarkers=[];
   @track markersTitle='tetsing';
   @track letscheck='gold'
   @wire (getEventDetails)
   wiredEvent({error,data}){
       if(data)
       { //console.log(this.recordId);
           data.forEach(element => {
            if(element.Project_Approval__c && element.Event_Status__c=='Planning')
            this.letscheck='yellow'
              else if(element.Final_Approval__c && element.Event_Status__c=='In-Proggress')
             this.letscheck='orange'
              else if(element.Event_Status__c=='Completed')
              this.letscheck='green'
                else if(element.Event_Status__c=='Canceled')
                  this.letscheck='grey'
                else this.letscheck='blue'
           
                       this.mapMarkers=[...this.mapMarkers,{
               location:{
                   City :element.City__c ,
                   Country:element.Event_Country__c,
                   PostalCode:element.Postal_Code__c ,
                   State: element.State__c,
                   Street:element.Street__c ,

               },
                             icon: "standard:goals",
                             description:'Event',
               title: element.Project__c + '(Event)',
               mapIcon : {
               path:'M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z',
                  fillColor: this.letscheck,
                  fillOpacity: 1.5,
                  strokeWeight: 1,
                  scale: 1.0,
            }
               
           }];
       });
       this.error=undefined;
   } else if(error){
       this.error=error;
   }
}
@wire (getWasteDetails)
wiredWaste({error,data}){
    if(data)
    { //console.log(this.recordId);
        data.forEach(element => {
        this.mapMarkers=[...this.mapMarkers,{
            location:{
                City :element.Address__City__s ,
                Country:element.Address__countrycode__s,
                PostalCode:element.Address__PostalCode__s ,
                State: element.Address__StateCode__s,
                Street:element.Address__Street__s ,

            },
            
            icon: "standard:account",
            description:'Waste Management',
            title:element.Name + '(Waste Management)',
            mapIcon : {
              path: 'M150,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                fillColor: 'red',
                fillOpacity: 1.5,
                strokeWeight: 1,
                scale: .10,
          }
        }];
    });
    this.error=undefined;
} else if(error){
    this.error=error;
}
}
@track listviewcheck='invisible';
@track data='>';
listviewhandler(){
    if(this.listviewcheck=='invisible')
    {this.listviewcheck='visible';
this.data='<'}
else {this.listviewcheck='invisible'
this.data='>'}
}
@wire (getNGODetails)
wiredNGO({error,data}){
    if(data)
    { //console.log(this.recordId);
        data.forEach(element => {
        this.mapMarkers=[...this.mapMarkers,{
            location:{
                City :element.Ngo_Address__City__s ,
                Country:element.Ngo_Address__countrycode__s,
                PostalCode:element.Ngo_Address__PostalCode__s ,
                State: element.Ngo_Address__StateCode__s,
                Street:element.Ngo_Address__Street__s ,

            },
            icon: "standard:partners",
            description:'NGO',
            title:element.Name + '(NGO)',
            //mapIcon: {fillColor: 'Blue',}
            mapIcon : {
              path: 'M150 0 L75 200 L225 200 Z',
                fillColor: '#CF3476',
                fillOpacity: 1.5,
                strokeWeight: 1,
                scale: .10,
          }
            
        }];
    });
    this.error=undefined;
} else if(error){
    this.error=error;
}
}
}
