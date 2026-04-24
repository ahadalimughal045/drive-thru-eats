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

  const activeOrders = (Array.isArray(orders) ? orders : []).filter(o => o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Ready');

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-body text-brand-text mb-2">Kitchen Monitoring <span className="text-brand-red">(View Only)</span></h1>
          <p className="text-brand-muted font-medium">Real-time oversight of kitchen activities.</p>
        </div>
        <div className="bg-brand-red/10 text-brand-red px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span> Tracking Live
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 flex-1 items-start">
        {/* Pending Column */}
        <div className="bg-gray-100 rounded-2xl p-4 flex flex-col gap-4 min-h-[500px]">
          <h2 className="font-bold font-body text-gray-700 flex items-center gap-2 text-lg px-2"><Clock className="text-brand-red" size={20} /> Incoming ({activeOrders.filter(o => o.status === 'Pending').length})</h2>
          {activeOrders.filter(o => o.status === 'Pending').map(order => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-brand-red">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold font-body text-[#212529]">{order.orderId}</span>
                <span className="text-[10px] bg-red-50 px-2 py-1 rounded font-bold text-red-600 truncate uppercase tracking-widest border border-red-100">Pending</span>
              </div>
              <div className="text-sm font-bold text-gray-600 mb-2 truncate">Customer: {order.customerName}</div>
              <ul className="space-y-2">
                {(Array.isArray(order.items) ? order.items : []).filter((it: any) => 
                  !it.category?.toLowerCase().includes('beverage') && 
                  !it.category?.toLowerCase().includes('drink')
                ).map((item: any, i: number) => (
                  <li key={i} className="flex justify-between text-sm font-medium">
                    <span><span className="text-brand-red font-bold">{item.quantity}x</span> {item.name}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-gray-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Waiting for Chef to start...</p>
              </div>
            </div>
          ))}
        </div>

        {/* Preparing Column */}
        <div className="bg-brand-orange/5 rounded-2xl p-4 flex flex-col gap-4 min-h-[500px]">
          <h2 className="font-bold font-body text-brand-orange flex items-center gap-2 text-lg px-2"><ChefHat size={20} /> In Preparation ({activeOrders.filter(o => o.status === 'Preparing').length})</h2>
          {activeOrders.filter(o => o.status === 'Preparing').map(order => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-brand-orange">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-[#212529]">{order.orderId}</span>
                <span className="text-[10px] bg-orange-50 px-2 py-1 rounded font-bold text-orange-600 animate-pulse border border-orange-100">Cooking...</span>
              </div>
              <div className="text-sm font-bold text-gray-600 mb-2">Customer: {order.customerName}</div>
              <ul className="space-y-2">
                {(Array.isArray(order.items) ? order.items : []).filter((it: any) => 
                  !it.category?.toLowerCase().includes('beverage') && 
                  !it.category?.toLowerCase().includes('drink')
                ).map((item: any, i: number) => (
                  <li key={i} className="flex justify-between text-sm font-medium">
                    <span><span className="text-brand-orange font-bold">{item.quantity}x</span> {item.name}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <UserCircle size={16} />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Assigned To</p>
                   <p className="text-xs font-bold text-brand-orange">{order.chef || 'Main Chef'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ready Column */}
        <div className="bg-green-50 rounded-2xl p-4 flex flex-col gap-4 min-h-[500px]">
          <h2 className="font-bold font-body text-green-600 flex items-center gap-2 text-lg px-2"><Package size={20} /> Ready ({activeOrders.filter(o => o.status === 'Ready').length})</h2>
          {activeOrders.filter(o => o.status === 'Ready').map(order => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-[#212529]">{order.orderId}</span>
                <span className="text-[10px] bg-green-50 px-2 py-1 rounded font-bold text-green-700 border border-green-100 uppercase tracking-widest">Done</span>
              </div>
              <div className="text-sm font-bold text-gray-600 mb-2 truncate">
                Customer: {order.customerName}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Waiting for delivery/service...</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
