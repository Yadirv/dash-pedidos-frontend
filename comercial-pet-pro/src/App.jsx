import React, { useState, useMemo, useEffect, useCallback, useDeferredValue } from 'react';
import {
  Plus, Search, Package, DollarSign, Dog, Cat, Eye, PlusCircle, MinusCircle, X, LogIn, ShoppingCart, Loader2, Trash2
} from 'lucide-react';
import dataset from './data.json';

// ==========================================
// CONFIGURACIÓN API
// ==========================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzUaVrLrV627chi0BONtjSktR39jBgDAmU0-9SO3C1a-_tCgDguQNNWSzR3PHSSqyS_/exec";

function ProductModal({ item, onClose, findCol, formatCurrency, parseCurrency }) {
  const idxRef = findCol('Ref') ?? 0;
  const idxProd = findCol('Producto') ?? 1;
  const idxMarca = findCol('Marca') ?? 2;
  const idxPvpSin = findCol('PVP Sin') ?? 8;
  const idxPvpCon = findCol('PVP Con') ?? 9;
  const idxImgUrl = findCol('Imagen_URL') ?? 12;
  const idxDesc = findCol('Descripción') ?? -1;
  const idxNutri = findCol('Datos Nutricionales') ?? -1;
  const idxProveedor = findCol('Proveedor') ?? 4;
  const idxDistribuidor = findCol('Distribuidor') ?? 11;

  const [imgError, setImgError] = useState(false);

  const imgFile = item.row[idxImgUrl]?.split('/').pop();
  const desc = idxDesc !== -1 ? item.row[idxDesc] : '';
  const nutri = idxNutri !== -1 ? item.row[idxNutri] : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute right-6 top-6 text-slate-400 hover:text-slate-700 transition-colors z-10"><X size={24}/></button>
        <div className="p-8 flex flex-col md:flex-row gap-8 max-h-[85vh] overflow-y-auto">
          <div className="w-full md:w-1/3 flex flex-col items-center justify-start">
            <div className="w-48 h-48 bg-slate-50 rounded-3xl p-4 border border-slate-100 flex items-center justify-center sticky top-0">
               {imgFile && !imgError ? (
                 <img src={`/imagenes/${imgFile}`} className="w-full h-full object-contain" onError={() => setImgError(true)} />
               ) : (
                 <Package className="text-slate-300" size={64} />
               )}
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-indigo-600 text-xs font-bold tracking-widest uppercase mb-2">Ficha Técnica</p>
            <h2 className="text-2xl font-black text-slate-900 mb-6 leading-tight">{item.row[idxProd]}</h2>
            
            {desc && (
              <div className="mb-6">
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Referencia</p>
                  <p className="text-sm font-bold text-slate-800">{item.row[idxRef]}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Marca</p>
                  <p className="text-sm font-bold text-slate-800">{item.row[idxMarca]}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Precio Sin Iva</p>
                  <p className="text-sm font-bold text-slate-800">{formatCurrency(parseCurrency(item.row[idxPvpSin]) + (parseCurrency(item.row[idxPvpSin]) * 0.05))}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Precio Final (Con Iva)</p>
                  <p className="text-lg font-black text-indigo-600">{formatCurrency(parseCurrency(item.row[idxPvpCon]) + (parseCurrency(item.row[idxPvpSin]) * 0.05))}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Distribuidor</p>
                  <p className="text-sm font-bold text-slate-800">{item.row[idxDistribuidor] || 'N/A'}</p>
                </div>
              </div>

            {nutri && (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Datos Nutricionales</p>
                <p className="text-xs text-slate-600 leading-relaxed">{nutri}</p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-slate-50 p-6 flex justify-center border-t border-slate-100">
          <button onClick={onClose} className="w-full max-w-sm bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition-colors">Cerrar Detalle</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, val, icon, color }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600"
  };
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
      <div className={`p-4 rounded-2xl ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-slate-800">{val}</p>
      </div>
    </div>
  );
}

function ImageCell({ imgFile, productName, onClick }) {
  const [error, setError] = useState(false);
  return (
    <div className="w-14 h-14 bg-white border rounded-xl flex-shrink-0 p-1 flex items-center justify-center">
      {imgFile && !error ? (
        <img 
          src={`/imagenes/${imgFile}`} 
          alt={productName}
          className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform" 
          onError={() => setError(true)} 
          onClick={onClick}
        />
      ) : (
        <Package className="text-slate-200 cursor-pointer hover:text-slate-400 transition-colors" size={24} onClick={onClick} />
      )}
    </div>
  );
}

// ==========================================
// COMPONENTE CART MODAL
// ==========================================
function CartModal({ unitCounts, rows, onClose, onUpdateQty, onClearCart, onSendOrder, isSendingOrder, formatCurrency, parseCurrency, getPoints, idxPvpCon, idxPvpSin, idxProd, idxMarca, idxImgUrl, idxMargen, includeIva }) {
  const cartItems = useMemo(() => {
    const items = [];
    Object.entries(unitCounts).forEach(([index_, qty]) => {
      if (qty > 0) {
        const item = rows.find(r => r.index_.toString() === index_.toString());
        if (item) items.push({ item, qty });
      }
    });
    return items;
  }, [unitCounts, rows]);

  const { totalCart, totalPuntos } = useMemo(() => {
    let total = 0;
    let puntos = 0;
    cartItems.forEach(({ item, qty }) => {
      const margin = typeof item.row[idxMargen] === 'string' ? parseFloat(item.row[idxMargen]) : item.row[idxMargen];
      const pts = getPoints(margin);
      puntos += pts;
      const pvpSin = parseCurrency(item.row[idxPvpSin]);
      const transport = pvpSin * 0.05;
      const priceStr = includeIva ? item.row[idxPvpCon] : item.row[idxPvpSin];
      const price = parseCurrency(priceStr) + transport;
      total += price * qty;
    });
    return { totalCart: Math.ceil(total / 10) * 10, totalPuntos: puntos };
  }, [cartItems, includeIva, getPoints, parseCurrency, idxPvpCon, idxPvpSin, idxMargen]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3 w-4/5">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl flex-shrink-0">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 line-clamp-1">Tu Carrito</h2>
              <p className="text-sm font-bold text-slate-500">{cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}</p>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors z-10"><X size={20}/></button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow bg-slate-50/50">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart size={64} className="text-slate-300 mb-4" />
              <p className="text-xl font-bold text-slate-500">Tu carrito está vacío</p>
              <p className="text-sm text-slate-400 mt-2">Agrega productos desde el catálogo para continuar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(({ item, qty }) => {
                const imgFile = item.row[idxImgUrl]?.split('/').pop();
                const margin = typeof item.row[idxMargen] === 'string' ? parseFloat(item.row[idxMargen]) : item.row[idxMargen];
                const pts = getPoints(margin);
                const pvpSin = parseCurrency(item.row[idxPvpSin]);
                const transport = pvpSin * 0.05;
                const priceStr = includeIva ? item.row[idxPvpCon] : item.row[idxPvpSin];
                const price = parseCurrency(priceStr) + transport;
                const itemTotal = price * qty;

                return (
                  <div key={item.index_} className="bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <ImageCell imgFile={imgFile} productName={item.row[idxProd]} onClick={() => {}} />
                      <div className="flex-grow sm:flex-grow-0">
                        <p className="text-sm font-bold text-slate-800 pr-8 sm:pr-0">{item.row[idxProd]}</p>
                        <p className="text-xs text-slate-400">{item.row[idxMarca]}</p>
                      </div>
                    </div>
                    <div className="w-full sm:flex-grow flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0 mt-2 sm:mt-0">
                      <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100 w-fit self-start sm:self-auto">
                        <button onClick={() => onUpdateQty(item.index_, Math.max(0, qty-1))} className="text-slate-400 hover:text-red-500"><MinusCircle size={20}/></button>
                        <span className="text-sm font-black w-6 text-center">{qty}</span>
                        <button onClick={() => onUpdateQty(item.index_, qty+1)} className="text-slate-400 hover:text-indigo-600"><PlusCircle size={20}/></button>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto flex justify-between sm:block items-center">
                        <span className="sm:hidden text-xs text-slate-500 font-bold">Total:</span>
                        <div>
                          <p className="text-base sm:text-sm font-black text-indigo-600">{formatCurrency(itemTotal)}</p>
                          {pts > 0 && <p className="text-[10px] font-bold text-emerald-500">Aporta +{pts} Pts</p>}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onUpdateQty(item.index_, 0)} 
                      className="absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto sm:ml-2 p-2 sm:p-3 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Eliminar producto"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-slate-100 rounded-b-[2rem]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-sm">Total a Pagar</span>
            <span className="text-3xl font-black text-indigo-600">{formatCurrency(totalCart)}</span>
          </div>
          {totalPuntos > 0 && (
            <div className="flex justify-between items-center mb-6">
              <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Puntos Acumulados</span>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-xl text-lg font-black">+{totalPuntos} Pts</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onClearCart}
              disabled={cartItems.length === 0 || isSendingOrder}
              className="flex-1 py-4 font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
            >
              Vaciar Carrito
            </button>
            <button 
              onClick={() => {
                onClose();
                onSendOrder();
              }}
              disabled={cartItems.length === 0 || isSendingOrder}
              className="flex-[2] flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-md shadow-indigo-200"
            >
              {isSendingOrder ? <Loader2 className="animate-spin" /> : <ShoppingCart />}
              {isSendingOrder ? 'Enviando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE DE FILA MEMOIZADO (ALTO RENDIMIENTO)
// ==========================================
const ProductRow = React.memo(({ item, qty, includeIva, onUpdateQty, onSelectProduct, formatCurrency, parseCurrency, formatPercent, getPoints, idxImgUrl, idxPvpCon, idxPvpSin, idxProd, idxMarca, idxRef, idxMargen }) => {
  const margin = typeof item.row[idxMargen] === 'string' ? parseFloat(item.row[idxMargen]) : item.row[idxMargen];
  const pts = getPoints(margin);
  const imgFile = item.row[idxImgUrl]?.split('/').pop();
  const pvpSin = parseCurrency(item.row[idxPvpSin]);
  const transport = pvpSin * 0.05;
  const activePriceStr = includeIva ? item.row[idxPvpCon] : item.row[idxPvpSin];
  const activePrice = parseCurrency(activePriceStr) + transport;
  const inactivePriceStr = includeIva ? item.row[idxPvpSin] : item.row[idxPvpCon];
  const inactivePrice = parseCurrency(inactivePriceStr) + transport;
  const noDisponible = isNaN(activePrice) || activePrice <= 0;

  return (
    <tr className="flex flex-col md:table-row hover:bg-slate-50 transition-colors border-b border-slate-200 md:border-none mb-4 md:mb-0 bg-white md:bg-transparent rounded-2xl md:rounded-none p-4 md:p-0 shadow-sm md:shadow-none">
      <td className="block md:table-cell px-2 py-2 md:px-6 md:py-4 mb-2 md:mb-0">
        <div className="flex items-start gap-4">
          <ImageCell imgFile={imgFile} productName={item.row[idxProd]} onClick={() => onSelectProduct(item)} />
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-800 line-clamp-2 md:line-clamp-1 cursor-pointer hover:text-indigo-600" onClick={() => onSelectProduct(item)}>{item.row[idxProd]}</p>
            <p className="text-[10px] text-slate-400">{item.row[idxMarca]}</p>
            <div className="md:hidden mt-1 text-xs font-mono text-slate-500">{item.row[idxRef]}</div>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell text-xs font-mono text-slate-500">{item.row[idxRef]}</td>
      <td className="block md:table-cell text-sm flex justify-between md:justify-start items-center mb-3 md:mb-0">
        <span className="md:hidden text-xs text-slate-500 font-bold uppercase tracking-wider">Precio</span>
        <div className="text-right md:text-left">
          {noDisponible ? (
            <span className="font-black text-rose-500 text-[10px] uppercase tracking-widest bg-rose-50 px-2 py-1 rounded-md">No Disponible</span>
          ) : (
            <>
              <span className="font-bold text-slate-700">{formatCurrency(activePrice)}</span>
              <p className="text-[10px] text-slate-400">{includeIva ? 'Sin IVA: ' : 'Con IVA: '}{formatCurrency(inactivePrice)}</p>
            </>
          )}
        </div>
      </td>
      <td className="block md:table-cell text-center flex justify-between md:justify-center items-center mb-3 md:mb-0 bg-slate-50 md:bg-transparent p-2 md:p-0 rounded-xl">
        <span className="md:hidden text-xs text-slate-600 font-bold uppercase tracking-wider">Cantidad</span>
        <div className="flex items-center justify-center gap-3">
          <button disabled={noDisponible} onClick={() => onUpdateQty(item.index_, Math.max(0, qty-1))} className="text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed bg-white md:bg-transparent p-1 md:p-0 rounded-md shadow-sm md:shadow-none"><MinusCircle size={24} className="md:w-5 md:h-5"/></button>
          <span className={`text-lg md:text-sm font-black w-8 text-center ${noDisponible ? 'text-slate-300' : ''}`}>{qty}</span>
          <button disabled={noDisponible} onClick={() => onUpdateQty(item.index_, qty+1)} className="text-indigo-500 hover:text-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed bg-white md:bg-transparent p-1 md:p-0 rounded-md shadow-sm md:shadow-none"><PlusCircle size={24} className="md:w-5 md:h-5"/></button>
        </div>
      </td>
      <td className="block md:table-cell text-center hidden md:table-cell">{pts > 0 && <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-[10px] font-black">+{pts} Pts</span>}</td>
      <td className="block md:table-cell md:px-6 md:text-right font-bold text-slate-800 text-sm flex justify-between md:justify-end items-center pt-3 md:pt-0 border-t border-slate-100 md:border-none">
        <span className="md:hidden text-xs text-slate-500 font-bold uppercase tracking-wider">Total Item</span>
        <div className="text-right">
          <span className="text-lg md:text-sm text-indigo-600 md:text-slate-800">{qty > 0 ? formatCurrency(activePrice * qty) : '-'}</span>
          {pts > 0 && qty > 0 && <p className="text-[10px] font-bold text-emerald-500 md:hidden mt-0.5">Aporta +{pts} Pts</p>}
        </div>
      </td>
    </tr>
  );
});

export default function App() {
  const [data] = useState(dataset);
  
  // -------------------------
  // ESTADOS DE AUTENTICACIÓN
  // -------------------------
  const [clientLogged, setClientLogged] = useState(null);
  const [loginForm, setLoginForm] = useState({ cc: '', cel: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // -------------------------
  // ESTADOS DEL DASHBOARD
  // -------------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPetType, setFilterPetType] = useState('All');
  const [unitCounts, setUnitCounts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [includeIva, setIncludeIva] = useState(true);
  const [isSendingOrder, setIsSendingOrder] = useState(false);
  
  // Nuevo Estado: Carrito Modal
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Nuevos Estados para filtro por Marca
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState('');
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.brand-dropdown-container')) {
        setIsBrandDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const headerRow = data.find(d => d.index_ === 'header')?.row || [];
  const findCol = (name) => {
    const idx = headerRow.findIndex(h => h && h.toString().toLowerCase().includes(name.toLowerCase()));
    return idx === -1 ? null : idx;
  };

  const idxRef   = findCol('Ref') ?? 0;
  const idxProd  = findCol('Producto') ?? 1;
  const idxMarca = findCol('Marca') ?? 2;
  const idxPvpSin= findCol('PVP Sin') ?? 8;
  const idxPvpCon= findCol('PVP Con') ?? 9;
  const idxMargen = findCol('Margen %') ?? 10;
  const idxImgUrl= findCol('Imagen_URL') ?? 12;
  const idxCanales = findCol('Canales');  // Canal de venta

  const parseCurrency = useCallback((val) => {
    if (typeof val === 'number') return val;
    if (!val || typeof val !== 'string') return 0;
    return parseFloat(val.replace(/[$\s]/g, '').replace(',', '.')) || 0;
  }, []);

  const formatCurrency = useCallback((val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val), []);
  const formatPercent = useCallback((val) => (parseFloat(val || 0) * 100).toFixed(0) + '%', []);

  const getPetType = (name) => {
    if (!name) return 'Other';
    const upper = name.toUpperCase();
    if (upper.includes('CAT') || upper.includes('GATO')) return 'Cat';
    if (upper.includes('DOG') || upper.includes('PERRO')) return 'Dog';
    return 'Other';
  };

  const getPoints = useCallback((margin) => {
    if (!margin || isNaN(margin)) return 0;
    const marginPct = margin * 100;
    if (marginPct >= 30) return 15;
    if (marginPct >= 20) return 10;
    if (marginPct >= 10) return 5;
    return 0;
  }, []);

  // -------------------------
  // FUNCIONES DE LOGIN
  // -------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    if (!APPS_SCRIPT_URL.startsWith('http')) {
      alert('Debes configurar APPS_SCRIPT_URL en el código. Para pruebas locales, te dejaremos pasar como "Cliente Test".');
      setClientLogged({ negocio: 'Cliente Test Local', contacto: 'Prueba', cc_nit: loginForm.cc, celular: loginForm.cel });
      setIsLoggingIn(false);
      return;
    }

    try {
      const response = await fetch(APPS_SCRIPT_URL);
      const clientes = await response.json();
      const clienteEncontrado = clientes.find(c => String(c.cc_nit) === String(loginForm.cc) && String(c.celular) === String(loginForm.cel));
      
      if (clienteEncontrado) {
        setClientLogged(clienteEncontrado);
      } else {
        setLoginError('Los datos no coinciden con ningún cliente registrado. Comunícate con el distribuidor.');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Error de conexión con el servidor. Intenta de nuevo.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // -------------------------
  // FUNCIONES DE PEDIDO Y CARRITO
  // -------------------------
  const handleUpdateQty = useCallback((index_, newQty) => {
    setUnitCounts(prev => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[index_];
      } else {
        updated[index_] = newQty;
      }
      return updated;
    });
  }, []);

  const handleClearCart = useCallback(() => {
    if (window.confirm("¿Estás seguro de que deseas vaciar todo tu carrito?")) {
      setUnitCounts({});
      setIsCartOpen(false);
    }
  }, []);

  const handleSendOrder = async () => {
    if (!clientLogged) return;
    
    const items = [];
    let totalPuntos = 0;
    Object.entries(unitCounts).forEach(([index_, qty]) => {
      if (qty > 0) {
        const item = rows.find(r => r.index_.toString() === index_.toString());
        if (item) {
          const margin = typeof item.row[idxMargen] === 'string' ? parseFloat(item.row[idxMargen]) : item.row[idxMargen];
          const pts = getPoints(margin);
          totalPuntos += pts;
          const pvpSin = parseCurrency(item.row[idxPvpSin]);
          const transport = pvpSin * 0.05;
          const priceStr = includeIva ? item.row[idxPvpCon] : item.row[idxPvpSin];
          const price = parseCurrency(priceStr) + transport;
          const totalItem = price * qty;
          
          items.push({
            referencia: item.row[idxRef],
            producto: item.row[idxProd],
            marca: item.row[idxMarca],
            cantidad: qty,
            precioUnitario: price,
            descuentoAplicado: 0,
            totalItem: totalItem
          });
        }
      }
    });

    if (items.length === 0) return;

    const payload = {
      action: 'add_order',
      cc_nit: clientLogged.cc_nit,
      celular: clientLogged.celular,
      negocio: clientLogged.negocio,
      fecha: new Date().toLocaleString('es-CO'),
      incluye_iva: includeIva,
      totalPuntos: totalPuntos,
      items: items
    };

    setIsSendingOrder(true);
    try {
      if (APPS_SCRIPT_URL.startsWith('http')) {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      alert(`¡Pedido de ${items.length} productos enviado exitosamente a nombre de ${clientLogged.negocio}!`);
      setUnitCounts({});
      setIsCartOpen(false);
    } catch (err) {
      alert('Hubo un error al enviar el pedido: ' + err.message);
    } finally {
      setIsSendingOrder(false);
    }
  };

  const toggleIvaStatus = () => {
    setIncludeIva(!includeIva);
  };

  // -------------------------
  // MEMOS Y RENDER PRINCIPAL
  // -------------------------
  const rows = useMemo(() => data.filter(d => d.index_ !== 'header'), [data]);

  const uniqueBrands = useMemo(() => {
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
  }, []);

  const deferredSearchTerm = useDeferredValue(searchTerm);
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
  }, [rows, deferredSearchTerm, deferredFilterPetType, deferredSelectedBrands, idxImgUrl, idxProd, idxRef, idxMarca, idxCanales, clientLogged]);

  const stats = useMemo(() => {
    let totalCompra = 0; let cats = 0; let dogs = 0; let distinctItems = 0; let totalPuntos = 0;
    filteredRows.forEach(item => {
      const type = getPetType(item.row[idxProd]);
      if (type === 'Cat') cats++;
      if (type === 'Dog') dogs++;
    });
    Object.entries(unitCounts).forEach(([index_, qty]) => {
      if (qty > 0) {
        distinctItems++;
        const item = rows.find(r => r.index_.toString() === index_.toString());
        if (item) {
          const margin = typeof item.row[idxMargen] === 'string' ? parseFloat(item.row[idxMargen]) : item.row[idxMargen];
          const pts = getPoints(margin);
          totalPuntos += pts;
          const pvpSin = parseCurrency(item.row[idxPvpSin]);
          const transport = pvpSin * 0.05;
          const priceStr = includeIva ? item.row[idxPvpCon] : item.row[idxPvpSin];
          const price = parseCurrency(priceStr) + transport;
          totalCompra += price * qty;
        }
      }
    });
    totalCompra = Math.ceil(totalCompra / 10) * 10;
    return { count: filteredRows.length, totalCompra, catCount: cats, dogCount: dogs, distinctItems, totalPuntos };
  }, [filteredRows, rows, unitCounts, includeIva, idxPvpCon, idxPvpSin, idxProd, getPoints, parseCurrency, idxMargen]);

  if (!clientLogged) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 py-12">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-200 my-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
              <Package className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Acceso a Clientes B2B</h1>
            <p className="text-sm text-slate-500 mt-2">Ingresa tus datos para ver el catálogo y hacer pedidos</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">C.C o NIT</label>
              <input 
                type="number" 
                required 
                max="999999999999"
                value={loginForm.cc}
                onChange={e => {
                  if (e.target.value.length <= 12) setLoginForm({...loginForm, cc: e.target.value})
                }}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg font-mono" 
                placeholder="Ej. 900123456" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Número de Celular</label>
              <input 
                type="number" 
                required 
                max="999999999999"
                value={loginForm.cel}
                onChange={e => {
                  if (e.target.value.length <= 12) setLoginForm({...loginForm, cel: e.target.value})
                }}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg font-mono" 
                placeholder="Ej. 3001234567" 
              />
            </div>
            
            {loginError && (
              <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold text-center border border-rose-100">
                {loginError}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoggingIn || !loginForm.cc || !loginForm.cel}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-md shadow-indigo-200 flex justify-center items-center gap-2 text-lg"
            >
              {isLoggingIn ? <Loader2 className="animate-spin" /> : <LogIn />}
              {isLoggingIn ? 'Verificando...' : 'Entrar al Catálogo'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Normal
  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 pb-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Comercial Pet <span className="text-indigo-600">Dashboard</span></h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Bienvenido, <span className="text-indigo-600">{clientLogged.negocio}</span></p>
          <p className="text-[10px] font-black text-rose-500 mt-2 uppercase tracking-widest bg-rose-50 px-2 py-1 rounded-md inline-block">Todos Los Pedidos están sujetos a verificación</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 w-fit">
            <span className={`text-sm font-bold transition-colors ${!includeIva ? 'text-slate-800' : 'text-slate-400'}`}>Sin IVA</span>
            <button 
              onClick={toggleIvaStatus}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${includeIva ? 'bg-indigo-600' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm ${includeIva ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-bold transition-colors ${includeIva ? 'text-indigo-600' : 'text-slate-400'}`}>Con IVA</span>
          </div>
          {includeIva && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-xl max-w-[250px] text-center md:text-right animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
              Para facturación electrónica envíe copia del RUT actualizado al Distribuidor
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total SKU" val={`${stats.count}`} icon={<Package/>} color="indigo" />
        <StatCard label="Total Compra" val={formatCurrency(stats.totalCompra)} icon={<DollarSign/>} color="emerald" />
        <StatCard label="Línea Gatos" val={`${stats.catCount}`} icon={<Cat/>} color="blue" />
        <StatCard label="Línea Perros" val={`${stats.dogCount}`} icon={<Dog/>} color="orange" />
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500" placeholder="Buscar por nombre o referencia..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto justify-start md:justify-end">
            <div className="flex bg-slate-100 p-1 rounded-2xl">
              {['All', 'Cat', 'Dog'].map(t => (
                <button key={t} onClick={() => setFilterPetType(t)} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filterPetType === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{t}</button>
              ))}
            </div>

            {/* Filtro por Marca */}
            <div className="relative brand-dropdown-container">
              <button 
                onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold border transition-all flex items-center gap-2 ${
                  selectedBrands.length > 0 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Marca</span>
                {selectedBrands.length > 0 ? (
                  <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-black">
                    {selectedBrands.length}
                  </span>
                ) : (
                  <Plus size={16} />
                )}
              </button>

              {isBrandDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filtrar por Marca</span>
                    {selectedBrands.length > 0 && (
                      <button 
                        onClick={handleClearBrands}
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
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-indigo-500" 
                      placeholder="Buscar marca..." 
                      value={brandSearch}
                      onChange={e => setBrandSearch(e.target.value)}
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                    {filteredBrandsForDropdown.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-2">No se encontraron marcas</p>
                    ) : (
                      filteredBrandsForDropdown.map(brand => {
                        const isChecked = selectedBrands.includes(brand);
                        return (
                          <label 
                            key={brand} 
                            className="flex items-center gap-3 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={() => handleToggleBrand(brand)}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                            />
                            <span className="text-xs font-semibold text-slate-700">{brand}</span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-hidden md:overflow-visible">
          <table className="w-full text-left border-collapse block md:table">
            <thead className="hidden md:table-header-group">
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Producto</th>
                <th>Referencia</th>
                <th>Precio</th>
                <th className="text-center">Cantidad</th>
                <th className="text-center">Puntos</th>
                <th className="px-6 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group divide-y divide-slate-100">
              {filteredRows.map(item => {
                const qty = unitCounts[item.index_] || 0;
                return (
                  <ProductRow 
                    key={item.index_}
                    item={item}
                    qty={qty}
                    includeIva={includeIva}
                    onUpdateQty={handleUpdateQty}
                    onSelectProduct={setSelectedProduct}
                    formatCurrency={formatCurrency}
                    parseCurrency={parseCurrency}
                    formatPercent={formatPercent}
                    getPoints={getPoints}
                    idxImgUrl={idxImgUrl}
                    idxMargen={idxMargen}
                    idxPvpCon={idxPvpCon}
                    idxPvpSin={idxPvpSin}
                    idxProd={idxProd}
                    idxMarca={idxMarca}
                    idxRef={idxRef}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* CHECKOUT FLOATING BAR */}
      {stats.totalCompra > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 p-4 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-grow w-full text-center md:text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total de tu pedido</p>
              <div className="flex items-baseline justify-center md:justify-start gap-3">
                <p className="text-3xl font-black text-indigo-600">{formatCurrency(stats.totalCompra)}</p>
                <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{stats.distinctItems} items</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="w-full sm:w-auto flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-3 md:py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 border border-indigo-100"
              >
                <Eye size={20} />
                Ver Carrito
              </button>
              
              <button 
                onClick={handleSendOrder}
                disabled={isSendingOrder}
                className="w-full sm:w-auto flex-[2] bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-3 md:py-4 px-8 rounded-2xl transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 text-lg"
              >
                {isSendingOrder ? <Loader2 className="animate-spin" /> : <ShoppingCart />}
                {isSendingOrder ? 'Enviando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && <ProductModal item={selectedProduct} onClose={() => setSelectedProduct(null)} findCol={findCol} formatCurrency={formatCurrency} parseCurrency={parseCurrency} />}
      
      {isCartOpen && (
        <CartModal 
          unitCounts={unitCounts}
          rows={rows}
          onClose={() => setIsCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onClearCart={handleClearCart}
          onSendOrder={handleSendOrder}
          isSendingOrder={isSendingOrder}
          formatCurrency={formatCurrency}
          parseCurrency={parseCurrency}
          getPoints={getPoints}
          idxPvpCon={idxPvpCon}
          idxPvpSin={idxPvpSin}
          idxProd={idxProd}
          idxMarca={idxMarca}
          idxImgUrl={idxImgUrl}
                    idxMargen={idxMargen}
          includeIva={includeIva}
        />
      )}
    </div>
  );
}


