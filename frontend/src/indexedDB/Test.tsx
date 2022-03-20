import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function FriendList({ currentDocId }) {
    console.log(currentDocId, 'currentDocId idd');

    const friends = useLiveQuery(
        async () => {
            const friends = await db.items
                .where({ docId: currentDocId })
                .toArray();

            return friends;
        }
        , [currentDocId]);
    console.log(friends);

    return <ul>
        {friends?.map(friend => <li key={friend.id}>
            {friend.name} - {friend.email}
        </li>)}
    </ul>;
}

export const Test = () => {
    const [tempData, setTempData] = useState([]);
    const [loadedDate, setLoadedData] = useState([]);
    const [tableName, setTableName] = useState("default");
    const [currentDocId, setCurrentDoc] = useState('');


    const itemsTest = useLiveQuery(
        async () => {
            //
            // Query Dexie's API
            //
            const items1 = await db.items.where({ docId: currentDocId }).toArray()

            // Return result
            return items1;
        },
        // specify vars that affect query:
        [currentDocId]
    );

    const hasAnyDocs = useLiveQuery(async () => {
        const listCount = await db.docs.count();
        return listCount > 0;
    });

    const docs = useLiveQuery(() => db.docs.toArray());



    const getJson = async () => {
        let res = await fetch("https://jsonplaceholder.typicode.com/users");
        let users = await res.json();
        setTempData(users);
        console.log("loaded", users);
    };





    const saveToDb = async () => {
        let id
        if (!currentDocId) {
            id = uuidv4()
            await db.docs.add({ id, name: tableName });
        } else {
            id = currentDocId
            db.items.where({ docId: currentDocId }).delete()
        }

        tempData.forEach((user: any) => {
            try {
                db.items.add({
                    ...user,
                    id: uuidv4(),
                    docId: id,
                });
            } catch (error) {
                console.log(error, "error");
            }
        });
    };



    return (
        <div>

            <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
            />
            <br /> <button onClick={getJson}>get json</button>
            <button onClick={saveToDb}>save to indexedDB</button>
            <div>
                <label htmlFor="c">current doc</label>
                <input type="text" readOnly value={currentDocId} />
            </div>
            <br />
            {hasAnyDocs ? (
                <>
                    <select
                        value={currentDocId}
                        onChange={(e) => {
                            setCurrentDoc(e.target.value);
                        }}
                    >   <option value="">none</option>
                        {docs?.map(({ id, name }) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>

                    {itemsTest && <FriendList currentDocId={currentDocId} />}
                </>
            ) : (
                "no docs yet"
            )
            }
        </div >
    );
};
