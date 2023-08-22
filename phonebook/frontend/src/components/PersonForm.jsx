const PersonForm = ({ onSubmit, onNameChange, onNumberChange, name, number }) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={onSubmit}>
        name: <input
          value={name}
          onChange={onNameChange}
        />
        <br />
        number: <input
          value={number}
          onChange={onNumberChange}
        />
        <br />
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default PersonForm
