public with sharing class DisplayMapController {
    @AuraEnabled(cacheable =true)
    public static List<Pre_Event__c> getEventDetails(){
        return [SELECT Id,Project__c,Project_Approval__c,Final_Approval__c,Event_Status__c,Group_Name__c,Street__c,City__c,State__c,Postal_Code__c,Event_Country__c from Pre_Event__c
       where Postal_Code__c != null LIMIT 50];
       
    }
    @AuraEnabled(cacheable =true)
    public static List<Waste_Management__c> getWasteDetails(){
        return [select Id, Name, Address__Street__s,Address__City__s,Address__StateCode__s,Address__PostalCode__s,Address__countrycode__s
        FROM Waste_Management__c
        where Address__PostalCode__s != null
        LIMIT 50];
        
    }
    @AuraEnabled(cacheable =true)
    public static List<NGO_Account__c> getNGODetails(){
        return [select Id, Name, Ngo_Address__Street__s,Ngo_Address__City__s,Ngo_Address__StateCode__s,Ngo_Address__PostalCode__s,Ngo_Address__countrycode__s
        FROM NGO_Account__c
        where Ngo_Address__PostalCode__s != null
        LIMIT 50];
        
    }
    
}