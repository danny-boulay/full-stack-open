const Filter =({filteredName, handleFilterChange}) => {
    return (
        <div>
            filter show with: <input value={filteredName} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter;