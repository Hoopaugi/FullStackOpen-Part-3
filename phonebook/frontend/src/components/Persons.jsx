const Person = ({ person, handleRemove }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={handleRemove}>delete</button></td>
    </tr>
  )
}

const Persons = ({ persons, handleRemove }) => {
  return (
    <>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map(person => <Person key={person.id} person={person} handleRemove={() => handleRemove(person)} />)}
        </tbody>
      </table>
    </>
  )
}

export default Persons
