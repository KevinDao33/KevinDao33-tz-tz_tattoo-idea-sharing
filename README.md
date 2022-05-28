# tz tz 刺刺

__A tattoo-sharing platform that inspires people with tattoo ideas and matches them with the right artists__

<!-- ![tztz intro video](https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/other%2Ftztz-README.gif?alt=media&token=95c01556-46b0-4c2a-abcc-58fb4c71169f) -->

## About The Project
Because getting a tattoo should be a great experience. tztz provides various tattoo ideas and categorizes them with placements, styles, and topics, allowing users to save tattoo pins into the collections they've created. Moreover, users could start their own tattoo plans by specifying the placement, size, color, budget, and most importantly, selecting a tattoo pin they’ve saved as a reference. After a tattoo plan has been created, it shows up on the tattoo plan wall, and artists could check if any of the plans fit their professions and recommend themselves; on the other hand, users could check all the self-recommended artists on each of the tattoo plans they’ve created.

## Link
tz tz : https://tz-tz-fa8a7.web.app/


## Tech
 * Built with create-react-app, applied react-router-dom for SPA, styled with styled-components, and managed login and data with Firebase (Firestore, Storage, Authentication).

 * Implemented lazy loading with Intersection Observer API, and arranged tattoo pins display with react-masonry-css.

 * Applied react-beautiful-dnd and a self-designed calculating function to allow users to arrange images they’ve saved by dragging them to other positions.

 * Compressed uploaded image with browser-image-compression to improve render efficiency and reduce usage cost of Firebase Storage.

 * Managed frequently used data with useContext.


## Flow Chart
***
![Flow Chart](https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/other%2Ftztz-Flowchart.jpg?alt=media&token=9e208dc7-d6dc-43b1-a3ca-3ebef51756bf)

<!-- ## Demo
Various types of tattoo pins are displayed in waterfall flow; users could filter pins through placements, styles, and topics.
![Homepage-Demo](https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/other%2FHomapega-Demo-GIF.gif?alt=media&token=c66bcff0-a22c-4f91-b1f5-a8cdf05bed91)

Users could delete a pin and arrange orders of the pins inside a collection.
![Collection-Demo](https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/other%2FCollection-Demo-GIF.gif?alt=media&token=8b897a5c-ada0-4a0b-b6de-dd3c5131efe2)

By selecting details for the next tattoo, users could create a tattoo plan.
![StartPlan-Demo](https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/other%2FStartPlan-Demo-GIF.gif?alt=media&token=dc16d9a4-f994-4113-b896-ccbf3d9985df)

Artists could click on tattoo plans to view more details.
![Plan-Demo](https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/other%2FTattooPlan-Demo-GIF.gif?alt=media&token=3d8d039a-98c1-40d2-bb3e-80cba9c81af2) -->


## Future Features
 * Add introdction section, site link, studio map on artists personal page.

 * Allow user to share pins and artist's personal page link.

 * Allow users to report irrelevant or inappropriate pins.


## Contact
 * Name: Kevin P.H. Chiou
 * E-mail: kevinph.chiou@gmail.com
 * LinkedIn: https://www.linkedin.com/in/kevin-chiou-435a93141/