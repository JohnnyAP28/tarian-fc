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

window.TarianCMS = {
  async load() {
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
