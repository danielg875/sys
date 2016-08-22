import { Email } from 'meteor/email';
const self=this
export default class EmailSystem{

  sendCandidateEmail(options){
    const link=`http://${options.host}/candidates/${options.positionId}/${options.candidateId}`
    const content=`You have invited to apply for ${options.job} .Please visit this ${link} below to recommend your colleagues to best describe you
        We wish you a good luck ahead  Please ignore this email. If you feel something is wrong, please contact our support team:support@ezyref.com.au.
        Thanks
        EzyRef Support Team
`
    SSR.compileTemplate( 'htmlEmail', Assets.getText( 'emailTemplate.html' ) );
    const html=SSR.render( 'htmlEmail', {name:options.name, content:content} )
    Meteor.defer(()=>{
      try{
        Email.send({
          to: options.email,
          from: 'noreply <admin@ezyref.com.au>',
          subject: `Job Offer for ${options.job}`,
          html: html
        });
      }catch(e){

      }

    })

  }

  sendRefreeEmail(options){
    SSR.compileTemplate( 'htmlEmail', Assets.getText( 'emailTemplate.html' ) );
    const html=SSR.render( 'htmlEmail', {name:options.name, content:options.content} )
    Meteor.defer(()=>{
      try{
        Email.send({
          to: options.to,
          from: 'noreply <admin@ezyref.com.au>',
          subject: `you are referenced`,
          html: html
        });
      }catch(e){

      }

    })
  }

  sendEmail({to,text,subject,name,content}){
    SSR.compileTemplate( 'htmlEmail', Assets.getText( 'emailTemplate.html' ) );
    const html=SSR.render( 'htmlEmail', {name:name, content:content} )
    Meteor.defer(()=>{
     try {
       Email.send({
         to: to,
         from: 'noreply <admin@ezyref.com.au>',
         subject: subject || `Reminder`,
         html: text || html
       });
     }
      catch(e) {

      }

    })
  }
}
