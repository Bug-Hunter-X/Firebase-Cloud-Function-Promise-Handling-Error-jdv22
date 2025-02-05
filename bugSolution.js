The following corrected code demonstrates proper promise handling in a Firebase Cloud Function.

```javascript
exports.myFunction = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  const userRef = db.collection('users').doc(userId);

  try {
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
      return { message: 'User not found' }; //Returning an object in case of failure
    }
    const userData = userSnapshot.data();
    // Perform some operation here...
    return {
      message: 'Success',
      userData: userData,
    };
  } catch (error) {
    console.error('Error:', error);
    return { message: 'An error occurred' };
  }
});
```

This revised code uses a `try...catch` block to handle potential errors during the asynchronous operations. It always returns a value, ensuring the function completes successfully even in case of errors.  The return value in both success and failure cases is a simple object which helps standardize the response structure.