const Filter =({filteredCountries, handleFilterChange}) => {
    return (
        <div>
            find countries <input value={filteredCountries} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter;