function is_array(a){
    return(Array.isArray(a));
}
console.log(is_array('w3resource'))
console.log(is_array([1,2,0,4]));

function array_Clone(a){
    return a.slice(0);
}
console.log(array_Clone([1, 2, 4, 0]));
console.log(array_Clone([1, 2, [4, 0]]));


function first(a,n=a.length){
    i=a.length;
    if (i>=n && n>0) {
        return a.slice(0,n);
    }
    else if(n<=0){
        return [];
    }
    else if(i<n){
        return a.slice(0)
    }
}
console.log(first([7,9,0,2]));
console.log(first([],3));
console.log(first([7, 9, 0, -2],3));
console.log(first([7, 9, 0, -2],6));
console.log(first([7, 9, 0, -2],-3));


function a_to_s(arr){
    console.log(arr.join(','));
    console.log(arr.join(','));
    console.log(arr.join('+'));
}

myColor = ["Red", "Green", "White", "Black"];
a_to_s(myColor)


var arr1=[3,'a','a','a',2,3,'a',3,'a',2,4,9,3];
var mf = 1;
var m = 0;
var item;
for (var i=0; i<arr1.length; i++)
{
        for (var j=i; j<arr1.length; j++)
        {
                if (arr1[i] == arr1[j])
                 m++;
                if (mf<m)
                {
                  mf=m; 
                  item = arr1[i];
                }
        }
        m=0;
}
console.log(item+" ( " +mf +" times ) ") ;

