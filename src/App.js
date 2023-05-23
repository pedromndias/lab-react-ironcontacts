import "./App.css";
// import the useState from react:
import { useState } from "react";
// import the contacts from the json file:
import contacts from "./contacts.json";
// console.log(contacts);


function App() {
    // Let's create state so we can manage the contacts rendered on our page:
    const [renderContacts, setRenderContacts] = useState([contacts[5], contacts[12], contacts[15], contacts[20], contacts[21]]);
    // console.log(renderContacts);

    // Let's create a handler that randomly adds a contact to the table (if not already shown):
    const handleRandomContact = () => {
        // console.log("Trying to add random contact");
        // Let's generate a random number from the total possible objects from our contacts array:
        const randomNum = Math.floor(Math.random() * contacts.length)
        // And create a random contact:
        let randomContact = contacts[randomNum];


        // Let's create a check clause that does not allow us to add more contacts than the number we have at the original array:
        if (contacts.length === renderContacts.length) {
            console.log("All contacts added!");
            // And stop the handler:
            return;
        }

        // Let's check for duplicates, comparing the ids:
        let isDuplicatedContact = false;
        let newArr = renderContacts.filter(el => el.id === randomContact.id)
        // console.log(newArr);
        // If there was something filtered, we should say that the contact is duplicated:
        if (newArr.length > 0) {
            isDuplicatedContact = true;
        }
        // If duplicated, we should call the function again (recursion) so it chooses another contact:
        if (isDuplicatedContact) {
            console.log("Contact duplicated!");
            handleRandomContact()
            return;
        }
        // If it is not duplicated, let's add to our state, using the spread operator:
        if (!isDuplicatedContact) {
            setRenderContacts([...renderContacts, randomContact])
        }

    }

    // Let's create a handler that sorts the contacts by popularity:
    const handleSortPopularity = () => {
        // To sort a state array we should clone it:
        const sortedByPopularity = JSON.parse(JSON.stringify(renderContacts))
        // And now sort it by popularity (note the sort implementation for numbers)
        sortedByPopularity.sort((el1, el2) => el2.popularity - el1.popularity)
        // console.log(sortedByPopularity);
        // And set it as the state:
        setRenderContacts(sortedByPopularity);
    }

    // Let's create a handler that sorts the contacts by popularity:
    const handleSortName = () => {
        // To sort a state array we should clone it:
        const sortedByName = JSON.parse(JSON.stringify(renderContacts))
        // And now sort it by name (alphabetically, note the sort implementation)
        sortedByName.sort((el1, el2) => el2.name < el1.name ? 1 : -1)

        // And set it as the state:
        setRenderContacts(sortedByName);

    }

    // Let's create a handler that deletes a specifi contact by its id:
    const handleDeleteContact = (id) => {
        // console.log("Trying to delete contact");
        // To delete an item on a state array we should clone it:
        const clonedContacts = JSON.parse(JSON.stringify(renderContacts))
        // And then find and delete the item:
        let indexToDelete = clonedContacts.findIndex(el => el.id === id)
        // console.log(indexToDelete);
        clonedContacts.splice(indexToDelete, 1)

        // And set it as the state:
        setRenderContacts(clonedContacts)
    }

    return (
        <div className="App">
            <h1>IronContacts</h1>
            {/* Button to call handleRandomContact: */}
            <button onClick={handleRandomContact}>Add Random Contact</button>
            {/* Buttons to sort: */}
            <button onClick={handleSortPopularity}>Sort by popularity</button>
            <button onClick={handleSortName}>Sort by name</button>
            <table>
                <thead>
                    <tr>
                        <th className="table-header">Picture</th>
                        <th className="table-header">Name</th>
                        <th className="table-header">Popularity</th>
                        <th className="table-header">Won Oscar</th>
                        <th className="table-header">Won Emmy</th>
                        <th className="table-header">Action</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {/* Let's map through our renderContacts array and render them */}
                    {renderContacts.map((eachContact, index) => {
                        // Destructure eachContact:
                        const {name, pictureUrl, popularity, id, wonOscar, wonEmmy} = eachContact
                        return (
                            <tr key={id} className="table-row">
                                <td><img src={pictureUrl} alt="actor" /></td>
                                <td>{name}</td>
                                {/* Adjust popularity to 2 decimals: */}
                                <td>{popularity.toFixed(2)}</td>
                                {/* For Oscars and Emmys we can do a conditional: */}
                                <td>{wonOscar && "🏆" }</td>
                                <td>{wonEmmy && "🏆" }</td>
                                <td>
                                    {/* Button to call handleRandomContact: Must be with call back so we pass parameters. */}
                                    <button className="button-delete" onClick={() => {
                                        handleDeleteContact(id)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                
            </table>
            
        </div>
    );
}
export default App;
