
<a name="readme-top"></a>
 
 
<!-- PROJECT LOGO -->
<br />
<div align="center">
   
  <a href="https://blogapp-backend-express.vercel.app/api-doc/">
    <img src="./src/assets/logo.png" alt="Logo" width="250"   >
  </a>

  <h3 align="center">Blog App backend | Fullstack</h3>

  <p align="center">
    An awesome backend of the Blog App fullstack application
    <a href="https://github.com/ibrsec/blogapp-backend-express"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://blogapp-backend-express.vercel.app/api-doc/">Backend Swagger</a>
    <br />
    ·
    <a href="https://blogapp-frontend-react.vercel.app/">Frontend Live Link</a>
    ·
    <a href="https://github.com/ibrsec/blogapp-frontend-react">frontend Repo</a>
    ·
    <a href="https://github.com/ibrsec/blogapp-backend-express/issues">Report Bug</a>
    ·
    <a href="https://github.com/ibrsec/blogapp-backend-express/issues">Request Feature</a> 
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>📎 Table of Contents 📎 </summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#erd">ERD</a></li>
     <!-- <li><a href="#figma">Figma</a></li> -->
     <li><a href="#overview">Overview</a></li>
     <li><a href="#quick-setup">Quick Setup</a></li>
     <li><a href="#directory-structure">Directory structure</a></li>
     <li><a href="#built-with">Built With</a></li>
    <!-- <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li> -->

    
  </ol>
</details>





---

<!-- ABOUT THE PROJECT -->
<a name="about-the-project"></a>
## ℹ️ About The Project
 
[![blogapp-backend-express](./src/assets/swagger.png)](https://blogapp-backend-express.vercel.app/api-doc/)

<!-- ERD OF THE PROJECT -->
<a name="erd"></a>
## ℹ️ ERD
[![blogapp-backend-express](./src/assets/erd.png)](https://blogapp-backend-express.vercel.app/api-doc/)




<p align="right">(<a href="#readme-top">back to top</a>)</p>


---

<!-- ## Figma 

<a href="https://www.figma.com/file/ePyCHKsx2ODB32uLgyUEEd/bootstrap-home-page?type=design&node-id=0%3A1&mode=design&t=edDzadCB9Ev5FS1a-1">Figma Link</a>  

  <p align="right">(<a href="#readme-top">back to top</a>)</p>




--- -->
<a name="overview"></a>
## 👀 Overview

📦 Backend of the    <a href="https://github.com/ibrsec/blogapp-frontend-react">blogapp-frontend</a> project  for store data </br>
🎯 Used express, dotenv, express-async-errors,jsonwebtoken, mongoose, swagger-jsdoc, swagger-ui-express,cors </br>
🖥 MongoDb is used as db </br>
🔩 Jwt token authentication is use for authorization an authentication operations </br>
<!-- 🖥 --</br> -->
🖥 Unauthorized user can just access the list of the blogs and cant access details and modification features. if user trys to , he is redirected to the login page.</br>
 🔩 User can Register and login ! </br>
🖥 After login, user can screen the details of the blogs and create new blogs and can edit and delete his own blogs</br>




<!-- 💪 -</br> -->
<!-- 🌱 -</br> -->
 <!-- 🐞 ---  </br> -->
<!-- 🏀 --- </br> -->
<!-- 🌱  ---</br>   -->
</br>


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<a name="quick-setup"></a>
## 🛫 Quick Setup

```sh
# clone the project
git clone https://github.com/ibrsec/blogapp-backend-express.git

# enter the project directory
cd blogapp-backend-express

# install dependency
npm install 

# develop
npm run start 
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ## 🐞 Debug

![blogapp-backend-express.gif](/blogapp-backend-express.gif) -->








<a name="directory-structure"></a>
## 📂 Directory structure 

```diff
+ blogapp-backend-express  (folder)     
+     |---src (folder) 
      |     |---config (folder)       
      |     |           
      |     |---controller (folder) 
      |     |    
      |     |---middlewares (folder)      
      |     |          
      |     |---helpers (folder)      
      |     |          
      |     |---models (folder)           
      |     |          
      |     └---routers (folder)  
      |      
      |----swagger (folder) 
      |----.env
      |----.gitignore
      |----package.json
      |----vercel.json
      └----readme.md 
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a name="built-with"></a>
### 🏗️ Built With

 
<!-- https://dev.to/envoy_/150-badges-for-github-pnk  search skills-->

 <!-- <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white"> -->
 <!-- <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white&color=red">  -->
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
 <!-- <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Vite-AB4BFE?style=for-the-badge&logo=vite&logoColor=FFC920">  -->
 <!-- <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">  -->
 <!-- <img src="https://img.shields.io/badge/Next-20232A?style=for-the-badge&logo=next&logoColor=61DAFB">  -->
 <!-- <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/App-Router-CA4245?style=for-the-badge&logo=app-router&logoColor=white">  -->

  <!-- <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">   -->
 <!-- <img src="https://img.shields.io/badge/Redux Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Redux--Persist -593D88?style=for-the-badge&logo=redux&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Context API-593D88?style=for-the-badge&logo=context&logoColor=white">  -->


 <!-- <img src="https://img.shields.io/badge/Axios-593D88?style=for-the-badge&logo=axios&logoColor=white">  -->

 <!-- <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">  -->

 <!-- <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Formik-172B4D?style=for-the-badge&logo=formik&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Yup-172B4D?style=for-the-badge&logo=yup&logoColor=white">  -->
 <!-- <img src="https://img.shields.io/badge/Toastify-45CC11?style=for-the-badge&logo=toastify-ui&logoColor=white">  -->
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> 
 <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"> 
 <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> 
 <img src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"> 
 <img src="https://img.shields.io/badge/Swagger-4EA94B?style=for-the-badge&logo=swagger&logoColor=white"> 
 

 <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> 


 
<p align="right">(<a href="#readme-top">back to top</a>)</p>



