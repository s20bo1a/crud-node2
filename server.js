const express=require('express');
const app=express(); 
const cors=require("cors");
const admin=require('firebase-admin'); 
const serviceAccount=require('./key.json');

admin.initializeApp({
   credential:admin.credential.cert(serviceAccount)
}); 
const db=admin.firestore();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.post('/create',(req,res)=>{
 try{
  const id =req.body.email;
  const userJson={
   email:req.body.email,
   firstName:req.body.firstName,
   lastName:req.body.lastName
};
const response=db.collection("users").doc(id).set(userJson)
res.send(response); 
} catch(error){
    res.send(err);
}

});

app.get("/read/all",async(req,res)=>{
try{
    const usersRef=db.collection("users");
    const response=await usersRef.get(); 
    let resArr=[];
    response.forEach((doc)=>{
        resArr.push(doc.data());
    });
    res.send(resArr);
} catch(error){
    res.send(error);
}
});

app.get("/read/:id",async(req,res)=>{
    try{
     const userRef=db.collection("users").doc(req.params.id)
     const response=await userRef.get(); 
     res.send(response.data());
    }catch(error){
        res.send(error);
    }
});

app.post("/update",async(req,res)=>{

try{
   const id=req.body.id;
   const newfirstname="hello world";

const userRef=await db.collectio("users").doc(id).update({
    firstname:newfirstname,
});
res.send(userRef);
}catch(error){
    res.send(error);
}
});

app.delete("/delete/:id",async(req,res)=>{
    try{
      const userRef=await db.collection("users").doc(req.params.id).delete();
      res.send(response);
    }catch(error){
        res.send(error);
    }
})

app.listen(3000,()=>{
    console.log(`Server is running on PORT 3000`);
})
