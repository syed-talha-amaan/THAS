function _keys(obj) 
 {
    if (Object.keys) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    console.log(keys.join(','))
    }
  }



function del(obj){
    console.log(student);
    delete student.rollno;
    console.log(student);
}



function _size(Myobj) {
    var size = 0, key;
    for (key in Myobj) {
        if (Myobj.hasOwnProperty(key)) size++;
    }
    console.log(size);
}


var student = { name : "David Rayy", sclass : "VI", rollno : 12 };


_keys(student);
del(student);
_size(student);


function stat(arr){
    for (var i = 0; i < library.length; i++) 
   {
    var book = "'" + library[i].title + "'" + ' by ' + library[i].author + ".";
    if (library[i].readingStatus) {
      console.log("read " + book);
    } 
    else
    {
     console.log("still need to read " + book);
    }
   }
}


var library = [ { author: 'Bill Gates',
                  title: 'The Road Ahead', 
                  readingStatus: true },
                { author: 'Steve Jobs',
                  title: 'Walter Isaacson', 
                  readingStatus: true }, 
                { author: 'Suzanne Collins',
                  title: 'Mockingjay: The Final Book of The Hunger Games',
                  readingStatus: false }]; 

stat(library);


function Cylinder(height, radius) {
  this.height = height;
  this.radius = radius;
}

function volume(cl){
  var radius = cl.radius;
  return cl.height * Math.PI * radius * radius;
};

var cyl = new Cylinder(7, 4);
console.log('volume =', volume(cyl).toFixed(4));



var library = [ { title: 'The Road Ahead', author: 'Bill Gates', libraryID: 1254 }, { title: 'Walter Isaacson', author: 'Steve Jobs', libraryID: 4264 }, { title: 'Mockingjay: The Final Book of The Hunger Games', author: 'Suzanne Collins', libraryID: 3245 }];

var sort_by = function(field_name, reverse, initial){

   var key = initial ?
       function(x)
             {
               return initial(x[field_name]);
             } :
       function(x) 
             {
               return x[field_name];
             };

   reverse = !reverse ? 1 : -1;

   return function (x, y) {
       return x = key(x), y = key(y), reverse * ((x > y) - (y > x));
     } ;
};


var newobj = library.sort(sort_by('libraryID', true, parseInt));

console.log(newobj);

