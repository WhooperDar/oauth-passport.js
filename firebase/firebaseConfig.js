const { response } = require('express');
const admin = require('firebase-admin'); 
const credentials = require('./firebaseKeyAdmin.json'); 

const ConnectDB = () => {
    if(admin.apps.length === 0){
        admin.initializeApp({
            credential: admin.credential.cert(credentials)
        }); 
    }
    
    const db = admin.firestore(); 

    console.log("connect to db"); 

    return db; 
}

const saveUserDataProfile = async (profile) => {
    const dbConnect = ConnectDB(); 

    if(profile !== null){
        const userProfileData = { 
            id: profile.id, 
            firstName: profile.name.givenName,
            familyName: profile.name.familyName,
        }

        const response = await dbConnect.collection('oauth-data').doc(profile.id).set(userProfileData); 
        console.log('firebase database save!');
    }

    if (response !== null) return; 
}

const fetchAllData = async () => {
    const dbConnect = ConnectDB(); 
    let userDetails = []; 
    let getUserData  = {}; 

    try { 
        const loginRef = dbConnect.collection('oauth-data'); 
        const response = await loginRef.get(); 

        response.forEach(doc => {
            userDetails.push(doc.data()); 
        })

        getUserData = {
            firstName: userDetails[0].firstName, 
            lastName: userDetails[0].familyName,
            id: userDetails[0].id
        }

        console.log(getUserData);
        return getUserData; 

    }
    catch(e) {
        console.log(e, "error data fetched!"); 
    }

    if(getUserData === null) return

}

module.exports = { 
    saveUserDataProfile, 
    fetchAllData, 
}