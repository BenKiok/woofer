const functions = (() => {
    const writeWoof = (obj) => {
        let woofId;

        if (typeof obj === "object" && obj) {
            obj.time = (new Date).getTime();
            woofId = firebase.database().ref("/Woofs/").push(obj).key;
            obj.id = woofId;
            firebase.database().ref("/Woofs/" + woofId).update(obj);

            return true;
        }

        return false;
    }

    const readWoofs = (db, cb) => {
        db.ref("/Woofs/").once("value", 
            (promise) => {
                cb(promise.val());
            });
    }

    const setNextWoof = (obj1, obj2) => {
        if (obj1 && (obj1.nextWoof || obj1.nextWoof === null)) {
            if (obj2 && obj2.id) {
                obj1.nextWoof = obj2.id;

                firebase.database().ref("/Woofs/" + obj1.id).update(obj1);

                return true;
            }
        } else {
            return false;
        }
    }

    return { writeWoof, readWoofs, setNextWoof };
})();

export default functions;