'use client';
import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, ChefHat, Package, UserCircle } from 'lucide-react';

export default function KitchenPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const loadData = async () => {
    // Audio Notification Sound (Royalty Free Bell)
    const notificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

    try {
      const ordRes = await fetch('/api/orders');
      const ordData = await ordRes.json();
      
      if (Array.isArray(ordData) && ordData.length > 0) {
        const latestId = ordData[0].id;
        if (lastOrderId && latestId !== lastOrderId) {
          notificationSound.play().catch(e => console.log('Audio blocked:', e));
        }
        setLastOrderId(latestId);
      }
      setOrders(ordData);

      const stfRes = await fetch('/api/staff');
      const stfData = await stfRes.json();
      setStaff(stfData);
    } catch (e) {
      console.error("Fetch error", e);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000); 
    return () => clearInterval(interval);
  }, [lastOrderId]);

  const updateOrder = (id: string, updates: any) => {
    fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates })
    }).then(() => loadData());
  };

  const activeOrders = (Array.isArray(orders) ? orders : []).filter(o => o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Ready');

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-body text-brand-text mb-2">Kitchen Display System (KDS)</h1>
          <p className="text-brand-muted font-medium">Real-time order tracking and preparation.</p>
        </div>
        <div className="bg-brand-red/10 text-brand-red px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span> Live
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 flex-1 items-start">
        {/* Pending Column */}
        <div className="bg-gray-100 rounded-2xl p-4 flex flex-col gap-4 min-h-[500px]">
          <h2 className="font-bold font-body text-gray-700 flex items-center gap-2 text-lg px-2"><Clock className="text-brand-red" size={20} /> Pending ({activeOrders.filter(o => o.status === 'Pending').length})</h2>
          {activeOrders.filter(o => o.status === 'Pending').map(order => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-brand-red">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold font-body text-[#212529]">{order.orderId}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded font-bold text-gray-600 truncate max-w-[80px]">{order.type}</span>
              </div>
              <div className="text-sm font-bold text-gray-600 mb-2 truncate">Customer: {order.customerName}</div>
              <ul className="space-y-2 mb-4">
                {(Array.isArray(order.items) ? order.items : []).filter((it: any) => 
                  !it.category?.toLowerCase().includes('beverage') && 
                  !it.category?.toLowerCase().includes('drink') &&
                  !it.category?.toLowerCase().includes('soft') &&
                  !it.category?.toLowerCase().includes('cola') &&
                  !it.category?.toLowerCase().includes('readymade') &&
                  !it.category?.toLowerCase().includes('snack')
                ).map((item: any, i: number) => (
                  <li key={i} className="flex justify-between text-sm font-medium">
                    <span><span className="text-brand-red font-bold">{item.quantity}x</span> {item.name}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-500 mb-1 block">Assign Kitchen Staff:</label>
                <select
                  className="w-full text-sm border border-gray-200 rounded p-1.5 mb-2 bg-gray-50 font-bold text-[#212529]"
                  onChange={(e) => {
                    const assigned = e.target.value;
                    if (assigned) {
                      updateOrder(order.orderId, { status: 'Preparing', chef: assigned });
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Select chef to start...</option>
                  {(Array.isArray(staff) ? staff : []).filter(s => s.role === 'Kitchen Staff').map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.sid})</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Preparing Column */}
        <div className="bg-brand-orange/5 rounded-2xl p-4 flex flex-col gap-4 min-h-[500px]">
          <h2 className="font-bold font-body text-brand-orange flex items-center gap-2 text-lg px-2"><ChefHat size={20} /> Preparing ({activeOrders.filter(o => o.status === 'Preparing').length})</h2>
          {activeOrders.filter(o => o.status === 'Preparing').map(order => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-brand-orange">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-[#212529]">{order.orderId}</span>
                <span className="text-xs bg-orange-100 px-2 py-1 rounded font-bold text-orange-600 animate-pulse">Cooking...</span>
              </div>
              <div className="text-sm font-bold text-gray-600 mb-2">Customer: {order.customerName}</div>
              <ul className="space-y-2 mb-4">
                {(Array.isArray(order.items) ? order.items : []).filter((it: any) => 
                  !it.category?.toLowerCase().includes('beverage') && 
                  !it.category?.toLowerCase().includes('drink') &&
                  !it.category?.toLowerCase().includes('soft') &&
                  !it.category?.toLowerCase().includes('cola') &&
                  !it.category?.toLowerCase().includes('readymade') &&
                  !it.category?.toLowerCase().includes('snack')
                ).map((item: any, i: number) => (
                  <li key={i} className="flex justify-between text-sm font-medium">
                    <span><span className="text-brand-orange font-bold">{item.quantity}x</span> {item.name}</span>
                  </li>
                ))}
              </ul>
              {order.chef && (
                <div className="text-xs font-bold text-brand-orange bg-orange-50 p-2 rounded mb-3 flex items-center gap-1">
                  <ChefHat size={14} /> Chef: {order.chef}
                </div>
              )}
              <button
                onClick={() => updateOrder(order.orderId, { status: 'Ready' })}
                className="w-full bg-brand-orange text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Mark as Ready
              </button>
            </div>
          ))}
        </div>

        {/* Ready Column */}
        <div className="bg-green-50 rounded-2xl p-4 flex flex-col gap-4 min-h-[500px]">
          <h2 className="font-bold font-body text-green-600 flex items-center gap-2 text-lg px-2"><Package size={20} /> Ready for Pickup/Delivery ({activeOrders.filter(o => o.status === 'Ready').length})</h2>
          {activeOrders.filter(o => o.status === 'Ready').map(order => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-[#212529]">{order.orderId}</span>
                <span className="text-xs bg-green-100 px-2 py-1 rounded font-bold text-green-700">
                   {order.type === 'dining' ? `Dining - Table ${order.tableNumber}` : order.type ? order.type.toUpperCase() : "N/A"}
                </span>
              </div>
              <div className="text-sm font-bold text-gray-600 mb-2 truncate">
                Customer: {order.customerName} <br />
                {order.type === 'delivery' ? `Deliver to: ${order.address}` : order.type === 'dining' ? `Dining: Table ${order.tableNumber}` : 'Pickup'}
              </div>

              {(order.type === 'dining' || order.type === 'pickup') && !order.waiter && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-500 mb-1 block">
                    {order.type === 'dining' ? 'Assign Waiter to Serve:' : 'Assign Counter Staff:'}
                  </label>
                  <select 
                    className="w-full text-sm border border-gray-200 rounded p-1.5 mb-2 bg-gray-50 font-bold text-[#212529]"
                    onChange={(e) => {
                      const assigned = e.target.value;
                      if(assigned) {
                        updateOrder(order.orderId, { waiter: assigned });
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select staff...</option>
                    {(Array.isArray(staff) ? staff : []).filter(s => 
                      order.type === 'dining' 
                        ? (s.role === 'Waiter' || s.role === 'Manager')
                        : (s.role === 'Counter Staff' || s.role === 'Manager')
                    ).map(s => (
                      <option key={s.id} value={s.name}>{s.name} ({s.sid})</option>
                    ))}
                  </select>
                </div>
              )}

              {order.waiter && (
                <div className="text-xs font-bold text-blue-600 bg-blue-50 p-2 rounded mb-3 flex items-center gap-1">
                  <UserCircle size={14}/> 
                  {order.type === 'dining' ? 'Server: ' : 'Handover By: '} {order.waiter}
                </div>
              )}

              <button
                onClick={() => updateOrder(order.orderId, { status: 'Delivered' })}
                className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition mt-2"
              >
                {order.type === 'dining' ? 'Mark as Served' : order.type === 'pickup' ? 'Mark Handover' : 'Complete Order'}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
