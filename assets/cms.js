const firebaseConfig = {
  apiKey: "AIzaSyAf0CIHBZ-wEQJ8CCUUWo1Wl9P7typ_ZPI",
  authDomain: "gptcall-416910.firebaseapp.com",
  projectId: "gptcall-416910",
  storageBucket: "gptcall-416910.appspot.com",
  messagingSenderId: "99275526699",
  appId: "1:99275526699:web:3b623e1e2996108b52106e"
};

const cmsState = {
  firebase: null,
  loading: null
};

async function loadFirebase() {
  if (cmsState.firebase) {
    return cmsState.firebase;
  }
  if (!cmsState.loading) {
    cmsState.loading = Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
    ]).then(([appModule, authModule, firestoreModule]) => {
      const app = appModule.initializeApp(firebaseConfig);
      const auth = authModule.getAuth(app);
      const db = firestoreModule.getFirestore(app);
      cmsState.firebase = { app, auth, db, authModule, firestoreModule };
      return cmsState.firebase;
    });
  }
  return cmsState.loading;
}

function contentRef(firestoreModule, db) {
  return firestoreModule.doc(db, "tarianSites", "tarian-fc");
}

function contentRestUrl() {
  return `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/tarianSites/tarian-fc?key=${firebaseConfig.apiKey}`;
}

function decodeFirestoreValue(value) {
  if (!value || typeof value !== "object") {
    return null;
  }
  if (value.stringValue !== undefined) {
    return value.stringValue;
  }
  if (value.integerValue !== undefined) {
    return Number(value.integerValue);
  }
  if (value.doubleValue !== undefined) {
    return Number(value.doubleValue);
  }
  if (value.booleanValue !== undefined) {
    return Boolean(value.booleanValue);
  }
  if (value.nullValue !== undefined) {
    return null;
  }
  if (value.timestampValue !== undefined) {
    return value.timestampValue;
  }
  if (value.arrayValue !== undefined) {
    return (value.arrayValue.values || []).map(decodeFirestoreValue);
  }
  if (value.mapValue !== undefined) {
    return decodeFirestoreFields(value.mapValue.fields || {});
  }
  return null;
}

function decodeFirestoreFields(fields) {
  return Object.fromEntries(Object.entries(fields || {}).map(([key, value]) => [key, decodeFirestoreValue(value)]));
}

async function loadContentViaRest() {
  const response = await fetch(contentRestUrl(), { headers: { Accept: "application/json" } });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Firestore REST ${response.status}`);
  }
  const documentData = await response.json();
  return documentData.fields?.content ? decodeFirestoreValue(documentData.fields.content) : null;
}

window.TarianCMS = {
  async load() {
    try {
      return await loadContentViaRest();
    } catch (restError) {
      console.warn("Tarian CMS REST load skipped:", restError.message);
    }

    try {
      const { db, firestoreModule } = await loadFirebase();
      const snapshot = await firestoreModule.getDoc(contentRef(firestoreModule, db));
      return snapshot.exists() ? snapshot.data().content || null : null;
    } catch (error) {
      console.warn("Tarian CMS load skipped:", error.message);
      return null;
    }
  },

  async save(content) {
    const { db, firestoreModule } = await loadFirebase();
    await firestoreModule.setDoc(
      contentRef(firestoreModule, db),
      {
        content,
        updatedAt: firestoreModule.serverTimestamp()
      },
      { merge: true }
    );
  },

  async signIn(email, password) {
    const { auth, authModule } = await loadFirebase();
    return authModule.signInWithEmailAndPassword(auth, email, password);
  },

  async signUp(email, password) {
    const { auth, authModule } = await loadFirebase();
    return authModule.createUserWithEmailAndPassword(auth, email, password);
  },

  async signOut() {
    const { auth, authModule } = await loadFirebase();
    return authModule.signOut(auth);
  },

  async onAuth(callback) {
    const { auth, authModule } = await loadFirebase();
    return authModule.onAuthStateChanged(auth, callback);
  }
};
