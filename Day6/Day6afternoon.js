
// Return 'yes' if the sentence contains only unique characters, 'no' otherwise
function allUniqueCharacters(sentence) {
    var all=sentence.split("").sort().join("").trim();
    console.log(sentence);
    var arr=all.split("");
    for (var i=0;i<all.length;i++) {
        if (arr[i]===arr[i+1]) return 'no';
    }
    return 'yes';
}

// One number 1-10 is missing. Return it!
function missingNum(numbers) {
    for (var i=1;i<11;i++) {
        var found=false;
        for (var j=0;j<numbers.length;j++) {
            if (i===numbers[j]) found=true;
        }
        if (!found) return i;
    }
}

// Return 'yes' if array1 and array2 are rotated versions of each other, 'no' otherwise
// e.g. [1,2,3,6,7,8] and [3,6,7,8,1,2] are rotated versions of each other
function areRotatedVersions(array1, array2) {
    if (array1.length!== array2.length) return 'no';  //quick check
    var str1=array1.join("");
    var str2=array2.join("");
    var idx;
    var temp;

    for (var i=0;i<array1.length;i++) {
        if (array1[i]===array2[0]) {
            idx=i;
            //console.log(i);
        }
    }
    temp=str1.substring(idx)+str1.substring(0,idx);
    //console.log(temp);
    if (temp===str2) return 'yes';
    if (temp!== str2) return 'no';
}

// Return a string of the first n prime numbers, separated by commas
// e.g. "1,2,3,4"
function nPrimeNums(n) {
    var count=0;
    var num=2;
    var str="";
    while (count<n) {
        if (isPrime(num)) {
            str+=num+",";
            count++;
        } 
        num++;
    }
    return str.substring(0,str.length-1);
}

function isPrime(n) {
    for(var i=2;i<n;i++) {
        if(n%i==0)
            return false;
    }
    return true;
}

// Return the output of running the function f twice
// e.g. doitTwice(function f() {return 1;}) === 2
function doItTwice(f) {
    var one=f();
    return one+one;
}

// Return an object that has the properties: first name, last name, age, email, and favorite color
function objectFun(first, last, age, email, color) {
    var person = {
        first_name:first,
        last_name:last,
        age:age,
        email:email,
        fav_color:color
    }
    return person;
}

// Return the number of "children" obj has
function numChildren(obj) {
    return obj.children.length;
}

function greeting(name) {
    return "Hello, " + name + "!";
}

// Say hello! This function takes a function as a parameter (greet should be a function)
function sayHello(first, last, greet) {
    return greet(first+" "+last);
}