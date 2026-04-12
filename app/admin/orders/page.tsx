'use client';
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Filter, X, Trash2, Edit2, CheckCircle, Clock } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [editingOrder, setEditingOrder] = useState<any>(null);

  const fetchOrders = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(err => console.error("Fetch failed", err));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(o => {
    const matchesSearch = (o.orderId || o.id || "").toLowerCase().includes(search.toLowerCase()) ||
                         (o.customerName || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesType = typeFilter === 'All' || o.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const updateStatus = (orderId: string, newStatus: string) => {
    fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, updates: { status: newStatus } })
    }).then(() => fetchOrders());
  };

  const cancelOrder = (orderId: string) => {
    if (!confirm('Are you sure you want to delete/cancel this order permanently?')) return;
    fetch('/api/orders', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId })
    }).then(() => fetchOrders());
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-[#212529]">Advanced Orders</h1>
          <p className="text-[#6c757d] font-medium mt-1">Manage, filter, and modify live restaurant orders.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-red outline-none w-48"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
          </select>
          <select 
            value={typeFilter} 
            onChange={e => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none"
          >
            <option value="All">All Types</option>
            <option value="dining">Dining</option>
            <option value="delivery">Delivery</option>
            <option value="pickup">Pickup</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
                <th className="p-6">Order</th>
                <th className="p-6">Customer</th>
                <th className="p-6">Items</th>
                <th className="p-6 text-center">Summary</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-gray-400 font-bold">
                    No orders matching your filters.
                  </td>
                </tr>
              ) : filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 align-top">
                    <p className="font-black text-gray-900">{order.orderId}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">
                      {new Date(order.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                    <div className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      order.type === 'dining' ? 'bg-orange-100 text-orange-600' :
                      order.type === 'delivery' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                    }`}>
                      {order.type} {order.tableNumber ? `#${order.tableNumber}` : ''}
                    </div>
                  </td>
                  <td className="p-6 align-top">
                    <p className="font-bold text-gray-900">{order.customerName}</p>
                    <p className="text-xs font-semibold text-gray-400">{order.phone}</p>
                    {order.email && <p className="text-[10px] text-gray-400">{order.email}</p>}
                    {order.address && <p className="text-[10px] text-gray-500 mt-2 max-w-[150px] line-clamp-2">{order.address}</p>}
                  </td>
                  <td className="p-6 align-top">
                    <div className="space-y-1">
                      {(Array.isArray(order.items) ? order.items : []).map((it: any, i: number) => (
                        <div key={i} className="text-xs font-bold text-gray-600 flex justify-between gap-4">
                          <span>{it.quantity}x {it.name}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-6 align-top text-center">
                    <p className="text-xl font-black text-brand-red">₹{order.total}</p>
                    <div className="mt-2 flex flex-col items-center gap-1">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.orderId, e.target.value)}
                        className={`text-[10px] font-black uppercase px-2 py-1 rounded-full outline-none cursor-pointer border-none shadow-sm ${
                          order.status === 'Pending' ? 'bg-red-50 text-red-600' :
                          order.status === 'Preparing' ? 'bg-orange-50 text-orange-600' :
                          order.status === 'Ready' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-6 align-top text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => cancelOrder(order.orderId)}
                        className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Cancel/Delete Order"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
