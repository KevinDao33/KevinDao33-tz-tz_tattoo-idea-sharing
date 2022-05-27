import {getAuth, onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const api = {
  checkLoginStatus(callback1, callback2) {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("status : not login");
        callback1("");
        callback2(false);
      }
      console.log("status : login", user.uid);
      callback1(user.uid);
      callback2(true);
    });
  },

  getUserData: async (uid, callback) => {
    if (!uid) {
      return;
    }

    const userquery = await getDoc(doc(db, "user", uid));
    const userData = userquery.data();
    callback(userData);
  },

  getPinsInCollection: async (callback, id, lastSegment) => {
    const querySnapshot = await getDoc(
      doc(db, "user", id, "collection", lastSegment)
    );
    const pinsInCollec = querySnapshot.data();
    callback(pinsInCollec.pins);
  },

  getAllPinsDataInCollection: async (callback, id, lastSegment) => {
    const querySnapshot = await getDoc(
      doc(db, "user", id, "collection", lastSegment)
    );
    const pinsInCollec = querySnapshot.data();
    callback(pinsInCollec);
  },

  getPinImageUrl: (storage, name, callback) => {
    getDownloadURL(ref(storage, `pinImages/${name}`)).then((url) => {
      callback(url);
    });
  },

  updateProfileImageUrl: async (storage, name, uid) => {
    getDownloadURL(ref(storage, `profileImages/${name}`)).then((url) => {
      const userRef = doc(db, "user", uid);
      updateDoc(userRef, {
        pic: url,
      });
    });
  },

  updateUserData: async (uid, newName, newLink, newDescription) => {
    const userRef = doc(db, "user", uid);
    updateDoc(userRef, {
      name: newName,
      link: newLink,
      desc: newDescription,
    });
  },

  removePin: async (uid, collecName, pin) => {
    const collectionRef = doc(db, "user", uid, "collection", collecName);
    await updateDoc(collectionRef, {
      pins: arrayRemove({
        pinName: pin.pinName,
        pinId: pin.pinId,
        pinImage: pin.pinImage,
      }),
    });
  },

  updateRearrangedPin: async (uid, collectionName, filteredCombinedColumn) => {
    const collectionRef = doc(db, "user", uid, "collection", collectionName);
    await updateDoc(collectionRef, {
      pins: filteredCombinedColumn,
    });
  },

  sendNotification: async (user, uid, userData, newPinId) => {
    const docRef = collection(db, "user", user, "notification");
    const notificationDocRef = await addDoc(docRef, {
      isRead: false,
      authorUid: uid,
      authorName: userData.name,
      authorPic: userData.pic,
      timeStamp: serverTimestamp(),
      pinId: newPinId,
    });
    updateDoc(doc(db, "user", user, "notification", notificationDocRef.id), {
      notificationId: notificationDocRef.id,
    });
  },

  setNewPinData: async (uid, newPinData) => {
    const collectionRefPin = collection(db, "pin");
    const docRefCollectionRefPin = doc(collectionRefPin);

    const collectionRefUser = doc(
      db,
      "user",
      uid,
      "pin",
      docRefCollectionRefPin.id
    );

    console.log('id', docRefCollectionRefPin.id);
    

    setDoc(collectionRefUser, {
      pinAutor: {uid: uid},
      pinId: docRefCollectionRefPin.id,
      pinDesc: newPinData.pinDesc,
      pinName: newPinData.pinName,
      pinImage: newPinData.pinImage,
      pinLink: newPinData.pinLink,
      pinTags: newPinData.pinTags,
      pinPlacement: newPinData.pinPlacement,
      pinType: newPinData.pinType,
    });

    setDoc(docRefCollectionRefPin, {
      pinAutor: {uid: uid},
      pinId: docRefCollectionRefPin.id,
      pinDesc: newPinData.pinDesc,
      pinName: newPinData.pinName,
      pinImage: newPinData.pinImage,
      pinLink: newPinData.pinLink,
      pinTags: newPinData.pinTags,
      pinPlacement: newPinData.pinPlacement,
      pinType: newPinData.pinType,
    });
    return docRefCollectionRefPin.id;
  },

  getPins4Homepage: async (callback) => {
    const notesSnapshot = await getDocs(collection(db, "pin"));
    const pins = notesSnapshot.docs.map((doc) => doc.data());
    callback(pins);
  },

  createNewUser: async (userId, newUserData) => {
    const docRef = doc(db, "user", userId);

    await setDoc(docRef, {
      email: newUserData.email,
      password: newUserData.password,
      name: newUserData.name,
      link: newUserData.link,
      role: newUserData.role,
      uid: userId,
      follower: [],
      following: [],
      pic: "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/profileImages%2Fgarlic8bit?alt=media&token=81a03b93-25a5-4926-82c7-08a034d473cb",
      desc: "",
    });
  },

  listen2NewNotification: async (uid, callback) => {
    const allNotificationDataRef = query(
      collection(db, "user", uid, "notification"),
      orderBy("timeStamp")
    );

    onSnapshot(allNotificationDataRef, (querySnapshot) => {
      let allNotifications = [];
      querySnapshot.forEach((doc) => {
        allNotifications.push(doc.data());
      });

      callback(allNotifications.reverse());
    });
  },

  readNotification: async (uid, notiId) => {
    const allNotificationDataRef = doc(db, "user", uid, "notification", notiId);
    await updateDoc(allNotificationDataRef, {
      isRead: true,
    });
  },

  gitUserPins: async (uid, callback) => {
    if (!uid) {
      return;
    }

    const userPinRef = collection(db, "user", uid, "pin");

    const userPinData = await getDocs(userPinRef);
    let userAllPins = [];
    userPinData.forEach((doc) => {
      userAllPins.push({...doc.data()});
    });

    callback(userAllPins);
  },

  handleMyNewFollowing: async (uid, otherUserUid) => {
    const myFollowingRef = doc(db, "user", uid);
    await updateDoc(myFollowingRef, {
      following: arrayUnion(otherUserUid),
    });
  },

  handleOtherUserNewFollower: async (uid, otherUserUid) => {
    const otherUserFollowerRef = doc(db, "user", otherUserUid);
    await updateDoc(otherUserFollowerRef, {
      follower: arrayUnion(uid),
    });
  },

  removeFromMyFollowing: async (uid, otherUserUid) => {
    const myFollowingRef = doc(db, "user", uid);
    await updateDoc(myFollowingRef, {
      following: arrayRemove(otherUserUid),
    });
  },

  removeFromOtherUserFollower: async (uid, otherUserUid) => {
    const otherUserFollowerRef = doc(db, "user", otherUserUid);
    await updateDoc(otherUserFollowerRef, {
      follower: arrayRemove(uid),
    });
  },

  gitPinData: async (pinId, callback) => {
    if (!pinId) {
      return;
    }
    const pinRef = await getDoc(doc(db, "pin", pinId));
    const pinData = pinRef.data();
    callback(pinData);

    return;
  },

  getPinCommentator: async (pinCommentData, callback) => {
    if (pinCommentData.length < 0) {
      return;
    }

    let commentatorData = [];
    for (let i = 0; i < pinCommentData.length; i++) {
      let pinCommentator = await getDoc(
        doc(db, "user", pinCommentData[i].commentator)
      );
      commentatorData.push(pinCommentator.data());
    }
    callback(commentatorData);
  },

  getUserCollection: async (uid, callback) => {
    if (!uid) {
      return;
    }
    const collectionRef = await getDocs(
      collection(db, "user", uid, "collection")
    );

    let myCollections = [];
    collectionRef.forEach((doc) => {
      myCollections.push({...doc.data()});
    });

    callback(myCollections);

    return;
  },

  getRelatedPins: async (pinData, callback) => {
    if (!pinData) {
      return;
    }

    const pinsRef = collection(db, "pin");
    const queriedPins = query(
      pinsRef,
      where("pinTags", "array-contains-any", pinData.pinTags)
    );
    const querySnapshot = await getDocs(queriedPins);
    let localSimiliarPins = [];
    querySnapshot.forEach((doc) => {
      pinData.pinName !== doc.data().pinName &&
        localSimiliarPins.push(doc.data());
    });
    callback(localSimiliarPins);
  },

  sendNewCommentMessage: async (uid, pinId, newComment) => {
    await addDoc(collection(db, "pin", pinId, "comment"), {
      commentator: uid,
      commentTime: serverTimestamp(),
      commentMessage: newComment,
    });
  },

  addPin2Collection: (uid, selectedCollection, pinData) => {
    const collectionRef = doc(
      db,
      "user",
      uid,
      "collection",
      selectedCollection
    );
    updateDoc(
      collectionRef,
      {
        pins: arrayUnion({
          pinName: pinData.pinName,
          pinId: pinData.pinId,
          pinImage: pinData.pinImage,
        }),
      },
      {merge: true}
    );
  },

  addPin2NewCollection: (uid, pin, newCollectionName) => {
    const newCollectionRef = doc(
      db,
      "user",
      uid,
      "collection",
      newCollectionName
    );
    setDoc(
      newCollectionRef,
      {
        collectionName: newCollectionName,
        pins: [
          {
            pinId: pin.pinId,
            pinImage: pin.pinImage,
            pinName: pin.pinName,
          },
        ],
      },
      {merge: true}
    );
  },

  getPinCommentData: async (pinId, callback) => {
    const allCommentsDataRef = query(
      collection(db, "pin", pinId, "comment"),
      orderBy("commentTime")
    );

    onSnapshot(allCommentsDataRef, (querySnapshot) => {
      let allComments = [];
      querySnapshot.forEach((doc) => {
        allComments.push(doc.data());
      });
      callback(allComments);
    });
  },

  getUserPlan: async (uid, callback) => {
    if (!uid) {
      return;
    }

    const querySnapshot = await getDocs(collection(db, "user", uid, "plan"));
    let myPlans = [];
    querySnapshot.forEach((doc) => {
      myPlans.push({...doc.data()});
    });
    callback(myPlans);
  },

  getMyFollow: (clonedFollowing, callback) => {
    let result = [];
    clonedFollowing.map(async (user) => {
      const docRef = doc(db, "user", user);

      const docSnap = await getDoc(docRef);
      result.push(docSnap.data());
    });

    callback(result);
  },

  getArtistData: async (plans, callback) => {
    let allArtist = [];

    plans.map((plan) => {
      const clonedArtist = [...plan.artists];

      let result = [];
      clonedArtist.map(async (artist) => {
        const docRef = doc(db, "user", artist);
        const docSnap = await getDoc(docRef);
        result.push(docSnap.data());
      });
      allArtist.push(result);
    });

    callback(allArtist);
  },

  createNewCollection: async (uid, newCollectionName) => {
    const newCollectionRef = doc(
      db,
      "user",
      uid,
      "collection",
      newCollectionName
    );
    await setDoc(
      newCollectionRef,
      {
        collectionName: newCollectionName,
        pins: [],
      },
      {merge: true}
    );
  },

  getPinsInAllCollections: async (uid, callback) => {
    const querySnapshot = await getDocs(
      collection(db, `user/${uid}`, "collection")
    );

    let myCollections = [];
    querySnapshot.forEach((doc) => {
      myCollections.push(...doc.data().pins);
    });

    callback(myCollections);

    return;
  },

  startNewPlan: async (uid, arrangedNewPlanData) => {
    const allNewPlanRef = collection(db, "plan");
    const newPlanRef = doc(allNewPlanRef);
    const userNewPlanRef = doc(db, "user", uid, "plan", newPlanRef.id);

    await setDoc(newPlanRef, {
      artists: [],
      reference: arrangedNewPlanData.reference,
      date: arrangedNewPlanData.date,
      budget: arrangedNewPlanData.budget,
      description: arrangedNewPlanData.description,
      isColor: arrangedNewPlanData.isColor,
      size: arrangedNewPlanData.size,
      placement: arrangedNewPlanData.placement,
      city: arrangedNewPlanData.city,
      planOwner: arrangedNewPlanData.planOwner,
      planId: newPlanRef.id,
    });

    await setDoc(userNewPlanRef, {
      artists: [],
      reference: arrangedNewPlanData.reference,
      date: arrangedNewPlanData.date,
      budget: arrangedNewPlanData.budget,
      description: arrangedNewPlanData.description,
      isColor: arrangedNewPlanData.isColor,
      size: arrangedNewPlanData.size,
      placement: arrangedNewPlanData.placement,
      city: arrangedNewPlanData.city,
      planOwner: arrangedNewPlanData.planOwner,
      planId: newPlanRef.id,
    });
  },

  getPlans: async (callback) => {
    try {
      const notesSnapshot = await getDocs(collection(db, "plan"));
      const plans = notesSnapshot.docs.map((doc) => doc.data());

      callback(plans);
    } catch (error) {
      console.error(error);
    }
  },

  signUp4TattooPlan: async (uid, plan) => {
    const allPlanRef = doc(db, "plan", plan.planId);
    const ownerPlanRef = doc(
      db,
      "user",
      plan.planOwner.ownerId,
      "plan",
      plan.planId
    );
    await updateDoc(allPlanRef, {
      artists: arrayUnion(uid),
    });
    await updateDoc(ownerPlanRef, {
      artists: arrayUnion(uid),
    });
  },
};

export default api;
