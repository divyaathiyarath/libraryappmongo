const Express=require('express');
var app=new Express();
app.set('view engine','ejs');
var request=require('request');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
// mongoose.connect("mongodb://localhost:27017/librarydb");
mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-rfooj.mongodb.net/test?retryWrites=true&w=majority");
var LibraryModel=mongoose.model("library",{
    title:String,
    author:String,
    publisher:String,
    date_of_publication:String,
    distributor:String,
    price:String,
    description:String,
    pic:String

});
var AuthorModel=mongoose.model("libraryAuthor",{
           name:String,
           place:String,
           dob:String,
           pic:String
});
app.use(Express.static(__dirname+"/public"));
// books=[
//     {
//         'title':'Turning points',
//         'author':'A.P.J.Abdul Kalam',
//         'publisher':'HarperCollins',
//         'date_of_publication':'8/9/2012',
//         'distributor':'HarperCollins',
//         'price':225,
//         'Description':'Turning points',
//         pic:"/img/turningpoints.jpg"


//     },
//     {
//         title:"Randamoozham",
//         author:"M.T.Vasudevan Nair",
//         publisher:"DC Books",
//         date_of_publication:"December 1984",
//         distributor:"DC Books",
//         price:225,
//         Description:"Malayalam novel",
//         pic:"/img/randamoozham.jpg"

//     },
//     {
//         title:"Aarachaar",
//         author:"K.R.Meera",
//         publisher:"DC Books",
//         date_of_publication:"1 November 2012",
//         distributor:"DC Books",
//         price:225,
//         Description:"Novel",
//         pic:"/img/aarachar.jpg"
//     },
//     {
//         title:"Pathummayude Aadu",
//         author:"Vaikom Muhammad Basheer",
//         publisher:"DC Books",
//         date_of_publication:"April 1959",
//         distributor:"DC Books",
//         price:225,
//         Description:"Novel",
//         pic:"/img/pathummayudeaadu.jpg"

//     },
//     {
//         title:"Oru Desathinte Katha",
//         author:"S. K. Pottekkatt",
//         publisher:"DC Books",
//         date_of_publication:"1971",
//         distributor:"DC Books",
//         price:225,
//         Description:"Novel",
//         pic:"/img/orudeshathintekatha.jpg"

//     },
//     {
//         title:"Oru Sankeerthanam Pole",
//         author:"Perumbadavam Sreedharan",
//         publisher:"DC Books",
//         date_of_publication:"September 1993",
//         distributor:"DC Books",
//         price:225,
//         Description:"Novel",
//         pic:"/img/orusankeerthanampole.jpg"
//     },
//     {
//         title:"Naalukettu",
//         author:"M. T. Vasudevan Nair",
//         publisher:"DC Books",
//         date_of_publication:"1958",
//         distributor:"DC Books",
//         price:225,
//         Description:"Novel",
//         pic:"/img/naalukettu.jpg"

//     },
//     {
//         title:"Ente Katha",
//         author:"Kamala Suraiyya",
//         publisher:"DC Books",
//         date_of_publication:"1 February 1973",
//         distributor:"DC Books",
//         price:225,
//         Description:"Novel",
//         pic:"/img/entekatha.jpg"

//     },
//     {
//         title:"Balyakalasakhi",
//         author:"Vaikom Muhammad Basheer",
//         publisher:"DC Books",
//         date_of_publication:"1944",
//         distributor:"DC Books",
//         price:225,
//         Description:"Novel",
//         pic:"/img/balyakalasakhi.jpg"
//     },
//     {
//         title:"Ini Njan Urangatte",
//         author:"P. K. Balakrishnan",
//         publisher:"DC Books",
//         date_of_publication:"1973",
//         distributor:"DC Books",
//         price:225,
//         Description:"Novel",
//         pic:"/img/ininjanuranghatte.jpg"
//     }];

    // authors=[
    //     {
    //        name:"A.P.J Abdulkalam",
    //        place:"Tamilnadu",
    //        dob:"15 October 1931",
    //        pic:"/img/abdulkalam.jpg"
    //     },
    //     {
    //        name:"M. T. Vasudevan Nair",
    //        place:" Kudallur",
    //        dob:"9 August 1933",
    //        pic:"/img/mt.jpg"
    //     },
    //     {
    //        name:"K. R. Meera",
    //        place:"Sasthamkotta",
    //        dob:"19 February 1970",
    //        pic:"/img/krmeera.jpg"
    //     },
    //     {
    //        name:"Vaikom Muhammad Basheer",
    //        place:"Thalayolaparambu",
    //        dob:"21 January 1908",
    //        pic:"/img/basheer.jpg"
    //     },
    //     {
    //        name:"S. K. Pottekkatt",
    //        place:"Kozhikode",
    //        dob:"14 March 1913",
    //        pic:"/img/skpottekkatt.jpg"
    //     },
    //     {
    //         name:"Perumbadavam Sreedharan",
    //         place:"Perumpadavom",
    //         dob:"12 February 1938",
    //         pic:"/img/perumbadavam.jpg"
    //     },
        
    //     {
    //         name:"Kamala Suraiyya",
    //         place:"Punnayurkulam",
    //         dob:"31 March 1934",
    //         pic:"/img/kamala.jpg"

    //     },
    //     {
    //         name:"P. K. Balakrishnan",
    //         place:" Ernakulam",
    //         dob:"2 March 1925",
    //         pic:"/img/balakrishnan.jpg"
    //     }
    // ];
nav=[{
    link:"/books",
    title:"books"

},
{
    
        link:"/authors",
        title:"authors"
},
{
    
    link:"/addbooks",
    title:"add books"
},
{
    
    link:"/addauthors",
    title:"add authors"
}
];


app.get('/',(req,res)=>{
    res.render('index',{nav:nav,title:"Library"});
});

app.get('/index',(req,res)=>{
    res.render('index',{nav:nav,title:"Library"});
});
app.get('/books',(req,res)=>{
    
  //  const readbook="http://localhost:3000/getdataApi";
  const readbook="https://libraryappdivyaict.herokuapp.com/getdataApi";

    request(readbook,(error,response,body)=>
{
   var books=JSON.parse(body);
   res.render('books',{nav:nav,title:"Books",books:books});

})
    
});
app.get('/booksingle/:id',(req,res)=>{

    const x=req.params.id;
   // const readbook="http://localhost:3000/getsinglebookApi/"+x;
   const readbook="https://libraryappdivyaict.herokuapp.com/getsinglebookApi/"+x;
    request(readbook,(error,response,body)=>
{
   var books=JSON.parse(body);
   console.log(books);
   res.render('booksingle',{nav:nav,title:"Books",books:books[0]});

})
    
});
app.get('/authors',(req,res)=>{
    // 
   // const authorlink="http://localhost:3000/getauthorApi";
   const authorlink="https://libraryappdivyaict.herokuapp.com/getauthorApi";
   
    request(authorlink,(error,response,body)=>{
        var authors=JSON.parse(body);
        if(error)
        {
            throw error;
        }
        else{
            res.render('authors',{nav:nav,title:"Authors",authors:authors});
        }
        
    });
});
app.get('/authorsingle/:id',(req,res)=>{

    const x=req.params.id;
//  const readauthor="http://localhost:3000/getsingleauthorApi/"+x;
const readauthor="https://libraryappdivyaict.herokuapp.com/getsingleauthorApi/"+x;

    request(readauthor,(error,response,body)=>
{
   var authors=JSON.parse(body);
   console.log(authors);
   res.render('authorsingle',{nav:nav,title:"Authors","authors":authors[0]});

});

});
app.get('/addbooks',(req,res)=>
{
    res.render('addbooks',{nav:nav,title:"Books"});
})
app.post('/readbooksApi',(req,res)=>
{
    var book=new LibraryModel(req.body);
    var bdata=book.save((error)=>
{
    if(error)
    {
        throw error;
    }
    else{
        console.log(bdata);
    }
});
res.send("<script> window.location.href='/addbooks' </script>");

});




app.get('/getdataApi',(req,res)=>
{
  LibraryModel.find((error,data)=>
{
    if(error)
    {
        throw error;
        res.send(error);
    }
    else{
        res.send(data);
    }
});
});


app.get('/getsinglebookApi/:id',(req,res)=>{
    var id=req.params.id;
    LibraryModel.find({_id:id},(error,data)=>{
        if(error)
        {
            throw error;
        }
        else{
            res.send(data);
        }
    });
});




app.get('/getsingleauthorApi/:id',(req,res)=>{
    var id=req.params.id;
    AuthorModel.find({_id:id},(error,data)=>{
        if(error)
        {
            throw error;
        }
        else{
            res.send(data);
        }
    });
});















app.get('/addauthors',(req,res)=>
{
    res.render('addauthors',{nav:nav,title:"Authors"});
});

app.post('/readauthorsApi',(req,res)=>
{
    var author=new AuthorModel(req.body);
    var result=author.save((error)=>{
        if(error)
        {
            throw error;
        }
        else{
            res.send("<script> window.location.href='/addauthors' </script>");
        }
    });
  
});
app.get('/getAuthorApi',(req,res)=>
{
    AuthorModel.find((error,data)=>
{
    if(error)
    {
        throw error;
    }
    else{
        res.send(data);
    }
});

});


app.listen(process.env.PORT || 3000,()=>
{
    console.log("Server is running");
});