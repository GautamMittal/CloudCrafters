import { LightningElement, api, track,wire } from 'lwc';
//import getloacation from '@salesforce/apex/DisplayMapController.getloacation';
import getloacation from '@salesforce/apex/getrecorddetail.getrecorddetail';
export default class DisplayLWCMap extends LightningElement {
    @api recordId;
   // recordid='0015j00001VMUhXAAX';
    @track error;
    @track mapMarkers=[];
    @track markersTitle='tetsing';
    @wire (getloacation ,{recordid: '$recordId'})
 
    wiredlocations({error,data}){
        if(data)
        { console.log(this.recordId);
            data.forEach(element => {
            this.mapMarkers=[...this.mapMarkers,{
                location:{
                    City :element.City__c ,
                    Country:element.Event_Country__c,
                    PostalCode:element.Postal_Code__c ,
                    State: element.State__c,
                    Street:element.Street__c ,

                },
                icon: "standard:account",
                title:element.Group_Name__c,
            }];
        });
        this.error=undefined;
    } else if(error){
        this.error=error;
    }
}

}