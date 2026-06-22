import re

file_path = r'c:\proyectos\WorkScripts\Dash_Pedidos\Nodo_4_Frontend_React\comercial-pet-pro\src\App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. States
old_states = """  // Nuevos Estados para filtro por Marca
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState('');
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);"""

new_states = """  // Nuevos Estados para filtro por Categoría y Marca
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState('');
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);"""

content = content.replace(old_states, new_states)

# 2. Click outside logic
old_click_outside = """  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.brand-dropdown-container')) {
        setIsBrandDropdownOpen(false);
      }
    };"""

new_click_outside = """  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.brand-dropdown-container')) {
        setIsBrandDropdownOpen(false);
      }
      if (!event.target.closest('.category-dropdown-container')) {
        setIsCategoryDropdownOpen(false);
      }
    };"""

content = content.replace(old_click_outside, new_click_outside)

# 3. idxCategoria
old_idx = """  const idxMarca = findCol('Marca') ?? 2;"""
new_idx = """  const idxMarca = findCol('Marca') ?? 2;
  const idxCategoria = findCol('Categoría') ?? 3;"""

content = content.replace(old_idx, new_idx)

# 4. UseMemos for unique filters
old_unique_brands = """  const uniqueBrands = useMemo(() => {
    const brands = new Set();
    rows.forEach(item => {
      const brand = item.row[idxMarca];
      if (brand && typeof brand === 'string') {
        const trimmed = brand.trim();
        if (trimmed) brands.add(trimmed);
      }
    });
    return Array.from(brands).sort();
  }, [rows, idxMarca]);

  const filteredBrandsForDropdown = useMemo(() => {
    return uniqueBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));
  }, [uniqueBrands, brandSearch]);

  const handleToggleBrand = useCallback((brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  }, []);

  const handleClearBrands = useCallback(() => {
    setSelectedBrands([]);
  }, []);"""

new_unique_filters = """  // Lógica de Categorías
  const uniqueCategories = useMemo(() => {
    const categories = new Set();
    rows.forEach(item => {
      const cat = item.row[idxCategoria];
      if (cat && typeof cat === 'string') {
        const trimmed = cat.trim();
        if (trimmed) categories.add(trimmed);
      }
    });
    return Array.from(categories).sort();
  }, [rows, idxCategoria]);

  const filteredCategoriesForDropdown = useMemo(() => {
    return uniqueCategories.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase()));
  }, [uniqueCategories, categorySearch]);

  const handleToggleCategory = useCallback((cat) => {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) return prev.filter(c => c !== cat);
      return [...prev, cat];
    });
    // Al cambiar la categoría, limpiamos las marcas seleccionadas para evitar inconsistencias
    setSelectedBrands([]);
  }, []);

  const handleClearCategories = useCallback(() => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  }, []);

  // Lógica de Marcas (Dependiente de Categoría)
  const uniqueBrands = useMemo(() => {
    const brands = new Set();
    rows.forEach(item => {
      // Filtrar marcas si hay categorías seleccionadas
      if (selectedCategories.length > 0) {
        const cat = String(item.row[idxCategoria] || '').trim();
        if (!selectedCategories.includes(cat)) return;
      }
      const brand = item.row[idxMarca];
      if (brand && typeof brand === 'string') {
        const trimmed = brand.trim();
        if (trimmed) brands.add(trimmed);
      }
    });
    return Array.from(brands).sort();
  }, [rows, idxMarca, idxCategoria, selectedCategories]);

  const filteredBrandsForDropdown = useMemo(() => {
    return uniqueBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));
  }, [uniqueBrands, brandSearch]);

  const handleToggleBrand = useCallback((brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  }, []);

  const handleClearBrands = useCallback(() => {
    setSelectedBrands([]);
  }, []);"""

content = content.replace(old_unique_brands, new_unique_filters)

# 5. Deferred values and matching logic
old_deferred = """  const deferredSearchTerm = useDeferredValue(searchTerm);
  const deferredFilterPetType = useDeferredValue(filterPetType);
  const deferredSelectedBrands = useDeferredValue(selectedBrands);

  const filteredRows = useMemo(() => {
    const searchLower = deferredSearchTerm.toLowerCase();

    // Canales habilitados para el cliente logueado
    const clientCanales = clientLogged?.canales
      ? clientLogged.canales.split(',').map(c => c.trim()).filter(Boolean)
      : [];

    return rows.filter(item => {
      const name = String(item.row[idxProd] || '').toLowerCase();
      const ref  = String(item.row[idxRef]  || '').toLowerCase();
      const matchesSearch = name.includes(searchLower) || ref.includes(searchLower);

      const type = getPetType(item.row[idxProd]);
      const matchesFilter = deferredFilterPetType === 'All' || type === deferredFilterPetType;

      const brand = String(item.row[idxMarca] || '').trim();
      const matchesBrand = deferredSelectedBrands.length === 0 || deferredSelectedBrands.includes(brand);

      // Filtro por canal de venta
      let matchesCanal = true;
      if (idxCanales !== null && clientCanales.length > 0) {
        const productCanales = String(item.row[idxCanales] || '')
          .split(',').map(c => c.trim()).filter(Boolean);
        // Producto sin canal asignado => visible para todos
        if (productCanales.length > 0) {
          matchesCanal = productCanales.some(pc => clientCanales.includes(pc));
        }
      }

      return matchesSearch && matchesFilter && matchesBrand && matchesCanal;
    }).sort((a, b) => {
      const aImg = a.row[idxImgUrl] ? 1 : 0;
      const bImg = b.row[idxImgUrl] ? 1 : 0;
      return bImg - aImg;
    });
  }, [rows, deferredSearchTerm, deferredFilterPetType, deferredSelectedBrands, idxImgUrl, idxProd, idxRef, idxMarca, idxCanales, clientLogged]);"""

new_deferred = """  const deferredSearchTerm = useDeferredValue(searchTerm);
  const deferredFilterPetType = useDeferredValue(filterPetType);
  const deferredSelectedBrands = useDeferredValue(selectedBrands);
  const deferredSelectedCategories = useDeferredValue(selectedCategories);

  const filteredRows = useMemo(() => {
    const searchLower = deferredSearchTerm.toLowerCase();

    // Canales habilitados para el cliente logueado
    const clientCanales = clientLogged?.canales
      ? clientLogged.canales.split(',').map(c => c.trim()).filter(Boolean)
      : [];

    return rows.filter(item => {
      const name = String(item.row[idxProd] || '').toLowerCase();
      const ref  = String(item.row[idxRef]  || '').toLowerCase();
      const matchesSearch = name.includes(searchLower) || ref.includes(searchLower);

      const type = getPetType(item.row[idxProd]);
      const matchesFilter = deferredFilterPetType === 'All' || type === deferredFilterPetType;

      const category = String(item.row[idxCategoria] || '').trim();
      const matchesCategory = deferredSelectedCategories.length === 0 || deferredSelectedCategories.includes(category);

      const brand = String(item.row[idxMarca] || '').trim();
      const matchesBrand = deferredSelectedBrands.length === 0 || deferredSelectedBrands.includes(brand);

      // Filtro por canal de venta
      let matchesCanal = true;
      if (idxCanales !== null && clientCanales.length > 0) {
        const productCanales = String(item.row[idxCanales] || '')
          .split(',').map(c => c.trim()).filter(Boolean);
        // Producto sin canal asignado => visible para todos
        if (productCanales.length > 0) {
          matchesCanal = productCanales.some(pc => clientCanales.includes(pc));
        }
      }

      return matchesSearch && matchesFilter && matchesCategory && matchesBrand && matchesCanal;
    }).sort((a, b) => {
      const aImg = a.row[idxImgUrl] ? 1 : 0;
      const bImg = b.row[idxImgUrl] ? 1 : 0;
      return bImg - aImg;
    });
  }, [rows, deferredSearchTerm, deferredFilterPetType, deferredSelectedBrands, deferredSelectedCategories, idxImgUrl, idxProd, idxRef, idxCategoria, idxMarca, idxCanales, clientLogged]);"""

content = content.replace(old_deferred, new_deferred)

# 6. UI insertion
old_ui = """        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500" placeholder="Buscar por nombre o referencia..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto justify-start md:justify-end">"""

new_ui = """        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500" placeholder="Buscar por nombre o referencia..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          
          {/* Filtro por Categoría */}
          <div className="relative category-dropdown-container w-full md:w-auto mt-3 md:mt-0">
            <button 
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className={`w-full md:w-auto px-5 py-3 md:py-2.5 rounded-2xl text-sm font-bold border transition-all flex justify-between md:justify-center items-center gap-2 ${
                selectedCategories.length > 0 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Categoría</span>
              {selectedCategories.length > 0 ? (
                <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-black">
                  {selectedCategories.length}
                </span>
              ) : (
                <Plus size={16} />
              )}
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full md:w-72 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filtrar por Categoría</span>
                  {selectedCategories.length > 0 && (
                    <button 
                      onClick={handleClearCategories}
                      className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
                
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text"
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-emerald-500" 
                    placeholder="Buscar categoría..." 
                    value={categorySearch}
                    onChange={e => setCategorySearch(e.target.value)}
                  />
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                  {filteredCategoriesForDropdown.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-2">No se encontraron categorías</p>
                  ) : (
                    filteredCategoriesForDropdown.map(cat => {
                      const isChecked = selectedCategories.includes(cat);
                      return (
                        <label 
                          key={cat} 
                          className="flex items-center gap-3 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => handleToggleCategory(cat)}
                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                          />
                          <span className="text-xs font-semibold text-slate-700">{cat}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto justify-start md:justify-end">"""

content = content.replace(old_ui, new_ui)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Categorias update added.")
