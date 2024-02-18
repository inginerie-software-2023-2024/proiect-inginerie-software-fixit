# FixIT

<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/93039914/9242e5d4-d2b0-4cbc-9400-487b64b6aeca" alt="image">
</div>

<br>

# Product Vision


We are going to present  our fullstack application called <b>FixIT</b>. This application makes the communication between clients and service providers a lot more fluently and efficiently. Through our platform,
users can create an account and search for specific services that they need. Our special feature is that our application is more like a social-media platform, meaning that our customers
can add friends. Why would we add that feature? Well, we've thought about it this way: first, when we want to hire someone that we do not know personally we ask a friend, if he/she knows somebody
trustworthy. Now, with our application, you can see the reviews of the workers that have done projects for your friends, and see how your close ones reviewed them. This app was designed to be used by craftsmen who want their services to be easily found by potential clients, but also by those who need help from a specialist. We want to simplify the scheduling process for some services by adding an appointment form for each post.

<br>

# Planned Features
- Adding the feature of the "Saved Posts", a new page in which both the client and the master are able to see their favorite posts and acces them quicker when wanting to make appointments; this way they don't have to manually search them in the Home Page of the respective master Profile Page.

<br>

# Planned  Functionalities
- CRUD for the saved posts. 

- The number of users that have saved the post, this only being shown to the actual master who created it in the first place.

<br>

# Software Architecture Report

[Software Architecture Report](https://docs.google.com/document/d/1hVXitoXrojEzeVc0HDQpT_OcOzeuTL3YuohTSd9RKWo/edit?usp=sharing)

<br>

# Sprint Reports

- [Sprint 4 Report](https://github.com/inginerie-software-2023-2024/proiect-inginerie-software-fixit/blob/main/Sprint%204%20Report.pdf)
- [Sprint 5 Report](https://github.com/inginerie-software-2023-2024/proiect-inginerie-software-fixit/blob/main/Sprint%205%20Report.pdf)
- [Sprint Sesiune Report](https://github.com/inginerie-software-2023-2024/proiect-inginerie-software-fixit/blob/main/Sprint%20Sesiune.pdf)

<br>

# Contributors
- [David Bojneagu](https://github.com/DBojneagu)
- [Elena Georgescu](https://github.com/elenaag23)
- [Cosmina Gheorghe](https://github.com/cosminagheorghe47)
- [Mara Neagu](https://github.com/maraneagu)
- [Vlad Talpiga](https://github.com/vladtalpiga)

<br>

# Demo
- [Demo Nou](https://youtu.be/cRGBeG0nk-s)

- [Demo Vechi](https://youtu.be/qrWF7znqEJA)

<br>

# User Persona

## Master
<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/93272424/fd332bd6-76b5-40c0-af61-4a8c7390efa7" alt="image" width="600px">
</div>

<br>

## Client
<div align="center">
    <img src="https://github.com/inginerie-software-2023-2024/proiect-inginerie-software-fixit/assets/93272424/fe66ebbb-7c38-4018-a1d4-42a4ef9392aa" alt="image" width="600px">
</div>

<br>

# User Stories
- [User Stories](https://github.com/maraneagu/FixIT-IS/wiki/User-Stories)

<br>

# TechStack 
1. React for the frontend
2. MongoDB for the NoSql database
3. Express & NodeJS for the backend
4. MUI for styling
5. React Redux for managing states
6. Bcrypt for the encryption of passwords
7. Dropzone for uploading images.

<br>

# Diagrams  
<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/798ddca3-ec6f-4452-be9c-1399ff0420a8" alt="image" width="600px">
</div>


<div align="center">
    <i> UML Diagram </i>
</div>

<br>
<br>

<div align="center">
    <img src="https://github.com/inginerie-software-2023-2024/proiect-inginerie-software-fixit/assets/101595151/9d74d936-1ffc-4748-afa5-170a76889b9d" alt="image" width="600px">
</div>


<div align="center">
    <i> Use Case Diagram </i>
</div>

<br>

<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/93272424/a3f81a1c-1d0b-40a8-a17c-a0e87ea8a8a6" alt="image" width="600px">
</div>
<div align="center">
    <i> WorkFlow Diagram </i>
</div>


<br>


<br>

# Roadmap
<div align="center">
    <img src="https://github.com/maraneagu/FixIT-IS/assets/93272424/33073f6a-b95b-4e81-9a3c-3ca8177dc19d)" alt="image" width="500px">
</div>

<br>


# Product Features & Functionalities

## Homepage 

<br>

The homepage contains widgets with the user's profile, the people they are following, the feed posts, the search bar, and the category selection bar for filtering.
<br>

<div align="center">
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/13853e89-f7a0-4529-95f7-bf73750ae976" alt="image" width="1000px">
</div>

<br/>


## LoginPage & RegisterPage
<br>
On the login page, you can log in using an email and a password.

<br>
<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101599503/93496a6f-c9df-416d-ad32-4c2eaddde6e4" alt="loginPage">
</div>



<br>
<br>

On the register page, you can create an account and set your name, location, profile picture, role (master or client), email, and a password.

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101599503/68d26d9d-5892-4a5b-b90d-26f7f171b666" alt="registerPage">
</div>

## ProfilePage

<br>

<b><i>Master Profile</i></b>
<br>


<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101599503/35a4d72f-3312-44b2-be32-27e2025c2ab8" alt="masterProfilePage">
</div>

<br>

On the profile page, if you are a master, you can see the posts you added, the tips you recommended and the people you are following.


<br>


<b><i>Client Profile</i></b>
<br>

![image](https://github.com/maraneagu/FixIT-MERN/assets/101599503/e56739c1-16c2-4cbb-b4d6-030404721925)


If you are a client, you can only see the people you are currently following.


## CreatePost
<br>

When creating a post, you are sent to a specific form, in which you need to fill in the title, description, the category and the picture representing the post. Here is the form:

 <br>

![2023-06-15 (4)](https://github.com/maraneagu/FixIT-MERN/assets/93272424/590f66fd-e444-45a8-b9c3-b4e51148d67d)

<br>

After you have created the post, you are sent to the specific post page, where you are able to see the full description of the post and the reviews of the post. 


## ShowPost

<br>
A post contains information about the user who made it, with the option to follow or unfollow them, a title, a description, and an image. Users can like the post, add a review, or be redirected to a separate "Show Post" page. If the logged-in user is the one who made the post, he can delete or edit it.

<br>
<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/4cf778b5-db26-4062-b47f-72a68f705dab" alt="image" width="1000px">
</div>

## EditPost

<br>

On this page, you can edit a post by changing its attributes, including the image.

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/0f01d000-36b4-495b-bbaa-be1eac8741b5" alt="image" width="1000px">
</div>


## TipsPage

<br>
Adding a tip is possible only if you have a master account. You can also add Youtube videos.
<br>
<br>



![WhatsApp Image 2023-06-15 at 1 02 41 PM](https://github.com/maraneagu/FixIT-MERN/assets/101599503/5902ed6f-c918-4b18-9df5-d2de9d4ec050)

<br>

The "Create a tip" form uses a title, description, category and a Youtube link to create a tip.

<br>

![WhatsApp Image 2023-06-15 at 1 02 43 PM](https://github.com/maraneagu/FixIT-MERN/assets/101599503/4e982c83-f55f-4caa-83e5-61adf4441ab4)

## FixIT Assistant

<br>

On the Tips Page, there is a FixIT Assistant, an AI-generated assistant that is able to answer simple questions about house maintanance and other various topics.
<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-IS/assets/93272424/a21d8ada-fa5c-4a1a-a656-655209175fa2" alt="image" width="1000px">
</div>

<br>

## Reviews

<br>

In the ShowPost, you can view the reviews of the specific post. These reviews have a star rating, a description, and a user associated to them. They can be created and deleted through pop-up windows.

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/82075945-d267-4021-b7ec-0d308630a525" alt="image" width="1000px">
</div>

<br>
Create a review pop-up:
<br>

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-MERN/assets/101595151/baa6859a-63d5-436d-9101-bdd51b3aded6" alt="image" width="1000px">
</div>


<br>

## Appointments

<br>

In the ShowPost, you can add an appointment to a specific post. It can be created and deleted through pop-up windows.

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-IS/assets/93272424/323ea70d-ebc0-40e4-bf68-33911c3f9761" alt="image" width="1000px">
</div>

<br>

Afterwards, as a master you are able to view all of your appointments: accepted, pending and refused.

<br>

<div>
    <img src="https://github.com/maraneagu/FixIT-IS/assets/93272424/a5344f3b-e07f-4f8b-9be7-5ec2e34a820b" alt="image" width="1000px">
</div>

<br>

# Non-Functional Requirements

- Appointments between a master and a client;
- Recommandations for different masters based on your friend list;
- ChatGPT integration to transform different messages in a specific way: more serious, more formal, more informal etc.
- Product Tour


