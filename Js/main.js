// console.log("Hello, World");
// ตัวแปรที่มีคือ String,Number,Boolean,Object,Array

// String
// let fname = "John";

// Number
// let age = 30;
// let height = 5.9;

// console.log("Name :",fname);
// console.log("Age :",age);
// console.log("Height :",height);


// + = บวก
// - = ลบ
// * = คูณ
// / = หาร
// % = mod

// let number1 = 10;
// let number2 = 3;

// let result = number1 + number2;

// console.log("ผลบวก = ",result);


/**
    == เท่ากับ
    != ไม่เท่ากับ
    > มากกว่า
    < น้อยกว่า
    >= มากกว่าเท่ากับ
    <= น้อยกว่าเท่ากับ
*/

// let number1 = 5;
// let number2 = 5;
// let condition = number1 < number2; //boolean
// console.log("condition :",condition);

// }if- else condition
// if (number1 > number2){
//      console.log("this is else if")

// }else if(number1 + number2){
//      console.log("this is else if")
// }
// else{
//      console.log("this is else");
// }


/**
 Grade
 >= 80 = A
    >= 70 B
    >= 60 C
    >= 50 D
    <  50 F
 */

    // let score = 85;
    // if(score>=80){
    //      console.log("Grade : A")
    // }else if(score >=70){
    //      console.log("Grade : B")
    // }else if(score >=60){
    //      console.log("Grade : C")
    // }else if(score >=50){
    //      console.log("Grade : D")
    // }else{
    //      console.log("Grade : C")
    // }

// let number1 = 5;
// let number2 = 10;

// let condition = (number > 0)&&(number2 > 0)
// console.log("Condition:",condition);

// let age = 25;
// let gender = "Female";
// if(age >= 18 && gender == "Female"){
//      console.log("คุณสามารถเข้าร่วมกิจกรรมได้")
// }

// let number1 = 20;

// if(!(number1 % 2 == 0)){
//      console.log("Even")
// }else{
//      console.log("Odd")
// }

let counter = 0;
while(counter <= 11){
    counter = counter+1
    console.log("While :",counter);
}

for(i=1;i <=5; i++){
    console.log("For:",i)
}