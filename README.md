# Real-Time Quiz App Frontend

This repository contains the frontend for a real-time quiz application built with React. The frontend allows users to create quizzes, join quiz sessions, and participate in real-time quiz interactions.


1. Clone this project

```shell
git clone https://github.com/chaddaess/mentimeter-front
```

2. Navigate into the project directory:

```shell
 cd mentimeter
```

3. Install dependencies
```shell
  npm install
```


5. Running the app
````shell
npm run dev

````

6. Routing system 

To define routes for the different pages and navigate between them effectively , we'll use ``react-router-dom``.
To do that we'll wrap our app inside a 
``
<BrowserRouter> </BrowserRouter>
``
component. Then inside the 
``
<Routes> </Routes>
``
component , we will specify our pages as well as their routes (path) and content (element) like so 
````js
<Route path="path/to/page" element={<ComponentName/>}></Route>
```` 
A react router tutorial I have found helpful : https://www.youtube.com/watch?v=59IXY5IDrBA&t=14s&ab_channel=freeCodeCamp.org