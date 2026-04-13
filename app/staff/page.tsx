'use client';
import { useState, useEffect } from 'react';
import { 
  User, Lock, ShoppingBag, CheckCircle, Clock, IndianRupee, 
  LogOut, ChevronRight, Utensils, LayoutGrid, ChefHat, Plus,
  Search, ClipboardList, Wallet
} from 'lucide-react';

type View = 'dashboard' | 'pos' | 'tables' | 'kitchen';

export default function StaffPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staffData, setStaffData] = useState<any>(null);
  const [sid, setSid] = useState('');
  const [pin, setPin] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<View>('dashboard');
  const [categories, setCategories] = useState<any[]>([]);
  const [allMenuItems, setAllMenuItems] = useState<any[]>([]);
  
  // POS State
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [posOrderType, setPosOrderType] = useState('dining');
  const [posTable, setPosTable] = useState('');
  const [posPayment, setPosPayment] = useState('cash');

  useEffect(() => {
    const saved = localStorage.getItem('dte_staff_session');
    if (saved) {
      const parsed = JSON.parse(saved);
      setStaffData(parsed);
      setIsLoggedIn(true);
      if (parsed.role === 'Kitchen Staff') setActiveTab('kitchen');
    }

    const loadCoreData = async () => {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
          setAllMenuItems(data.flatMap(cat => cat.items || []));
        }
      } catch (err) {
        console.error("Menu fetch failed:", err);
      }
    };
    
    loadCoreData();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
      // Poll faster but only for active orders (thanks to API optimization)
      const interval = setInterval(fetchOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const fetchOrders = async () => {
    try {
      // By default our new GET /api/orders returns only active/recent ones
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

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
      if (data.success) {
        setStaffData(data.staff);
        setIsLoggedIn(true);
        localStorage.setItem('dte_staff_session', JSON.stringify(data.staff));
        if (data.staff.role === 'Kitchen Staff') setActiveTab('kitchen');
      } else {
        alert('Invalid ID or PIN');
      }
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: orderId, 
          updates: { 
            status: newStatus,
            chef: staffData.role === 'Kitchen Staff' ? staffData.name : undefined,
            waiter: staffData.role === 'Waiter' ? staffData.name : undefined
          } 
        })
      });
      fetchOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handlePOSOrder = async () => {
    if (cart.length === 0) return;
    if (posOrderType === 'dining' && !posTable) return alert("Please select a Table Number!");

    setLoading(true);
    const orderData = {
      id: 'STAFF-' + Date.now(),
      customerName: 'DINE-IN GUEST',
      phone: 'N/A',
      type: posOrderType,
      tableNumber: posTable,
      items: cart, // API will JSON.stringify
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      paymentMethod: posPayment,
      status: 'Pending',
      waiter: staffData.name
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Order Placed Successfully!');
        setCart([]);
        setPosTable('');
        setActiveTab('dashboard');
        fetchOrders();
      } else {
        alert('Order Failed: ' + (data.detail || data.error || 'Server Error'));
      }
    } catch (err) {
      alert('Network Error: Could not reach server');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dte_staff_session');
    setStaffData(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full glass rounded-4xl shadow-premium overflow-hidden border-white">
          <div className="bg-brand-red p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h1 className="text-3xl font-black text-white tracking-tighter">Portal Login</h1>
            <p className="text-red-100 text-xs mt-1 font-bold uppercase tracking-widest">Identify Yourself</p>
          </div>
          <form onSubmit={handleLogin} className="p-10 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Staff ID Code</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={18} />
                <input 
                  required 
                  type="text" 
                  value={sid}
                  onChange={e => setSid(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-brand-border rounded-2xl focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none font-black text-sm uppercase tracking-wider"
                  placeholder="E.G. ST-001"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Secure Entry PIN</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={18} />
                <input 
                  required 
                  type="password" 
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-brand-border rounded-2xl focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none font-black text-lg tracking-[0.8em]"
                  placeholder="****"
                  maxLength={4}
                />
              </div>
            </div>
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-brand-red hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-premium active:scale-[0.98] mt-4"
            >
              {loading ? 'AUTHENTICATING...' : 'GAIN ACCESS'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const myOrders = orders.filter(o => 
    (staffData.role === 'Kitchen Staff' && (o.status === 'Pending' || o.status === 'Preparing')) ||
    (staffData.role === 'Waiter' && o.waiter === staffData.name) ||
    (staffData.role === 'Manager')
  );

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar Nav */}
      <aside className="w-24 md:w-64 bg-brand-text text-white flex flex-col p-4 border-r border-brand-border h-screen sticky top-0">
        <div className="mb-12 text-center md:text-left px-2">
          <img src="https://drive-thrueats.online/logo.png" alt="Logo" className="h-8 w-auto mx-auto md:mx-0 invert" />
        </div>

        <nav className="flex-1 space-y-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'dashboard' ? 'bg-brand-red text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <ClipboardList size={20} />
            <span className="hidden md:block font-black text-xs uppercase tracking-widest">Worklog</span>
          </button>

          {(staffData.role === 'Manager' || staffData.role === 'Waiter') && (
            <>
              <button 
                onClick={() => setActiveTab('pos')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'pos' ? 'bg-brand-red text-white' : 'text-gray-400 hover:bg-white/5'}`}
              >
                <Plus size={20} />
                <span className="hidden md:block font-black text-xs uppercase tracking-widest">Take Order</span>
              </button>
              <button 
                onClick={() => setActiveTab('tables')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'tables' ? 'bg-brand-red text-white' : 'text-gray-400 hover:bg-white/5'}`}
              >
                <LayoutGrid size={20} />
                <span className="hidden md:block font-black text-xs uppercase tracking-widest">Tables</span>
              </button>
            </>
          )}

          {(staffData.role === 'Manager' || staffData.role === 'Kitchen Staff') && (
            <button 
              onClick={() => setActiveTab('kitchen')}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'kitchen' ? 'bg-brand-red text-white' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <ChefHat size={20} />
              <span className="hidden md:block font-black text-xs uppercase tracking-widest">Kitchen</span>
            </button>
          )}
        </nav>

        <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all mb-4">
          <LogOut size={20} />
          <span className="hidden md:block font-black text-xs uppercase tracking-widest">Logout</span>
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-brand-text tracking-tighter uppercase">My Dashboard</h1>
                <p className="text-brand-muted font-bold text-xs tracking-widest uppercase mt-1">{staffData.role} • {staffData.name}</p>
              </div>
              {staffData.role === 'Manager' && (
                <a href="/admin" className="btn-secondary group">
                  ADMIN PANEL <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>

            {/* Orders Feed */}
            <div className="grid grid-cols-1 gap-4">
              {myOrders.map(order => (
                <div key={order.id} className="glass p-6 rounded-3xl border-white flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-premium transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-brand-bg flex items-center justify-center font-black text-brand-red">
                      {order.orderId.slice(-3)}
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-brand-text">Order #{order.orderId}</h3>
                      <p className="text-xs font-bold text-brand-muted uppercase tracking-widest leading-none mt-1">{order.customerName} • {order.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl font-black text-brand-text">₹{order.total}</p>
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {order.status}
                      </span>
                    </div>

                    {order.status !== 'Delivered' && (
                      <div className="flex gap-2">
                        {order.status === 'Ready' && (
                          <button 
                            onClick={() => updateOrderStatus(order.orderId, 'Delivered')}
                            className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-all font-black text-[10px]"
                          >
                            DELIVER
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {myOrders.length === 0 && <div className="p-20 text-center glass rounded-4xl text-brand-muted font-black uppercase tracking-[0.3em]">No active tasks</div>}
            </div>
          </div>
        )}

        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Menu Selection */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-brand-text tracking-tight uppercase">Quick Menu</h2>
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by name..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="bg-white border border-brand-border rounded-xl pl-11 pr-4 py-3 text-sm font-bold w-64" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {allMenuItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                  <button 
                    key={item.id}
                    onClick={() => {
                      const exists = cart.find(c => c.id === item.id);
                      if (exists) {
                        setCart(cart.map(c => c.id === item.id ? {...c, quantity: c.quantity + 1} : c));
                      } else {
                        setCart([...cart, {...item, quantity: 1}]);
                      }
                    }}
                    className="bg-white p-4 rounded-3xl border border-brand-border text-left hover:border-brand-red transition-all group shadow-soft"
                  >
                    <div className="aspect-square rounded-2xl bg-brand-bg overflow-hidden mb-3">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
                    </div>
                    <p className="font-black text-xs text-brand-text uppercase leading-tight line-clamp-1">{item.name}</p>
                    <p className="font-black text-brand-red text-sm mt-1">₹{item.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart & Checkout */}
            <div className="glass p-8 rounded-4xl border-white h-fit sticky top-10 space-y-6">
              <h3 className="text-xl font-black text-brand-text flex items-center gap-2 uppercase">
                <ShoppingBag /> Current Order
              </h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-brand-border">
                    <div>
                      <p className="font-black text-xs uppercase">{item.name}</p>
                      <p className="text-xs font-bold text-brand-muted">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-black text-brand-red">₹{item.price * item.quantity}</p>
                  </div>
                ))}
                {cart.length === 0 && <p className="text-center py-10 text-brand-muted font-bold text-xs uppercase">Cart is Empty</p>}
              </div>

              <div className="pt-6 border-t border-brand-border space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-brand-bg p-4 rounded-2xl">
                    <label className="text-[10px] font-black uppercase text-brand-muted block mb-1">Table #</label>
                    <input 
                      type="text" 
                      value={posTable}
                      onChange={e => setPosTable(e.target.value)}
                      placeholder="E.G. 12"
                      className="w-full bg-transparent outline-none font-black"
                    />
                  </div>
                  <select 
                    value={posPayment}
                    onChange={e => setPosPayment(e.target.value)}
                    className="bg-brand-bg p-4 rounded-2xl font-black text-[10px] uppercase outline-none"
                  >
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center px-2">
                  <span className="font-black text-sm uppercase">Total Amount</span>
                  <span className="text-2xl font-black text-brand-text">₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                </div>

                <button 
                  onClick={handlePOSOrder}
                  disabled={loading || cart.length === 0}
                  className="w-full btn-primary py-5 uppercase tracking-[0.2em] shadow-premium disabled:opacity-50"
                >
                  Confirm & Place Order
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="space-y-10">
            <h1 className="text-4xl font-black text-brand-text tracking-tighter uppercase">Table Occupancy</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                <div key={num} className="glass p-8 rounded-4xl border-white text-center hover:shadow-premium transition-all">
                  <Utensils size={32} className="mx-auto text-brand-red mb-4" />
                  <p className="font-black text-xl text-brand-text">Table {num}</p>
                  <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">Available</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'kitchen' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-black text-brand-text tracking-tighter uppercase">Kitchen Queue</h1>
              <div className="flex items-center gap-2 bg-brand-red/10 px-4 py-2 rounded-xl text-brand-red animate-pulse">
                <div className="w-2 h-2 rounded-full bg-brand-red" />
                <span className="text-xs font-black uppercase">Live Updates</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').map(order => (
                <div key={order.id} className="bg-white border-2 border-brand-border rounded-4xl p-8 hover:border-brand-red transition-all shadow-soft flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center font-black text-brand-red">
                      {order.orderId.slice(-2)}
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex-1 space-y-4 mb-8">
                    <h3 className="font-black text-lg uppercase tracking-tight line-clamp-1">{order.customerName}</h3>
                    <div className="space-y-2">
                       {JSON.parse(order.items || '[]').map((item: any, i: number) => (
                         <div key={i} className="flex justify-between text-sm font-bold border-b border-brand-bg pb-2">
                           <span className="text-brand-muted">{item.quantity}× <span className="text-brand-text">{item.name}</span></span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-border">
                    {order.status === 'Pending' ? (
                      <button 
                         onClick={() => updateOrderStatus(order.orderId, 'Preparing')}
                         className="w-full bg-brand-text text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase text-xs tracking-widest"
                      >
                         Start Preparing
                      </button>
                    ) : (
                      <button 
                        onClick={() => updateOrderStatus(order.orderId, 'Ready')}
                        className="w-full bg-green-500 text-white font-black py-4 rounded-2xl hover:bg-green-600 transition-all uppercase text-xs tracking-widest"
                      >
                         Mark as Ready
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length === 0 && (
                <div className="col-span-full py-40 text-center glass rounded-4xl bg-brand-bg/20">
                    <ChefHat size={48} className="mx-auto text-brand-border mb-4 opacity-20" />
                    <p className="text-brand-muted font-black uppercase tracking-[0.4em]">Kitchen is Clear</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
