'use client';
import { useState, useEffect } from 'react';
import {
  ShoppingBag, Utensils, LayoutGrid, Plus, Minus,
  Search, X, Check, ArrowLeft, LogOut, Loader2
} from 'lucide-react';
import { useCart } from '@/components/CartContext';

export default function WaiterPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [waiter, setWaiter] = useState<any>(null);
  const [sid, setSid] = useState('');
  const [pin, setPin] = useState('');

  const [step, setStep] = useState<'tables' | 'menu' | 'review'>('tables');
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [existingOrderItems, setExistingOrderItems] = useState<any[]>([]);
  const [existingOrderId, setExistingOrderId] = useState<string | null>(null);

  const [tables, setTables] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeOrders, setActiveOrders] = useState<any[]>([]);

  const fetchExistingOrder = async (tableNum: number) => {
    try {
      const active = activeOrders.find((o: any) => o.tableNumber == tableNum);
      if (active) {
        const items = Array.isArray(active.items) ? active.items : JSON.parse(active.items || '[]');
        setExistingOrderItems(items);
        setExistingOrderId(active.orderId);
      } else {
        setExistingOrderItems([]);
        setExistingOrderId(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTableSelect = (t: any) => {
    setSelectedTable(t);
    fetchExistingOrder(t.number);
    setStep('menu');
  };

  const loadInitialData = async () => {
    const tRes = await fetch('/api/tables');
    const tData = await tRes.json();
    setTables(tData);

    const oRes = await fetch('/api/orders');
    const oData = await oRes.json();
    setActiveOrders(oData.filter((o: any) => o.status !== 'Delivered' && o.status !== 'Cancelled' && o.type === 'dining'));

    const mRes = await fetch('/api/menu');
    const mData = await mRes.json();
    if (Array.isArray(mData)) setCategories(mData);
  };

  useEffect(() => {
    const saved = localStorage.getItem('dte_waiter_session');
    if (saved) {
      setWaiter(JSON.parse(saved));
      setIsLoggedIn(true);
    }

    loadInitialData();
    const interval = setInterval(loadInitialData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid, pin })
      });
      const data = await res.json();
      if (data.success && (data.staff.role === 'Waiter' || data.staff.role === 'Kitchen Staff')) {
        setWaiter(data.staff);
        setIsLoggedIn(true);
        localStorage.setItem('dte_waiter_session', JSON.stringify(data.staff));
        // Force refresh data for the new user
        window.location.reload();
      } else {
        const allowedRoles = ['Waiter', 'Kitchen Staff'];
        if (!allowedRoles.includes(data.staff?.role)) {
          alert(`Login failed: Role '${data.staff?.role}' does not have access to this portal.`);
        } else {
          alert('Invalid ID or PIN');
        }
      }
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: any) => {
    const exists = cart.find(c => c.id === item.id);
    if (exists) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(c => {
      if (c.id === id) {
        const newQty = Math.max(0, c.quantity + delta);
        return { ...c, quantity: newQty };
      }
      return c;
    }).filter(c => c.quantity > 0));
  };

  const submitOrder = async () => {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      // 1. Check if there's an active order for this table
      const ordersRes = await fetch('/api/orders');
      const orders = await ordersRes.json();
      const activeOrder = orders.find((o: any) =>
        o.tableNumber == selectedTable.number &&
        o.type === 'dining' &&
        o.status !== 'Delivered' &&
        o.status !== 'Cancelled'
      );

      if (activeOrder) {
        // 2. MERGE: Update Existing Order
        const existingItems = Array.isArray(activeOrder.items) ? activeOrder.items : JSON.parse(activeOrder.items || '[]');
        const mergedItems = [...existingItems, ...cart];
        const newTotal = activeOrder.total + cart.reduce((sum, it) => sum + (it.price * it.quantity), 0);

        await fetch('/api/orders', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: activeOrder.orderId,
            updates: {
              items: JSON.stringify(mergedItems),
              total: newTotal,
              status: 'Pending' // Reset to pending so kitchen sees new items
            }
          })
        });
        alert('Items added to existing Table Order!');
      } else {
        // 3. CREATE: New Order
        const orderData = {
          id: 'DINE-' + Date.now(),
          customerName: `Table ${selectedTable.number} Guest`,
          phone: 'N/A',
          type: 'dining',
          tableNumber: String(selectedTable.number),
          items: cart,
          total: cart.reduce((sum, it) => sum + (it.price * it.quantity), 0),
          paymentMethod: 'cash',
          status: 'Pending',
          waiter: waiter.name
        };

        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
        alert('Order sent to kitchen!');
      }

      setCart([]);
      setSelectedTable(null);
      setStep('tables');
    } catch (err) {
      console.error(err);
      alert('Failed to process order');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-brand-red/10 overflow-hidden">
      {!isLoggedIn ? (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
          {/* Animated Background Decor */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red/20 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700"></div>

          <div className="max-w-md w-full backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl relative z-10 animate-fade-in">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-red to-orange-500 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-lg shadow-brand-red/20 rotate-3">
                <Utensils className="text-white" size={40} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Staff Portal</h1>
              <p className="text-slate-400 font-medium text-xs uppercase tracking-[0.2em]">Secure Hardware Access</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="group relative">
                <input
                  required
                  type="text"
                  placeholder="STAFF ID"
                  value={sid}
                  onChange={e => setSid(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-brand-red/50 focus:bg-white/10 transition-all text-center placeholder:text-slate-500"
                />
              </div>
              <div className="group relative">
                <input
                  required
                  type="password"
                  placeholder="PIN"
                  maxLength={4}
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-black tracking-[1em] outline-none focus:border-brand-red/50 focus:bg-white/10 transition-all text-center placeholder:text-slate-500 placeholder:tracking-normal"
                />
              </div>
              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-red to-orange-600 hover:scale-[1.02] active:scale-[0.98] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-brand-red/20 disabled:opacity-50 mt-4 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Enter Dashboard'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Top Header - Glass Navbar */}
          <header className="px-8 py-5 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-red to-orange-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-brand-red/20">
                  {waiter.name[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-800 tracking-tight">{waiter.name}</h2>
                  <span className="px-2 py-0.5 bg-slate-100 text-[8px] font-black text-slate-500 rounded uppercase tracking-tighter border border-slate-200">{waiter.role}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Status</p>
                <p className="text-[10px] font-black text-green-500 uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Network Active</p>
              </div>
              <button
                onClick={() => { localStorage.removeItem('dte_waiter_session'); setIsLoggedIn(false); }}
                className="p-3 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-brand-red rounded-xl transition-all border border-slate-200 group"
              >
                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-hidden p-8 flex flex-col">
            {waiter.role === 'Kitchen Staff' ? (
              <div className="space-y-8 animate-fade-in flex-1 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">Kitchen Operations</h1>
                    <div className="flex items-center gap-4 mt-3">
                      <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Preparation Heartbeat</p>
                      <div className="h-[2px] w-12 bg-slate-200"></div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-brand-red bg-brand-red/5 px-3 py-1 rounded-full uppercase italic">
                        Live Update Stream
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-x-auto pb-4 scrollbar-custom">
                  <div className="flex gap-8 h-full min-w-[1100px]">
                    {/* KDS Columns - Each with a unique glass aesthetic */}

                    {/* 1. Pending Column */}
                    <div className="w-[380px] flex flex-col gap-5 bg-slate-200/50 backdrop-blur-sm p-6 rounded-[3rem] border border-slate-200/60 shadow-inner">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="font-black text-slate-500 text-xs uppercase tracking-widest flex items-center gap-2">
                          <LayoutGrid size={14} className="text-slate-400" /> Incoming orders
                        </h2>
                        <span className="bg-white text-slate-800 text-[10px] font-black px-2 py-0.5 rounded-lg border border-slate-200 shadow-sm">
                          {activeOrders.filter(o => o.status === 'Pending').length}
                        </span>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                        {activeOrders.filter(o => o.status === 'Pending').map(order => (
                          <div key={order.id} className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:scale-[1.01] transition-all group animate-slide-up">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <span className="font-black text-xl text-slate-800 tracking-tighter line-clamp-1">{order.orderId}</span>
                                <p className="text-[10px] font-black text-brand-red/50 uppercase tracking-widest mt-1">
                                  {order.tableNumber ? `Dining • Table ${order.tableNumber}` : `${order.type} order`}
                                </p>
                              </div>
                              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-brand-red group-hover:text-white transition-colors">
                                <Utensils size={18} />
                              </div>
                            </div>

                            <ul className="space-y-2.5 mb-8">
                              {(Array.isArray(order.items) ? order.items : []).filter((it: any) =>
                                !it.category?.toLowerCase().includes('beverage') && !it.category?.toLowerCase().includes('drink')
                              ).map((item, i) => (
                                <li key={i} className="text-sm font-bold text-slate-700 flex justify-between items-center bg-slate-50/50 px-4 py-2.5 rounded-xl border border-dotted border-slate-200">
                                  <span className="uppercase tracking-tight truncate">{item.name}</span>
                                  <span className="text-brand-red font-black text-xs brightness-90">x{item.quantity}</span>
                                </li>
                              ))}
                            </ul>

                            <button
                              onClick={async () => {
                                await fetch('/api/orders', {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ id: order.orderId, updates: { status: 'Preparing', chef: waiter.name } })
                                });
                                loadInitialData();
                              }}
                              className="w-full bg-slate-900 border-2 border-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-200 hover:bg-brand-red hover:border-brand-red transition-all active:scale-[0.97]"
                            >
                              Fire Order
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Preparing Column */}
                    <div className="w-[380px] flex flex-col gap-5 bg-orange-100/40 backdrop-blur-sm p-6 rounded-[3rem] border border-orange-200/30">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="font-black text-orange-600 text-xs uppercase tracking-widest flex items-center gap-2">
                          <Loader2 size={14} className="animate-spin" /> In preparation
                        </h2>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                        {activeOrders.filter(o => o.status === 'Preparing').map(order => (
                          <div key={order.id} className="bg-white p-7 rounded-[2.5rem] shadow-xl shadow-orange-500/5 border-l-8 border-orange-500 group animate-pulse-subtle">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <span className="font-black text-xl text-slate-800 tracking-tighter line-clamp-1">{order.orderId}</span>
                                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1">Cooking • {order.chef || 'Chef'}</p>
                              </div>
                            </div>

                            <ul className="space-y-2 mb-8">
                              {(Array.isArray(order.items) ? order.items : []).filter((it: any) =>
                                !it.category?.toLowerCase().includes('beverage') && !it.category?.toLowerCase().includes('drink')
                              ).map((item, i) => (
                                <li key={i} className="text-sm font-bold text-slate-700 bg-orange-50/50 px-4 py-2 rounded-xl">
                                  <span className="text-orange-600 font-black mr-2">x{item.quantity}</span> {item.name}
                                </li>
                              ))}
                            </ul>

                            <button
                              onClick={async () => {
                                await fetch('/api/orders', {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ id: order.orderId, updates: { status: 'Ready' } })
                                });
                                loadInitialData();
                              }}
                              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-orange-200 hover:scale-[1.02] transition-all"
                            >
                              Complete Task
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Ready Column */}
                    <div className="w-[380px] flex flex-col gap-5 bg-emerald-100/30 backdrop-blur-sm p-6 rounded-[3rem] border border-emerald-200/20">
                      <h2 className="font-black text-emerald-600 text-xs uppercase tracking-widest px-4">Out to guest</h2>
                      <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                        {activeOrders.filter(o => o.status === 'Ready').map(order => (
                          <div key={order.id} className="bg-white/80 p-7 rounded-[2.5rem] shadow-sm border border-emerald-100 scale-95 opacity-80 filter grayscale-[0.5]">
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-black text-base text-emerald-600 uppercase tracking-tighter">{order.orderId}</span>
                              <Check size={16} className="text-emerald-500" />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase mb-4">Transfer: Table {order.tableNumber}</p>
                            <div className="bg-emerald-50 py-3 rounded-2xl text-center border border-emerald-100">
                              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Handover Ready</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col h-full animate-fade-in relative z-10">
                {step === 'tables' && (
                  <div className="space-y-12 max-w-6xl mx-auto w-full pt-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <h1 className="text-5xl font-black text-slate-800 tracking-tighter uppercase leading-none">Floor Map</h1>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
                          Restaurant Intelligence System <div className="w-8 h-[1px] bg-slate-200"></div>
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-sm group hover:border-brand-red transition-all">
                          <div className="w-3 h-3 rounded-full bg-slate-200 border-2 border-white group-hover:bg-brand-red transition-colors"></div>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Seats</span>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-sm group hover:border-orange-500 transition-all">
                          <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-white animate-pulse"></div>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Sessions</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                      {tables.map((t, idx) => {
                        const isOccupied = activeOrders.some((o: any) => o.tableNumber == t.number);
                        return (
                          <button
                            key={t.id}
                            onClick={() => handleTableSelect(t)}
                            style={{ animationDelay: `${idx * 50}ms` }}
                            className={`relative bg-white aspect-square rounded-[3.5rem] border-2 transition-all p-10 flex flex-col items-center justify-center gap-5 shadow-sm group animate-slide-up ${isOccupied
                                ? 'border-orange-500 ring-8 ring-orange-500/5 shadow-orange-500/10'
                                : 'border-transparent hover:border-brand-red hover:shadow-2xl hover:shadow-brand-red/10'
                              }`}
                          >
                            {isOccupied && (
                              <div className="absolute top-8 right-8">
                                <div className="bg-orange-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-orange-500/30">Busy</div>
                              </div>
                            )}
                            <div className={`p-6 rounded-[2rem] transition-all transform group-hover:scale-110 group-hover:rotate-6 ${isOccupied ? 'bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-300 group-hover:bg-brand-red group-hover:text-white'
                              }`}>
                              <Utensils size={32} />
                            </div>
                            <div className="text-center">
                              <p className={`font-black text-3xl tracking-tighter ${isOccupied ? 'text-orange-600' : 'text-slate-800'}`}>T-{t.number}</p>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{t.seats} SEATS</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 'menu' && (
                  <div className="flex gap-10 h-full animate-fade-in overflow-hidden pr-2">
                    {/* 60% Left: High-Performance Menu */}
                    <div className="w-[62%] flex flex-col gap-8 pb-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setStep('tables')}
                          className="flex items-center gap-3 text-slate-400 hover:text-slate-800 font-black text-[10px] uppercase tracking-widest transition-all group"
                        >
                          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-50">
                            <ArrowLeft size={16} />
                          </div>
                          Return to floor
                        </button>
                        <div className="bg-slate-900 shadow-xl shadow-slate-200 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-white/10">
                          Editing Table {selectedTable?.number}
                        </div>
                      </div>

                      <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-red transition-colors" size={20} />
                        <input
                          type="text"
                          placeholder="Search for dishes, categories, or keywords..."
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-[2rem] pl-16 pr-8 py-5 font-bold text-sm shadow-sm focus:shadow-xl focus:shadow-brand-red/5 focus:border-brand-red/20 transition-all outline-none"
                        />
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-10 scrollbar-custom pr-4">
                        {categories.map((cat, cIdx) => {
                          const filteredItems = (cat.items || []).filter((it: any) => it.name.toLowerCase().includes(search.toLowerCase()));
                          if (filteredItems.length === 0) return null;
                          return (
                            <div key={cat.id} style={{ animationDelay: `${cIdx * 100}ms` }} className="animate-fade-in">
                              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-4 ml-2">
                                {cat.name} <div className="h-[1px] flex-1 bg-slate-100"></div>
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {filteredItems.map((it: any) => (
                                  <div key={it.id} className="bg-white p-4 rounded-3xl shadow-sm border border-transparent flex justify-between items-center group hover:border-brand-red/20 hover:shadow-xl hover:shadow-brand-red/5 hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                      <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500 shadow-inner">
                                        <img src={it.image} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                      </div>
                                      <div>
                                        <p className="font-black text-xs text-slate-800 uppercase leading-none mb-1.5">{it.name}</p>
                                        <div className="flex items-center gap-2">
                                          <span className="font-black text-brand-red text-xs">₹{it.price}</span>
                                          <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                          <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Popular</span>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => addToCart(it)}
                                      className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-400 hover:bg-brand-red hover:text-white hover:rotate-90 shadow-sm transition-all flex items-center justify-center flex-shrink-0 active:scale-75"
                                    >
                                      <Plus size={20} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 40% Right: POS Glass Sidebar */}
                    <div className="w-[38%] bg-white/40 backdrop-blur-xl rounded-[3.5rem] flex flex-col shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-white relative group/sidebar">
                      <div className="p-8 pb-6 bg-white/60">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-black text-xl text-slate-800 tracking-tighter uppercase">Live Session</h3>
                          <div className="w-10 h-6 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-lg text-[10px] font-black">T{selectedTable?.number}</div>
                        </div>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Active Ticket Processing
                        </p>
                      </div>

                      <div className="flex-1 overflow-y-auto p-8 pt-2 space-y-8 scrollbar-custom">
                        {/* Existing Items Table - Condensed & Elegant */}
                        {existingOrderItems.length > 0 && (
                          <div className="space-y-4 animate-fade-in">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 flex items-center gap-2">
                              Delivered Items <div className="h-[1px] flex-1 bg-slate-100"></div>
                            </p>
                            <div className="bg-slate-700/5 rounded-3xl p-5 space-y-3.5 border border-slate-200/50">
                              {existingOrderItems.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                                  <span className="uppercase flex items-center gap-3 truncate pr-4 text-slate-400 font-black">
                                    <div className="w-1 h-1 rounded-full bg-slate-300"></div> {item.quantity}x {item.name}
                                  </span>
                                  <span className="font-mono text-xs">₹{item.price * item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* New Selections - High Visibility Cards */}
                        {cart.length > 0 ? (
                          <div className="space-y-4 pt-2">
                            <p className="text-[9px] font-black text-brand-red uppercase tracking-[0.2em] mb-4 ml-1 flex items-center gap-2">
                              Current Selection <div className="h-[1px] flex-1 bg-brand-red/10"></div>
                            </p>
                            <div className="space-y-4">
                              {cart.map(item => (
                                <div key={item.id} className="group/item flex justify-between items-center gap-5 bg-white p-4 rounded-[2rem] border border-brand-red/10 shadow-lg shadow-brand-red/5 hover:-translate-y-0.5 transition-all animate-slide-left">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-black text-xs text-slate-800 uppercase truncate mb-1">{item.name}</h4>
                                    <p className="font-mono text-[10px] font-bold text-brand-red/60 italic tracking-wider">₹{item.price * item.quantity}</p>
                                  </div>
                                  <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 transition-colors group-hover/item:bg-red-50">
                                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-xl bg-white text-slate-400 hover:text-brand-red shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-90">
                                      <Minus size={14} />
                                    </button>
                                    <span className="font-black text-sm w-6 text-center text-slate-800">{item.quantity}</span>
                                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-xl bg-white text-slate-400 hover:text-brand-red shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-90">
                                      <Plus size={14} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {existingOrderItems.length === 0 && cart.length === 0 && (
                          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-32 grayscale">
                            <div className="w-24 h-24 rounded-[3rem] bg-slate-100 flex items-center justify-center mb-6">
                              <ShoppingBag size={40} className="text-slate-300" />
                            </div>
                            <p className="font-black text-xs uppercase tracking-[0.4em] text-slate-400">Ready for service</p>
                            <p className="text-[10px] font-bold text-slate-300 uppercase mt-2">Select items to begin ticket</p>
                          </div>
                        )}
                      </div>

                      {/* POS Action Hub - Premium Footer */}
                      <div className="p-8 bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] space-y-6">
                        <div className="flex justify-between items-center px-2">
                          <div>
                            <span className="font-bold text-slate-300 uppercase tracking-[0.3em] text-[8px] leading-none mb-2 block">Unified Total Bill</span>
                            <span className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
                              ₹{existingOrderItems.reduce((s, it) => s + (it.price * it.quantity), 0) + cart.reduce((s, it) => s + (it.price * it.quantity), 0)}
                            </span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-green-500 uppercase tracking-tighter bg-green-50 px-3 py-1 rounded-full mb-1">Calculated</span>
                            <span className="text-[9px] font-bold text-slate-300 uppercase">Inc. Taxes</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          <button
                            onClick={submitOrder}
                            disabled={cart.length === 0 || loading}
                            className="bg-brand-red group/btn relative overflow-hidden text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-brand-red/30 tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-4 hover:shadow-brand-red/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                            {loading ? <Loader2 className="animate-spin size={20}" /> : <><Check size={20} /> Deploy to Kitchen</>}
                          </button>

                          <button
                            onClick={async () => {
                              if (confirm("Finalize transaction and clear table status?")) {
                                try {
                                  await fetch('/api/orders', {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      id: existingOrderId,
                                      updates: { status: 'Delivered' }
                                    })
                                  });
                                  alert("Bill Finalized! Session Closed.");
                                  window.print();
                                  setStep('tables');
                                } catch (err) {
                                  alert("System fault: Retry finalization");
                                }
                              }
                            }}
                            disabled={!existingOrderId || loading}
                            className="bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white font-black py-4 rounded-2xl tracking-[0.15em] uppercase text-[10px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-30"
                          >
                            <ShoppingBag size={16} /> Close & Finalize Bill
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}

      {/* Global CSS for Animations */}
      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-left { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes pulse-subtle { 0%, 100% { opacity: 1; } 50% { opacity: 0.95; transform: scale(0.995); } }
        
        .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-left { animation: slide-left 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pulse-subtle { animation: pulse-subtle 3s infinite ease-in-out; }
        .animate-shimmer { animation: shimmer 1.5s infinite; }

        .scrollbar-custom::-webkit-scrollbar { width: 4px; height: 4px; }
        .scrollbar-custom::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-custom::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        
        .glass { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
      `}</style>
    </div>
  );
}
