function SearchBar({ value, onChange, placeholder = "Pesquisar...", label = "Pesquisar" }) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
                {label}
            </label>

            <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none" />
        </div>
    );
}

export default SearchBar;