# MY JAVASCRIPT CODE

## Number
### To fixed the number of decimal after comma
```javascript
decimal.toFixed(number)
```

### Test if number
```javascript
testNumber: function (item) {
      if (/^\d+$/.test(item)) return true;
      else return false;
   }
   
function testNumber(item) {
    if (!isNaN(item)) return true;
    else return false;
}
```

## Array
### Sum of array elements
```javascript
return array.reduce((a,b)=> a+b, 0); 
```

## Object
### Object.method1().method2()
```javascript
const myObject = {
  method1() {
    console.log('This is method 1');
    return {
      method2() {
        console.log('This is method 2');
      }
    };
  }
};

myObject.method1().method2(); // Output: "This is method 1" followed by "This is method 2"
```

## Aschyncronisation
### async parallel
```javascript
async.parallel([function1(callback){}, function2(callback){}, function3(callback){}], callback());
```
