'use client';
import { useState, useEffect } from 'react';
import { IndianRupee, ShoppingBag, Utensils, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Audio Notification Sound (Royalty Free Bell)
    const notificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

    const fetchData = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          // Check if there's a new order
          const latestId = data[0].id;
          if (lastOrderId && latestId !== lastOrderId) {
            notificationSound.play().catch(e => console.log('Audio play blocked:', e));
          }
          setLastOrderId(latestId);
          setOrders(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Polling every 10 seconds

    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUserCount(data.length);
      });

    return () => clearInterval(interval);
  }, [lastOrderId]);

  const deliveredOrders = (Array.isArray(orders) ? orders : []).filter(o => o.status === 'Delivered');
  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = (Array.isArray(orders) ? orders : []).length;
  const pendingOrders = (Array.isArray(orders) ? orders : []).filter(o => o.status === 'Pending' || o.status === 'Preparing').length;
  
  const itemsSold = deliveredOrders.reduce((sum, o) => {
    const items = Array.isArray(o.items) ? o.items : [];
    return sum + items.reduce((itemSum: number, item: any) => itemSum + (item.quantity || 0), 0);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-black text-brand-text mb-2">Dashboard Overview</h1>
      <p className="text-brand-muted font-medium mb-8">Welcome back to your restaurant control center.</p>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#dee2e6] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[#6c757d] font-bold text-sm">Total Revenue</p>
              <h3 className="text-3xl font-black text-[#212529] mt-1">₹{totalRevenue}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <IndianRupee size={24} />
            </div>
          </div>
          <p className="text-xs text-[#6c757d] font-medium"><span className="text-green-600 font-bold">+12%</span> from last week</p>
        </div>

        <div className="bg-white border border-[#dee2e6] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[#6c757d] font-bold text-sm">Total Orders</p>
              <h3 className="text-3xl font-black text-[#212529] mt-1">{totalOrders}</h3>
            </div>
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center text-brand-red">
              <ShoppingBag size={24} />
            </div>
          </div>
          <p className="text-xs text-[#6c757d] font-medium">All time orders placed</p>
        </div>

        <div className="bg-white border border-[#dee2e6] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[#6c757d] font-bold text-sm">Active Queue</p>
              <h3 className="text-3xl font-black text-brand-orange mt-1">{pendingOrders}</h3>
            </div>
            <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
              <Utensils size={24} />
            </div>
          </div>
          <p className="text-xs text-[#6c757d] font-medium">Pending & preparing</p>
        </div>

        <div 
          onClick={() => window.location.href = '/admin/users'}
          className="bg-white border border-[#dee2e6] rounded-2xl p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:border-brand-red/30 transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[#6c757d] font-bold text-sm uppercase tracking-widest text-[10px]">Total Customers</p>
              <h3 className="text-3xl font-black text-[#212529] mt-1">{userCount}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-brand-red group-hover:text-white transition-all">
              <Users size={24} />
            </div>
          </div>
          <p className="text-xs text-[#6c757d] font-medium">New registrations stored</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-[#dee2e6] rounded-2xl shadow-sm mt-8 overflow-hidden">
        <div className="p-6 border-b border-[#dee2e6]">
          <h2 className="text-lg font-bold text-[#212529]">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[#6c757d] text-sm tracking-wider">
                <th className="p-4 font-semibold border-b border-[#dee2e6]">Order ID</th>
                <th className="p-4 font-semibold border-b border-[#dee2e6]">Customer</th>
                <th className="p-4 font-semibold border-b border-[#dee2e6]">Items</th>
                <th className="p-4 font-semibold border-b border-[#dee2e6]">Total</th>
                <th className="p-4 font-semibold border-b border-[#dee2e6]">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-[#212529]">
              {(Array.isArray(orders) ? orders : []).slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 border-b border-[#dee2e6] font-bold">{order.orderId || order.id}</td>
                  <td className="p-4 border-b border-[#dee2e6]">
                    <div className="flex flex-col">
                      <span>{order.customerName}</span>
                      <span className="text-xs text-[#6c757d]">{order.type}</span>
                    </div>
                  </td>
                  <td className="p-4 border-b border-[#dee2e6]">{(Array.isArray(order.items) ? order.items.length : 0)} items</td>
                  <td className="p-4 border-b border-[#dee2e6] font-bold text-brand-orange">₹{order.total}</td>
                  <td className="p-4 border-b border-[#dee2e6]">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Ready' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Preparing' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#6c757d]">No orders received yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
