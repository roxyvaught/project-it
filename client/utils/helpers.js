export function pluralize(name, count) {
    if (count === 1) {
        return name
    }
    return name + 's'
}

export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        // open connection to the database `projectit` with the version of 1
        const request = window.indexedDB.open('projectit', 1);

        // create variables to hold reference to the database, transaction (x), and object store
        let db, tx, store;

        // if the version has changed (or if this is the first time using the database), run this method and create the three object stores
        request.onupgradeneeded = function (e) {
            const db = request.result;
            
            // create object store for each type of data and set the `primary` key indicator
            db.createObjectStore('comments', { keyPath: '_id' });
            db.createObjectStore('projects', { keyPath: '_id' });
            db.createObjectStore('tasks', { keyPath: '_id' });
            db.createObjectStore('users', { keyPath: '_id'});
        };

        // handle any errors with connecting
        request.onerror = function(e) {
            console.log('there was an error');
        };

        // on database open success
        request.onsuccess = function(e) {
            // save a reference of the database to the 'db' variable
            db = request.result;
            
            // open a transaction to do whatever we pass into `storeName`
            tx = db.transaction(storeName, 'readwrite');

            // save reference to that object store
            store = tx.objectStore(storeName);

            // if there's any errors, let us know about them
            db.onerror = function(e) {
                console.log('error', e);
            };

            switch (method) {
                case 'put':
                    store.put(object);
                    resolve(object);
                    break;
                case 'get':
                    const all = store.getAll();
                    all.onsuccess = function() {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    store.delete(object._id);
                    break;
                case 'default':
                    console.log('no valid method');
                    break;
            }

            // when the transaction is complete, close the connection
            tx.oncomplete = function() {
                db.close();
            };
        };
    });
}