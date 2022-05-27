# tz tz 刺刺

__A tattoo-sharing platform that inspires people with tattoo ideas and matches them with the right artists__

![tztz intro video](https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/other%2Ftztz-README.gif?alt=media&token=95c01556-46b0-4c2a-abcc-58fb4c71169f)

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


## Future Features

 * Add introdction section, site link, studio map on artists personal page.

 * Allow user to share pins and artist's personal page link.

 * Allow users to report irrelevant or inappropriate pins.


## Contact
 * Name: Kevin P.H. Chiou
  
 * E-mail: kevinph.chiou@gmail.com
 
 * LinkedIn: https://www.linkedin.com/in/kevin-chiou-435a93141/