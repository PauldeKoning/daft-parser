# Daft Parser

![Test coverage statements](coverage/badge-statements.svg) 
![Test coverage branches](coverage/badge-branches.svg) 
![Test coverage functions](coverage/badge-functions.svg) 
![Test coverage lines](coverage/badge-lines.svg)

--------------
This project was created to parse listings from the popular Irish property website https://daft.ie/

--------------

### Usage

```javascript
import { getDaftListings } from "daft-parser";

getDaftListings({
    area: "dublin-city",
}).then((r) => console.log(r));
```

### Result

```
[
  {
    id: 5797876,
    bathrooms: 1,
    bedrooms: 1,
    type: 'Apartment',
    location: 'Dublin 8',
    price: 1500
  },
  { id: 5797547, type: 'Studio', location: 'Dublin 1', price: 1400 },
  ...
]
```