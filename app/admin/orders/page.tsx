'use client';
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Filter, X, Trash2, Edit2, CheckCircle, Clock, Eye, Info, Calendar } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const fetchOrders = () => {
    // Audio Notification Sound (Royalty Free Bell)
    const notificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          if (data.length > 0) {
            const latestId = data[0].id;
            if (lastOrderId && latestId !== lastOrderId) {
              notificationSound.play().catch(e => console.log('Audio play blocked:', e));
            }
            setLastOrderId(latestId);
          }
          setOrders(data);
        }
      })
      .catch(err => console.error("Fetch failed", err));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [lastOrderId]);

  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(o => {
    const matchesSearch = (o.orderId || o.id || "").toLowerCase().includes(search.toLowerCase()) ||
                         (o.customerName || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesType = typeFilter === 'All' || o.type === typeFilter;
    
    let matchesDate = true;
    const orderDate = new Date(o.timestamp);
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0); // Start of the day
      if (orderDate < start) matchesDate = false;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // End of the day
      if (orderDate > end) matchesDate = false;
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate;
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
    <>
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-[#212529]">Advanced Orders</h1>
          <p className="text-[#6c757d] font-medium mt-1">Manage, filter, and modify live restaurant orders.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Search */}
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-red outline-none w-full sm:w-48"
            />
          </div>

          {/* Date Filter Dropdown */}
          <div className="relative flex-grow sm:flex-grow-0">
            <button 
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Calendar size={16} className={startDate || endDate ? "text-brand-red" : "text-gray-400"} />
              <span>{(startDate || endDate) ? 'Date Filtered' : 'Filter by Date'}</span>
            </button>
            
            {isDateDropdownOpen && (
              <>
                <div 
                   className="fixed inset-0 z-40" 
                   onClick={() => setIsDateDropdownOpen(false)} 
                />
                <div className="absolute top-full right-0 sm:left-0 mt-2 w-72 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 z-50 animate-fade-in">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Select Date Range</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">From Date</label>
                      <input 
                        type="date" 
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm outline-none text-gray-700 font-bold focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">To Date</label>
                      <input 
                        type="date" 
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm outline-none text-gray-700 font-bold focus:border-brand-red"
                      />
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    {(startDate || endDate) ? (
                      <button 
                        onClick={() => { setStartDate(''); setEndDate(''); setIsDateDropdownOpen(false); }}
                        className="text-xs text-red-500 font-bold hover:text-red-700 transition-colors"
                      >
                        Clear Range
                      </button>
                    ) : <div></div>}
                    <button 
                      onClick={() => setIsDateDropdownOpen(false)}
                      className="text-xs bg-brand-text hover:bg-brand-red text-white font-bold px-5 py-2 rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="h-8 w-px bg-gray-200 hidden sm:block mx-1"></div>
          
          {/* Status & Types */}
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none flex-grow sm:flex-grow-0"
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
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none flex-grow sm:flex-grow-0"
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
              <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
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
                    <p className="font-bold text-gray-900">{order.orderId}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">
                      {new Date(order.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                    <div className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
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
                    <p className="text-xl font-bold text-brand-red">₹{order.total}</p>
                    <div className="mt-2 flex flex-col items-center gap-1">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm ${
                        order.status === 'Pending' ? 'bg-red-50 text-red-600 border border-red-100' :
                        order.status === 'Preparing' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                        order.status === 'Ready' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                        'bg-green-50 text-green-600 border border-green-100'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 align-top text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2.5 rounded-xl transition-all text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                        title="View Full Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => cancelOrder(order.orderId)}
                        disabled={order.status !== 'Pending'}
                        className={`p-2.5 rounded-xl transition-all ${
                          order.status === 'Pending' 
                            ? 'text-gray-300 hover:text-red-500 hover:bg-red-50' 
                            : 'text-gray-100 cursor-not-allowed opacity-30'
                        }`}
                        title={order.status === 'Pending' ? "Cancel/Delete Order" : "Cannot cancel once preparation starts"}
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
      
      {/* View Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm px-4 py-10 overflow-y-auto">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-premium relative my-auto">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Info className="text-brand-red" /> Order Details
                </h2>
                <span className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">ID: {selectedOrder.orderId}</span>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Grid Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time</p>
                  <p className="font-bold text-sm text-gray-900">{new Date(selectedOrder.timestamp).toLocaleTimeString([], {timeStyle: 'short'})}</p>
                  <p className="text-[10px] font-medium text-gray-500">{new Date(selectedOrder.timestamp).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      selectedOrder.status === 'Ready' ? 'bg-blue-100 text-blue-700' :
                      selectedOrder.status === 'Preparing' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Payment</p>
                  <p className="font-bold text-sm text-gray-900 capitalize">{selectedOrder.paymentMethod || 'Cash'}</p>
                  <p className="text-[10px] font-medium text-gray-500 min-h-[14px] truncate">{selectedOrder.transactionNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Type</p>
                  <p className="font-bold text-sm text-brand-red uppercase">{selectedOrder.type}</p>
                  {selectedOrder.tableNumber && <p className="text-[10px] font-bold text-gray-500">Table: {selectedOrder.tableNumber}</p>}
                </div>
              </div>

              {/* Customer & Staff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Customer Info</h3>
                  <p className="font-bold text-gray-700">{selectedOrder.customerName}</p>
                  <p className="text-xs text-gray-500">{selectedOrder.phone}</p>
                  {selectedOrder.email && <p className="text-xs text-gray-500">{selectedOrder.email}</p>}
                  {selectedOrder.address && (
                    <div className="mt-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery Address</p>
                      <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-1">{selectedOrder.address} {selectedOrder.deliveryArea ? `(${selectedOrder.deliveryArea})` : ''}</p>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Staff Assigned</h3>
                   <div className="space-y-2">
                     <p className="text-sm">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-12 inline-block">Waiter:</span> 
                       <span className="font-bold text-gray-700">{selectedOrder.waiter || 'Unassigned'}</span>
                     </p>
                   </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Order Items</h3>
                <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.map((it: any, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-bold text-brand-red text-xs">
                          {it.quantity}x
                        </div>
                        <span className="font-bold text-sm text-gray-700">{it.name}</span>
                      </div>
                      <span className="font-bold text-gray-900">₹{parseFloat(it.price) * parseInt(it.quantity)}</span>
                    </div>
                  ))}
                  {selectedOrder.instructions && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                      <p className="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-1">Cooking Instructions</p>
                      <p className="text-sm text-red-900 italic">"{selectedOrder.instructions}"</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mt-4">
                   <span className="text-lg font-bold text-gray-900 uppercase tracking-tight">Total Bill</span>
                   <span className="text-2xl font-black text-brand-red">₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[2rem] flex justify-end">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="btn-primary py-3 px-8 text-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
