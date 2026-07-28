// const prices = [100, 250, 75, 300];
// const newp = prices.map(price => price * 1.10);
// console.log(newp);

// const words = ['cat', 'elephant', 'dog', 'hippopotamus', 'ant'];
// const smalls = words.filter(word => word.length <= 4);
// console.log(smalls);

// const cart = [
//     { item: 'pen', qty: 2, price: 10 },
//     { item: 'book', qty: 1, price: 150 }
// ];
// const cost = cart.reduce((sum, item) => sum + item.qty * item.price,0);
// console.log(cost);

// const students = ['ravi', 'sita', 'aman'];
// students.forEach(student => {
//     console.log(student.toUpperCase());
// });

// const marks = [45, 67, 89, 32, 55];
// const fail = marks.some(marks => marks < 40);
// const pass = marks.every(marks => marks >= 40);
// if (fail == true){
//     console.log("Students have failed");
// } else {
//     console.log("No students failed");
// }
// if (pass == true){
//     console.log("All students passed");
// } else {
//     console.log("Not all students have passed");
// }

// const users = [
//     { id: 1, name: 'A' },
//     { id: 2, name: 'B' },
//     { id: 3, name: 'C' }
// ];
// const user = users.find(user => user.id === 2);
// const index = users.findIndex(user => user.id === 2);
// console.log(`User with index 2 is ${user.name}, present at index ${index} (position ${index+1})`);

// const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
// const midDays = days.slice(1, 4);
// console.log(`Sliced: ${midDays}`);
// console.log(`Original: ${days}`);
// days.splice(2, 1);
// console.log(`Original after splice: ${days}`);

// const car = {
//     brand: 'Toyota',
//     model: 'Corolla',
//     year: 2022
// };
// console.log(`Key values: ${Object.keys(car)}`);
// console.log(`Values: ${Object.values(car)}`);
// console.log(`Entries: ${Object.entries(car)}`);

// const defaults = {
//     theme: 'light',
//     fontSize: 14
// };
// const userPrefs = {
//     fontSize: 18
// };
// const settings = Object.assign({}, defaults, userPrefs);
// console.log(settings);

// const a = { x: 1, y: 2 };
// const b = { y: 5, z: 9 };
// const final = { ...a, ...b };
// console.log(final);

// const employees = [
//     { name: 'Ravi', dept: 'Sales', salary: 30000 },
//     { name: 'Sita', dept: 'IT', salary: 45000 },
//     { name: 'Aman', dept: 'Sales', salary: 32000 }
// ];
// const names = employees.map(employee => employee.name);
// const snames = employees.filter(employee => employee.dept === 'Sales');
// const totalsalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
// console.log(`Employee names: ${names}`);
// console.log("Employees in Sales:", snames);
// console.log(`Total Salary: ${totalsalary}`);

// const inventory = [
//     { item: 'Pen', stock: 0 },
//     { item: 'Book', stock: 5 }
// ];
// const out = inventory.find(item => item.stock === 0);
// console.log(`Items out of stock: ${out.item}`);
// console.log(`Key values: ${Object.keys(inventory[0])}`);

// const students = [
//     { id: 101, name: "Raman" },
//     { id: 102, name: "Sanam" },
//     { id: 103, name: "Baman" }
// ];
// console.log("Original Students:",students);
// const index = students.findIndex(student => student.id === 102);
// if (index !== -1) {
//     console.log(`Student found at index ${index}`);
//     students.splice(index, 1); 
// } else {
//     console.log("Student not found");
// }
// console.log("Students after deletion: ", students);

// const fruits = new Map()
//     .set("Lemon", 20)
//     .set("Mango", 90)
//     .set("Guava", 80);
// console.log(fruits);

// for (const [key, value] of fruits) {
//     console.log(`${key}: ${value}`);
// }
// fruits.forEach((value, key) => {
//     console.log(`${key}: ${value}`);
// });

// const obj = {a: 1, b: 2, c: 3};
// const map = new Map(Object.entries(obj));
// console.log("New map from object:",map);
// const newobj = Object.fromEntries(map);
// console.log("New object from map:",newobj);

// const visitors = ['Ravi', 'Sita', 'Ravi', 'Aman', 'Sita'];
// const uniqueset = new Set(visitors);
// console.log("Set of unique visitors:",uniqueset);
// const uniquearray = [...uniqueset];
// console.log("Uniqe visitors array:",uniquearray);

// function hasDuplicates(arr) {
//   return new Set(arr).size !== arr.length;
// }
// console.log("Does [1,2,3] have any duplicates:",hasDuplicates([1, 2, 3]));
// console.log("Does [1,2,2,3] have any duplicates:",hasDuplicates([1, 2, 2, 3]));

// const setA = [1, 2, 3, 4];
// const setB = [3, 4, 5, 6];
// const union = [...new Set([...setA, ...setB])];
// const intersection = setA.filter(value => setB.includes(value));
// console.log("Union of sets is:",union);
// console.log("Intersection of sets is:",intersection);

// const orders = [
//     { id: 1, customer: 'Ravi', amount: 500, status: 'delivered' },
//     { id: 2, customer: 'Sita', amount: 1200, status: 'pending' },
//     { id: 3, customer: 'Ravi', amount: 300, status: 'delivered' },
//     { id: 4, customer: 'Aman', amount: 800, status: 'cancelled' }
// ];
// const totalDelivered = orders
//     .filter(order => order.status === "delivered")
//     .reduce((sum, order) => sum + order.amount, 0);
// console.log(`Total amount of delivered orders: ${totalDelivered}`);
// const customers = [...new Set(orders.map(order => order.customer))
// ];
// console.log("Unique customers are:",customers);
// const customerTotals = new Map();
// orders.filter(order => order.status === "delivered").forEach(order => {
//     const current = customerTotals.get(order.customer) || 0;
//     customerTotals.set(order.customer, current + order.amount);
// });
// console.log("Total amount spent by each customer:",customerTotals);





// let num1 = 6;
// let num2 = 7;
// let operator = "+";
// let result;
// switch (operator) {
//     case "+":
//         result = num1 + num2;
//         break;
//     case "-":
//         result = num1 - num2;
//         break;
//     case "*":
//         result = num1 * num2;
//         break;
//     case "/":
//         if (num2 !== 0) {
//             result = num1 / num2;
//         } else {
//             result = "Cannot divide by zero";
//         }
//         break;
//     default:
//         result = "Invalid operator";
// }
// console.log("Result:", result);




// let a = 6;
// let b = 7;
// console.log("Before swapping:");
// console.log("a =", a);
// console.log("b =", b);
// a = a + b;
// b = a - b;
// a = a - b;
// console.log("After swapping:");
// console.log("a =", a);
// console.log("b =", b);




// let principal = 77777;
// let rate = 7;
// let time = 3;
// let simpleInterest = (principal * rate * time) / 100;
// console.log("Simple Interest =", simpleInterest);




// let num = 7;
// if (num % 2 === 0) {
//     console.log(num + " is Even");
// } else {
//     console.log(num + " is Odd");
// }



// let a = 25;
// let b = 48;
// let c = 31;
// if (a >= b && a >= c) {
//     console.log("Largest number is:", a);
// } else if (b >= a && b >= c) {
//     console.log("Largest number is:", b);
// } else {
//     console.log("Largest number is:", c);
// }



// let marks = 77;
// if (marks >= 90) {
//     console.log("Grade: A");
// } else if (marks >= 75) {
//     console.log("Grade: B");
// } else if (marks >= 60) {
//     console.log("Grade: C");
// } else if (marks >= 40) {
//     console.log("Grade: D");
// } else {
//     console.log("Fail");
// }




// let year = 1900;
// if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
//     console.log(year + " is a Leap Year");
// } else {
//     console.log(year + " is Not a Leap Year");
// }



// let num = 5;
// console.log("Multiplication Table of", num);
// for (let i = 1; i <= 10; i++) {
//     console.log(num + " x " + i + " = " + (num * i));
// }



// let num = 123;
// let sum = 0;
// let temp = num;
// while (temp > 0) {
//     let digit = temp % 10;
//     sum += digit;
//     temp = Math.floor(temp / 10);
// }
// console.log("Sum of digits of", num, "=", sum);



// let num = 123;
// let reverse = 0;
// let temp = num;
// while (temp > 0) {
//     let digit = temp % 10;
//     reverse = reverse * 10 + digit;
//     temp = Math.floor(temp / 10);
// }
// console.log("Reverse of", num, "=", reverse);



// let num = 7;
// let isPrime = true;
// if (num <= 1) {
//     isPrime = false;
// } else {
//     for (let i = 2; i <= num/2; i++) {
//         if (num % i === 0) {
//             isPrime = false;
//             break;
//         }
//     }
// }
// if (isPrime) {
//     console.log(num + " is a Prime Number");
// } else {
//     console.log(num + " is Not a Prime Number");
// }



// let n = 7;
// let first = 0;
// let second = 1;
// console.log("Fibonacci Series:");
// for (let i = 1; i <= n; i++) {
//     console.log(first);

//     let next = first + second;
//     first = second;
//     second = next;
// }


// let num = 121;
// let original = num;
// let reverse = 0;
// while (num > 0) {
//     let digit = num % 10;
//     reverse = reverse * 10 + digit;
//     num = Math.floor(num / 10);
// }
// if (original === reverse) {
//     console.log(original + " is a Palindrome");
// } else {
//     console.log(original + " is Not a Palindrome");
// }



// let str = "madam";
// let reverse = "";
// for (let i = str.length - 1; i >= 0; i--) {
//     reverse += str[i];
// }
// if (str === reverse) {
//     console.log(str + " is a Palindrome");
// } else {
//     console.log(str + " is Not a Palindrome");
// }



// let str = "hello";
// let reverse = "";
// for (let i = str.length - 1; i >= 0; i--) {
//     reverse += str[i];
// }
// if (str === reverse) {
//     console.log(str + " is a Palindrome");
// } else {
//     console.log(str + " is Not a Palindrome");
// }



// let numbers = [12, 45, 3, 89, 27];
// let largest = numbers[0];
// for (let i = 1; i < numbers.length; i++) {
//     if (numbers[i] > largest) {
//         largest = numbers[i];
//     }
// }
// console.log("Largest Element:", largest);



let str = "Hello World";
let count = 0;
for (let i = 0; i < str.length; i++) {
    let ch = str[i].toLowerCase();

    if (
        ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u"
    ) {
        count++;
    }
}
console.log("Number of vowels:", count);