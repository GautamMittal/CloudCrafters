public with sharing class getrecorddetail {
    @AuraEnabled (cacheable = true)
    public static list<Pre_Event__c> getrecorddetail(String recordid){
        try {
            return [SELECT Id,Group_Name__c,Street__c,City__c,State__c,Postal_Code__c,Event_Country__c from Pre_Event__c where Id=:recordid];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}