# Collection

### How to use

#### Importing
##### Using EcmaScript 6
```js
import Collection from "collection"
```
##### Using Common JS
```js
const Collection = require("collection")
```

#### Example
```js
class Base {
    constructor(id, your_params) {
        this.id = id
        // code here
    }
}

const collect = new Collection(Base, Infinity)

collect.set("key name", {}) // Set value in collection

collect.add({
    id: "some id"
}) // Add value to collection

collect.map((value) => value.id) // Returns array with ids

collect.forEach((value) => /* Your code here */)

collect.filter((value) => value.id !== "1234") // Returns a new array where ids not equal to 1234

collect.all() // Returns a new array with all collection values