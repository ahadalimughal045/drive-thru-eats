'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Calendar, Clock, Phone, User, CheckCircle2, X } from 'lucide-react';
import { tables, Table } from '@/data/tables';
import { useReservation, Reservation } from '@/components/ReservationContext';

export default function DiningPage() {
  const { reservations, addReservation, cancelReservation } = useReservation();
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00 PM');
  const [guests, setGuests] = useState('2');
  
  const [toast, setToast] = useState('');
  const [tablesList, setTablesList] = useState<Table[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('dte_tables');
    if (stored) {
      setTablesList(JSON.parse(stored));
    } else {
      setTablesList(tables);
      localStorage.setItem('dte_tables', JSON.stringify(tables));
    }
  }, []);

  // Get current status of tables (simulate booked if there's a reservation for the selected date/time)
  // For simplicity, table is booked if it's in reservations list at all (or you can filter by date)
  // In a real app, it would be by Date + Time
  
  // To keep it simple, if a table is reserved *at all*, mark it as booked for the map today.
  const isTableBooked = (tableId: string) => {
    return reservations.some(r => r.tableId === tableId);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      alert('Please select a table from the map first');
      return;
    }
    if (!name || !phone || !date) {
      alert('Please fill out all fields');
      return;
    }

    const newRes: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      tableId: selectedTable.id,
      name,
      phone,
      date,
      time,
      guests: parseInt(guests)
    };

    addReservation(newRes);
    setToast('Table booked successfully!');
    setSelectedTable(null);
    setName('');
    setPhone('');
    setDate('');
    
    setTimeout(() => setToast(''), 3000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-brand-bg py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="text-brand-muted hover:text-brand-text transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-black text-brand-text" style={{ fontFamily: 'Georgia, serif' }}>
            Book a Table
          </h1>
        </div>

        {toast && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-bold flex items-center gap-2 animate-slide-up z-50">
            <CheckCircle2 size={20} /> {toast}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content: Table Map & Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Section 1: Visual Table Map */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-brand-text">1. Select a Table</h2>
              
              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-100 border border-green-500"></div> <span className="text-brand-muted">Available</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-100 border border-red-500"></div> <span className="text-brand-muted">Booked</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-orange-100 border border-orange-500"></div> <span className="text-brand-muted">VIP</span></div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 bg-brand-bg p-6 rounded-xl border border-brand-border">
                {tablesList.map(table => {
                  const booked = isTableBooked(table.id);
                  const isSelected = selectedTable?.id === table.id;
                  
                  let bgClass = "bg-green-50 hover:bg-green-100 border-green-200 text-green-800";
                  if (booked) bgClass = "bg-red-50 border-red-200 text-red-400 cursor-not-allowed opacity-60";
                  else if (table.type === 'vip') bgClass = "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-800";
                  
                  if (isSelected) bgClass = "bg-brand-red text-white border-brand-red shadow-md scale-105";

                  return (
                    <button
                      key={table.id}
                      disabled={booked}
                      onClick={() => setSelectedTable(table)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all h-24 ${bgClass}`}
                    >
                      <span className="font-black text-lg mb-1">T{table.number}</span>
                      <div className="flex items-center gap-1 text-xs opacity-80 font-semibold">
                        <Users size={12} /> {table.seats}
                      </div>
                      {table.type !== 'regular' && (
                        <span className="absolute top-1 right-1 text-[9px] font-bold uppercase tracking-wider opacity-70">
                          {table.type}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Booking Form */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-brand-text">2. Reservation Details</h2>
              <form onSubmit={handleBooking} className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2 bg-brand-bg border border-brand-border rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-brand-muted font-bold">Selected Table</p>
                    {selectedTable ? (
                      <p className="text-brand-text font-black text-lg">Table {selectedTable.number} ({selectedTable.seats} Seats, {selectedTable.type})</p>
                    ) : (
                      <p className="text-brand-orange text-sm mt-1">Please select a table from the map</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-brand-text font-semibold text-sm block mb-1">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                    <input type="text" required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-3 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-red text-sm" placeholder="John Doe" />
                  </div>
                </div>

                <div>
                  <label className="text-brand-text font-semibold text-sm block mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                    <input type="tel" required value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-3 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-red text-sm" placeholder="(123) 456-7890" />
                  </div>
                </div>

                <div>
                  <label className="text-brand-text font-semibold text-sm block mb-1">Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                    <input type="date" required min={today} value={date} onChange={e=>setDate(e.target.value)} className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-3 text-brand-text focus:outline-none focus:border-brand-red text-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-brand-text font-semibold text-sm block mb-1">Time</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                    <select value={time} onChange={e=>setTime(e.target.value)} className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-3 text-brand-text focus:outline-none focus:border-brand-red text-sm appearance-none">
                      {['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-brand-text font-semibold text-sm block mb-1">Guests</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                    <select value={guests} onChange={e=>setGuests(e.target.value)} className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-3 text-brand-text focus:outline-none focus:border-brand-red text-sm appearance-none">
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <option key={n} value={n}>{n} People</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="sm:col-span-2 pt-2">
                  <button type="submit" disabled={!selectedTable} className={`w-full font-bold py-3.5 rounded-xl transition-all text-white ${!selectedTable ? 'bg-gray-300 cursor-not-allowed' : 'bg-brand-red hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98]'}`}>
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Section 3: My Reservations */}
          <div className="lg:col-span-1">
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-brand-text flex items-center justify-between">
                My Reservations
                <span className="bg-brand-bg text-brand-orange text-xs px-2 py-1 rounded-md">{reservations.length}</span>
              </h2>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {reservations.length === 0 ? (
                  <div className="text-center py-8 text-brand-muted">
                    <Calendar size={48} className="mx-auto mb-3 opacity-20" />
                    <p>No reservations yet.</p>
                  </div>
                ) : (
                  reservations.map(res => (
                    <div key={res.id} className="bg-brand-bg border border-brand-border rounded-xl p-4 relative group">
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button 
                          onClick={() => {
                            const table = tablesList.find(t => t.id === res.tableId);
                            const content = `
      ================================
            DRIVE THRU EATS
      ================================
      CUSTOMER RESERVATION RECEIPT
      
      Customer Name : ${res.name}
      Phone Number  : ${res.phone}
      --------------------------------
      Table Booked  : ${table?.number} (${table?.type.toUpperCase()})
      Date          : ${res.date}
      Time          : ${res.time}
      Guests        : ${res.guests} Persons
      Reservation ID: ${res.id.toUpperCase()}
      ================================
      Please present this at the counter.
      Valid for 2 Hours. Thank you!
      ================================`;
                            const iframe = document.createElement('iframe');
                            iframe.style.display = 'none';
                            document.body.appendChild(iframe);
                            iframe.contentDocument?.write(`<pre style="font-family: monospace; font-size: 14px;">${content}</pre>`);
                            iframe.contentDocument?.close();
                            iframe.contentWindow?.focus();
                            iframe.contentWindow?.print();
                            setTimeout(() => document.body.removeChild(iframe), 1000);
                          }}
                          className="bg-brand-red text-white p-1 rounded hover:bg-red-700 transition-colors"
                          title="Print Receipt"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect width="12" height="8" x="6" y="14"></rect></svg>
                        </button>
                        <button 
                          onClick={() => cancelReservation(res.id)}
                          className="bg-gray-200 text-gray-600 p-1 rounded hover:bg-red-100 hover:text-red-500 transition-colors"
                          title="Cancel Reservation"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <h3 className="font-bold text-brand-text mb-1 flex items-center gap-2">
                        <span>Table {tablesList.find(t => t.id === res.tableId)?.number}</span>
                      </h3>
                      <div className="text-sm text-brand-muted space-y-1">
                        <p className="flex items-center gap-2"><Calendar size={14} /> {res.date} at {res.time}</p>
                        <p className="flex items-center gap-2"><Users size={14} /> {res.guests} Guests</p>
                        <p className="flex items-center gap-2"><User size={14} /> {res.name}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
