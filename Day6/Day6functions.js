function average(numbers_list) {
    var sum = 0;
    for (var i = 0; i < numbers_list.length; i++) {
        sum += numbers_list[i];
    }
    var average = sum / numbers_list.length;
    return average;
}

function assignGrade(grade) {
    if (grade < 60) {
        return 'F';
    } else if(grade >= 60 && grade < 70) {
        return 'D';
    }
    else if(grade >= 70 && grade < 80) {
        return 'C';
    }
    else if(grade >= 80 && grade < 90) {
        return 'B';
    }
    else if(grade >= 90) {
        return 'A';
    }
}

function pluralize(num, noun) {
    if(num === 1) {
        return num + " " + noun;
    } else {
        return num + " " + noun + "s";
    }
}

function longestWord(sentence) {
    var splitSentence = sentence.split(" ");
    var currLongestWord = " ";
    var currLongestLength = 0;
    for (var i = 0; i < splitSentence.length; i++) {
        var tempLength = splitSentence[i].length;
        if(tempLength > currLongestLength) {
            currLongestLength= tempLength;
            currLongestWord = splitSentence[i];
        }
    }
    return currLongestWord;
}

function palindrome(word) {
    var all= word.split("");
    for (var i=0; i<word.length; i++) {
        if (all[i]!==all[word.length-1-i]) {
            return 'no';
        } 
    }
    return 'yes';
}

function letterCounter(phrase, letter) {
    var currCount=0;
    var all=phrase.split("");
    for(var i = 0; i < phrase.length; i++) {
        if(all[i] == letter)
            currCount++;
    }
    return currCount;
}

function longestPalindrome(sentence) {
    var longest=longestWord(sentence);
    if (palindrome(longest)=='yes') {
        return longest + " is a palindrome";
    } 
    else {
        return longest + " is not a palindrome";
    }
}

function areAnagrams (sentence1, sentence2) {
    var temp1=sentence1.split("").sort().join("").trim();
    var temp2=sentence2.split("").sort().join("").trim();

    console.log(temp1);
    console.log(temp2);   

    if (temp1===temp2) return "yes";
    else return "no";
}