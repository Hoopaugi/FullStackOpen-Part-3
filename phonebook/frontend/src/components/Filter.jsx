const Filter = ({ onFilterChange, filter }) => {
  return (
    <>
      filter shown with: <input
        value={filter}
        onChange={onFilterChange}
      />
    </>
  )
}

export default Filter
