'use client';
import { useState, useEffect } from 'react';
import { User, Lock, ShoppingBag, CheckCircle, Clock, IndianRupee, LogOut, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function StaffPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staffData, setStaffData] = useState<any>(null);
  const [sid, setSid] = useState('');
  const [pin, setPin] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dte_staff_session');
    if (saved) {
      setStaffData(JSON.parse(saved));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const fetchOrders = async () => {
    try {
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
      } else {
        alert('Invalid ID or PIN');
      }
    } catch (err) {
      alert('Login failed');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-brand-red p-8 text-center">
            <h1 className="text-2xl font-black text-white">Staff Login</h1>
            <p className="text-red-100 text-sm mt-1">Drive Thru Eats Management</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Staff ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  type="text" 
                  value={sid}
                  onChange={e => setSid(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-bold"
                  placeholder="ST-001"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Login PIN</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  type="password" 
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-red outline-none font-bold tracking-[0.5em]"
                  placeholder="****"
                  maxLength={4}
                />
              </div>
            </div>
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-brand-red hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
            >
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Logic
  const myOrders = orders.filter(o => 
    (staffData.role === 'Kitchen Staff' && o.chef === staffData.name) ||
    (staffData.role === 'Waiter' && o.waiter === staffData.name) ||
    (staffData.role === 'Manager')
  );

  const stats = {
    pending: myOrders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length,
    delivered: myOrders.filter(o => o.status === 'Delivered').length,
    earnings: myOrders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + (o.total * 0.05), 0), // 5% commission mock
    totalValue: myOrders.reduce((sum, o) => sum + o.total, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red text-2xl font-black">
              {staffData.name[0]}
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">{staffData.name}</h1>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{staffData.role} • {staffData.sid}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-gray-100 p-3 rounded-xl text-gray-500 hover:text-brand-red transition-colors">
            <LogOut size={20} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={20} />
            </div>
            <p className="text-2xl font-black text-gray-900">{stats.pending}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Pending</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={20} />
            </div>
            <p className="text-2xl font-black text-gray-900">{stats.delivered}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Delivered</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingBag size={20} />
            </div>
            <p className="text-2xl font-black text-gray-900">{myOrders.length}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Total Tasks</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center ring-2 ring-brand-red/20">
            <div className="w-10 h-10 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mx-auto mb-3">
              <IndianRupee size={20} />
            </div>
            <p className="text-2xl font-black text-brand-red">₹{stats.earnings.toFixed(0)}</p>
            <p className="text-[10px] font-bold text-brand-red/60 uppercase">Commission</p>
          </div>
        </div>

        {/* Recent Work */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-black text-gray-900 text-lg">My Recent Work</h2>
            <span className="text-xs font-bold text-gray-400">Total: ₹{stats.totalValue}</span>
          </div>
          <div className="divide-y divide-gray-50">
            {myOrders.slice(0, 10).map(order => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {order.status === 'Delivered' ? <CheckCircle size={20} /> : <Clock size={20} /> }
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{order.orderId}</h3>
                    <p className="text-xs font-semibold text-gray-400 truncate max-w-[150px]">{order.customerName} • {new Date(order.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-900">₹{order.total}</p>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {myOrders.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-400 font-bold">No orders assigned to you yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Link (Only for Managers) */}
        {staffData.role === 'Manager' && (
          <a href="/admin" className="block text-center bg-gray-900 text-white font-black py-4 rounded-3xl hover:bg-black transition-colors shadow-lg">
            Switch to Admin Panel <ChevronRight className="inline" size={20} />
          </a>
        )}

      </div>
    </div>
  );
}
