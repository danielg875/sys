import { Mongo } from 'meteor/mongo';

export default Companies = new Mongo.Collection('companies');

Meteor.methods({
  getAllCompaniesOfUser:()=>{
    return Companies.find({createdBy:Meteor.userId()}).fetch()
  },
  insertCompany:(company)=>{
    /*_.each(companies,(company)=>{
      if(company._id){
        Companies.update({_id:company._id},{$set:{company:company.company}})
      }
      else {
        Companies.insert({company:company.company,createdBy:Meteor.userId()})
      }
    })*/
    if(company._id){
      Companies.update({_id:company._id},{$set:{company:company.company}})
    }
    else {
      let companyId = Companies.insert({company:company.company,createdBy:Meteor.userId()})
      return companyId
    }
  },
  getAllCompanies:(userId)=>{
    if(Roles.userIsInRole(userId,'admin')){
      let companies = Companies.find({}).fetch()
      _.each(companies,(company,index)=>{
        let user = Meteor.users.findOne({_id:company.createdBy})
        companies[index].username = user.profile?(user.profile.firstName+" "+user.profile.lastName):"NA"
      })
      return companies
    }
  },
  updateCompany:(company)=>{
    Companies.update({_id:company._id},{$set:{company:company.company}})
  },
  deleteCompany:(companyId)=>{
    Companies.remove({_id:companyId})
  }
})
