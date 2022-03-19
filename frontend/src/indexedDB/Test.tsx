import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function FriendList({ currentDoc }) {
    const friends = useLiveQuery(
        async () => { 
            const friends = await db.items
                .where({ docId: currentDoc })
                .toArray();

             return friends;
        },
         [currentDoc]
    );

    return <ul>
        {friends?.map(friend => <li key={friend.id}>
            {friend.name}
        </li>)}
    </ul>;
}

export const Test = () => {
    const [tempData, setTempData] = useState([]);
    const [loadedDate, setLoadedData] = useState([]);
    const [tableName, setTableName] = useState("default");
    const [currentDoc, setCurrentDoc] = useState('');


    const itemsTest = useLiveQuery(
        async () => {
            //
            // Query Dexie's API
            //
            const items1 = await db.items.where({ docId: currentDoc }).toArray()

            // Return result
            return items1;
        },
        // specify vars that affect query:
        [currentDoc]
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
        await db.docs.add({ name: tableName });

        tempData.forEach((user: any) => {
            try {
                db.items.add({
                    ...user,
                    id: uuidv4(),
                    docId: tableName,
                });
            } catch (error) {
                console.log(error, "error");
            }
        });
    };

    useEffect(() => {
        if (docs) {
            let first = docs[0]
            first && setCurrentDoc(first?.name)
        }
    }, [docs])

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
                <input type="text" readOnly value={currentDoc} />
            </div>
            <br />
            {hasAnyDocs ? (
                <>
                    <select
                        value={currentDoc}
                        onChange={(e) => {
                            setCurrentDoc(e.target.value);
                        }}
                    >
                        {docs?.map(({ name }, idx) => (
                            <option key={idx} value={name}>{name}</option>
                        ))}
                    </select>

                    {itemsTest && <FriendList currentDoc={currentDoc} />}
                </>
            ) : (
                "no docs yet"
            )
            }
        </div >
    );
};
