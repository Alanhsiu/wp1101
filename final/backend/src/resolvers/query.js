import CaseModel from "../models/Case";
import ResumeModel from "../models/parent";

const Query = {
    cases(parent, {name, subject, price}, { db }, info) {
      if (!name && !subject && !price) {
        return CaseModel;
      }
      else if (!name && !subject){
        const a = db.Cases.filter((cases) => {
            return cases.price().includes(price)
          });
      
          return a.filter( (cases) => {
            return cases.id.includes(id)
          })
      }
      else if(!name && !price){
        const a = db.cases.filter((cases) => {
            return cases.price().includes(price)
          });
      
          return a.filter( (cases) => {
            return cases.id.includes(id)
          })
      }
      
      
    },
    teacher(parent, args, { db }, info) {
      if (!args.query) {
        console.log(query)
        return db.users;
      }
  
      return db.users.filter((user) => {
        return user.name.toLowerCase().includes(args.query)
      });
    },
  
  };
  
  export { Query as default };
  