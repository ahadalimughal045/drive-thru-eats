'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, ArrowLeft, Info, HelpCircle } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form States
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dining'>('delivery');
  const [tablesList, setTablesList] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionNumber, setTransactionNumber] = useState('');

  useEffect(() => {
    fetch('/api/tables')
      .then(res => res.json())
      .then(data => setTablesList(data));
  }, []);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'DISCOUNT10') {
      setDiscount(10);
      alert('10% discount applied!');
    } else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  const discountAmount = Math.round(totalPrice * discount / 100);
  const finalPrice = totalPrice - discountAmount;

  const placeOrder = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      alert('Please enter your delivery address');
      return;
    }

    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customerName: name,
      email,
      phone,
      type: orderType,
      tableNumber: orderType === 'dining' ? selectedTable : '',
      deliveryArea,
      address: orderType === 'delivery' ? address : '',
      instructions,
      paymentMethod,
      transactionNumber,
      items: items,
      total: finalPrice,
      status: 'Pending',
      timestamp: new Date().toISOString()
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).then(res => {
      if (res.ok) {
        setOrderPlaced(true);
        clearCart();
      } else {
        alert('Failed to place order. Check database connection.');
      }
    });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-6 animate-bounce">🎉</div>
        <h1 className="text-3xl font-black text-[#212529] mb-3">Order Placed!</h1>
        <p className="text-[#6c757d] mb-2 font-medium">Thank you for your order. We'll prepare it right away!</p>
        <Link href="/" className="bg-[#F17228] hover:bg-orange-600 text-white font-bold px-8 py-3 rounded transition-all shadow-md mt-6">
          Order More Food
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={80} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-black text-[#212529] mb-3">Your cart is empty</h2>
        <Link href="/" className="bg-[#F17228] hover:bg-orange-600 text-white font-bold px-8 py-3 rounded transition-all flex items-center gap-2 shadow-md">
          <ArrowLeft size={18} /> Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">

        {!user && (
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[#212529] font-bold">
              <Info className="text-[#F17228]" />
              <p>Please login to place order easily and track your history.</p>
            </div>
            <Link href="/login" className="bg-[#F17228] hover:bg-orange-600 text-white font-bold px-6 py-2 rounded transition-all shadow-sm">
              Login to Order
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* LEFT: CHECKOUT FORM */}
          <div className="lg:col-span-2 bg-[#f4f4f4] rounded-xl p-6 shadow-sm border border-gray-100 placeholder-gray-400">

            {/* Delivery / Take Away / Dining Radio */}
            <div className="flex gap-16 mb-6 px-2">
              <label className="flex items-center gap-2 font-bold text-sm text-[#212529] cursor-pointer">
                <input
                  type="radio"
                  name="ordertype"
                  checked={orderType === 'delivery'}
                  onChange={() => setOrderType('delivery')}
                  className="w-4 h-4 accent-[#212529]"
                />
                Delivery
              </label>
              <label className="flex items-center gap-2 font-bold text-sm text-[#212529] cursor-pointer">
                <input
                  type="radio"
                  name="ordertype"
                  checked={orderType === 'pickup'}
                  onChange={() => setOrderType('pickup')}
                  className="w-4 h-4 accent-[#212529]"
                />
                Take Away
              </label>
              <label className="flex items-center gap-2 font-bold text-sm text-[#212529] cursor-pointer">
                <input
                  type="radio"
                  name="ordertype"
                  checked={orderType === 'dining'}
                  onChange={() => setOrderType('dining')}
                  className="w-4 h-4 accent-[#212529]"
                />
                Dining
              </label>
            </div>

            {orderType === 'dining' && (
              <div className="mb-6">
                <label className="text-sm font-bold text-[#212529] mb-1.5 block">Select Your Table</label>
                <select 
                  value={selectedTable} 
                  onChange={e => setSelectedTable(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228] font-bold"
                >
                  <option value="">-- Choose Table Number --</option>
                  {tablesList.map(t => (
                    <option key={t.id} value={t.number}>Table {t.number} ({t.seats} Persons)</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-[#6c757d] mb-1.5 block">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="umnar" className="w-full bg-white border border-gray-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228]" />
              </div>
              <div>
                <label className="text-sm text-[#6c757d] mb-1.5 block">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="umar@gmail.com" className="w-full bg-white border border-gray-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228]" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-[#6c757d] mb-1.5 block">Delivery Area</label>
                <input type="text" value={deliveryArea} onChange={e => setDeliveryArea(e.target.value)} placeholder="By Pass Handwara" className="w-full bg-white border border-gray-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228]" />
              </div>
              <div>
                <label className="text-sm text-[#6c757d] mb-1.5 block">Mobile Number</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="03202287330" className="w-full bg-white border border-gray-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228]" />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-[#6c757d] mb-1.5 block">Delivery Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Shahi bazar" className="w-full bg-white border border-gray-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228]" />
            </div>

            <div className="mb-6">
              <label className="text-sm text-[#6c757d] mb-1.5 block">Any Instructions</label>
              <input type="text" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Any Instructions" className="w-full bg-white border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228] shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="text-sm text-[#6c757d] mb-1.5 flex items-center gap-1">
                Coupon Code# <span className="font-bold text-[#212529] bg-white border border-gray-300 text-[10px] px-1 py-0.5 rounded shadow-sm flex items-center"><span className="text-[#F17228] mr-1">!</span> Please fill in this field.</span> (Apply Coupon Code After Quentity)
              </label>
              <div className="flex gap-2 relative z-0">
                <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter Coupon Code" className="flex-1 bg-white border border-gray-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228]" />
                <button type="button" onClick={applyCoupon} className="bg-[#F17228] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-md text-sm transition-colors min-w-[120px]">
                  Apply Code
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-[#6c757d] mb-1.5 block">Payment Method | <span className="font-bold text-[#212529] cursor-pointer hover:underline">Copy Account Number</span></label>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full bg-white border border-gray-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228] text-gray-400">
                <option value="" disabled>Select Payment Method</option>
                <option value="cash">Cash on Delivery</option>
                <option value="bank">Bank Transfer</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#6c757d] mb-1.5 block">Transaction Number (After Order place you also upload a transaction screenshot)</label>
              <input type="text" value={transactionNumber} onChange={e => setTransactionNumber(e.target.value)} placeholder="Transaction Number" className="w-full bg-white border border-gray-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-[#F17228]" />
            </div>

          </div>


          {/* RIGHT: CART ITEMS & SUMMARY */}
          <div className="bg-[#f4f4f4] rounded-xl p-5 shadow-sm border border-gray-100">

            <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full object-cover bg-white p-1 border border-gray-200 shadow-sm" />
                  <div className="flex-1">
                    <h4 className="font-extrabold text-[#212529] text-xs uppercase mb-1">{item.quantity} X {item.name}</h4>
                    <span className="font-bold text-sm text-[#212529]">₹{item.price}</span>
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-[#F17228] hover:bg-orange-600 text-white flex items-center justify-center rounded-sm transition-colors text-lg leading-none"
                      >
                        +
                      </button>
                      <span className="font-bold text-sm bg-white border border-gray-200 w-8 h-6 flex items-center justify-center rounded-sm text-[#212529]">{item.quantity}</span>
                      <button
                        onClick={() => {
                          if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                          else removeFromCart(item.id);
                        }}
                        className="w-6 h-6 bg-[#F17228] hover:bg-orange-600 text-white flex items-center justify-center rounded-sm transition-colors text-lg leading-none"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-200 mb-4" />

            <div className="space-y-1.5 text-sm font-black text-[#212529]">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>₹{discountAmount}</span>
              </div>
              <div className="flex justify-between text-base pt-1">
                <span>Grand Total:</span>
                <span>₹{finalPrice}</span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Link href="/" className="block w-full text-center bg-[#F17228] hover:bg-orange-600 text-white font-bold py-2.5 rounded-md transition-colors text-sm shadow-sm">
                Add More Item
              </Link>
              <button
                onClick={placeOrder}
                className="block w-full text-center bg-[#F17228] hover:bg-orange-600 text-white font-bold py-2.5 rounded-md transition-colors text-sm shadow-sm opacity-90 hover:opacity-100"
              >
                Place Order
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
