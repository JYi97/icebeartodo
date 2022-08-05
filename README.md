# Ice Bear's To-Do's

Ice Bear's To-Do's allows users to create folders with unique titles and they can view each folder. Within each folder details page, users are also able to create unique activities with an optional context and required date. All activities will be created with the property of not being completed. Within each activity details
page, users can click on the bear icon that will change the completed property of each activity to either false or true depending on the initial state. On the home page, users can only see the activities that have the same date as the current day and it is not completed. Users will be able to see incompleted activities in the upcoming page if the activities' dates takes place in the future. Similarly, for the history page, users will only be able to see completed activities that took place in the past.

## Link to Live Site
Live Link: https://icebeartodo.herokuapp.com/home

## Technologies Used:
### Front End
![react](https://user-images.githubusercontent.com/90019010/179418431-3768ece7-d988-43f1-a22b-4707848ac9d2.svg)
![redux](https://user-images.githubusercontent.com/90019010/179418433-e3ae4f1d-a1dc-4772-84b7-56db8132d01e.svg)
![javascript](https://user-images.githubusercontent.com/90019010/179418437-d00f3585-d6a9-4531-af2f-e5cb321e2780.svg)
![html](https://user-images.githubusercontent.com/90019010/179418445-20d38d75-eae7-4bbf-bed0-5c26ec4aa977.svg)
![css](https://user-images.githubusercontent.com/90019010/179418447-fd17f92e-83e6-4e60-b4d6-602b8300bdc9.svg)
![heroku](https://user-images.githubusercontent.com/90019010/179418448-91d1d47f-1184-440a-bcd0-03f36192f775.svg)

### Back End
![python](https://user-images.githubusercontent.com/90019010/179418459-28523cdb-5d46-4473-a744-efcf2bb47c8d.svg)
![flask](https://user-images.githubusercontent.com/90019010/179418464-dac29f71-39ae-425b-bbc7-86e6dd29098b.svg)
![postgres](https://user-images.githubusercontent.com/90019010/179418482-fca795c5-b035-43e6-91cb-c136d0c9f6fb.svg)
![docker](https://user-images.githubusercontent.com/90019010/180459609-e8cd6ead-1cd3-4c23-a50c-d44f672212fb.svg)

## Screenshots

Splash Page
![icebearsplash](https://user-images.githubusercontent.com/96046451/182528038-e9a3650c-c40d-465e-ad32-04c92f40f9ee.PNG)

Log in Page
![icebearlogin](https://user-images.githubusercontent.com/96046451/182528076-26a3e4e2-616f-45a8-938d-8c50f13adffb.PNG)

Sign in Page
![icebearsignup](https://user-images.githubusercontent.com/96046451/182528089-d91739d1-9fb5-476c-aa78-76d2bd2211fb.PNG)

Home Page
![icebearnewhome](https://user-images.githubusercontent.com/96046451/183038035-f42d8bf8-82d9-4d20-b03b-887b426e7b09.PNG)

## Features List
https://github.com/JYi97/iceBeartodo/wiki/Features-List

## Database Schema
https://github.com/JYi97/icebeartodo/wiki/Database-Schema

## Front-End Routes Document
https://github.com/JYi97/iceBeartodo/wiki/FrontEnd-Routes

## Technical Implementation Details
One challenging aspect of this project was creating the conditionals for the edit form to update an activity. Whenever I wanted to only change the context of the the activity and not the title, it was hard to maintain the condition that each activity name must be unique. So I created a new activitiesObject that assigns each activity title as a key with the value of the activityId. Therefore, by creating a conditional that checks if the submitted activity title exists as a key in the object and if the activity ID value of the activity title key matches the activityId from the url of activity details page. Another implementation that I had to stop and think about was the search bar implementation. I wanted the users to be able to search for both folders and activities. I realized that I had to create two separate paths depending on if the selected search result was an activity or a folder. I also had to fetch the id of the activity or the folder so that the selected result will lead to the correct, corresponding activity/folder.

Edit Activity Conditional
![icebeareditactivityvalidator](https://user-images.githubusercontent.com/96046451/182531843-65eaee84-89b3-437c-b6df-f4cb2d7c85f0.PNG)

Two separate NavLinks paths depending on if result is an activity or a folder
![icebearsearchresults](https://user-images.githubusercontent.com/96046451/182533832-fd1a38f6-8c9a-4e8c-b17d-c2c855792e93.PNG)

## Folder
A signed-in user will have access to all their folders that they have created. They will be able to create new folders, update their current folders, and delete them as well. Each folder must have a unique name, meaning that there cannot be two folders that share the same name. The folder title cannot exceed more than 50 characters otherwise, they will be asked to enter a shorter title. If a user goes on a folder page that does not belong to them, they will be shown a folders not-found page.

## Activity
A signed-in user will have access to all their activities that they have created. They will be able to create new activities, update their current activities, and delete them as well. Each activity must have a unique name in each folder so an activity in one folder can have the same name as another activity that belongs to another folder. The activity title cannot exceed more than 50 characters otherwise, they will be asked to enter a shorter title. The activity context is optional but has a character limit of 255 but the activity date is required and can only be selected with the calendar input. Users will be able to go on an activity details page and complete the activity to change the status of the activity from incompleted to completed.

## Folder/Activity Search
A signed-in user will be able to search for their folders and activities. They will be able to click on a result and be taken to their respective details page. It will fetch all the activities and folders belonging to that user so that whenever the user searches something, the results are instant, creating a smoother user-interface. 

## Future Features
- Implement redirect or button to redirect back to home while on wrong page or 404 page
- Google Maps API for the location of the activity
- Separate the search results into folders and activities with labels


