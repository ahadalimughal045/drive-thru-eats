'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Calendar,
  FileSpreadsheet,
  CheckCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  Phone,
  AlertCircle
} from 'lucide-react';

export default function CreditReportsPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const queryParams = new URLSearchParams({
        search,
        status,
        startDate,
        endDate,
        page: page.toString(),
        limit: limit.toString(),
      });
      const res = await fetch(`/api/admin/credit-reports?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to fetch credit reports');
      }
      const data = await res.json();
      setOrders(data.orders || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong while fetching reports.');
    } finally {
      setIsLoading(false);
    }
  }, [search, status, startDate, endDate, page, limit]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Reset page when search or filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleClearCredit = async (orderId: string) => {
    if (!confirm('Are you sure you want to mark this credit order as cleared?')) return;
    try {
      const res = await fetch(`/api/admin/credit-reports/${orderId}/clear`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to clear credit');
      fetchReports();
    } catch (err: any) {
      alert(err.message || 'Error clearing credit');
    }
  };

  const handleDeleteCredit = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this credit record? (It will be removed from this view but will remain in main reports)')) return;
    try {
      const res = await fetch(`/api/admin/credit-reports/${orderId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete credit record');
      fetchReports();
    } catch (err: any) {
      alert(err.message || 'Error deleting credit record');
    }
  };

  const handleExportCredit = (orderId: string) => {
    window.open(`/api/admin/export/credit/${orderId}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-[#212529]">Credit Reports</h1>
          <p className="text-[#6c757d] font-medium mt-1">Monitor, clear, and export customer credit logs.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Search Box */}
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search Customer/Company/Phone..."
              value={search}
              onChange={handleSearchChange}
              className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-red outline-none w-full sm:w-64"
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
                        onChange={e => { setStartDate(e.target.value); setPage(1); }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm outline-none text-gray-700 font-bold focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">To Date</label>
                      <input 
                        type="date" 
                        value={endDate}
                        onChange={e => { setEndDate(e.target.value); setPage(1); }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm outline-none text-gray-700 font-bold focus:border-brand-red"
                      />
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    {(startDate || endDate) ? (
                      <button 
                        onClick={() => { setStartDate(''); setEndDate(''); setPage(1); setIsDateDropdownOpen(false); }}
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

          {/* Status Filter */}
          <select 
            value={status} 
            onChange={handleStatusChange}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none flex-grow sm:flex-grow-0"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Cleared">Cleared</option>
          </select>
        </div>

        <div className="text-sm font-bold text-gray-500">
          Total Credit Records: <span className="text-[#212529] font-black">{total}</span>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center gap-3">
          <AlertCircle size={20} />
          <span className="font-semibold">{errorMsg}</span>
        </div>
      )}

      {/* Credit Table Card */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                <th className="p-6">Order Info</th>
                <th className="p-6">Customer Info</th>
                <th className="p-6">Items & Amount</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-gray-400 font-bold">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading credit reports...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-gray-400 font-bold">
                    No credit records found matching your filters.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50/50 transition-colors">
                    {/* Order Info */}
                    <td className="p-6 align-top">
                      <p className="font-bold text-gray-900">{order.orderId}</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">
                        {order.order_date} at {order.order_time}
                      </p>
                      <span className="mt-2 inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-100">
                        {order.type || 'dining'}
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="p-6 align-top">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <User size={14} className="text-gray-400" />
                          <span>{order.credit_customer_name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                          <Building2 size={14} className="text-gray-400" />
                          <span>{order.credit_company_name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                          <Phone size={14} className="text-gray-400" />
                          <span>{order.credit_phone || 'N/A'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Items & Amount */}
                    <td className="p-6 align-top">
                      <div className="max-w-[220px] mb-2 space-y-0.5 max-h-[80px] overflow-y-auto pr-1">
                        {(Array.isArray(order.items) ? order.items : []).map((it: any, i: number) => (
                          <div key={i} className="text-xs font-bold text-gray-600">
                            {it.quantity}x {it.name}
                          </div>
                        ))}
                      </div>
                      <p className="text-lg font-black text-brand-red">₹{order.total}</p>
                    </td>

                    {/* Status */}
                    <td className="p-6 align-top text-center">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm border ${
                        order.credit_status === 'cleared'
                          ? 'bg-green-50 text-green-600 border-green-100'
                          : 'bg-red-50 text-red-600 border-red-100 animate-pulse'
                      }`}>
                        {order.credit_status || 'pending'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-6 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.credit_status !== 'cleared' && (
                          <button
                            onClick={() => handleClearCredit(order.orderId)}
                            title="Mark as Cleared"
                            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-3 py-2 rounded-xl transition-all shadow-sm"
                          >
                            <CheckCircle size={14} /> Clear
                          </button>
                        )}
                        <button
                          onClick={() => handleExportCredit(order.orderId)}
                          title="Export History"
                          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-3 py-2 rounded-xl transition-all shadow-sm"
                        >
                          <FileSpreadsheet size={14} /> Export
                        </button>
                        <button
                          onClick={() => handleDeleteCredit(order.orderId)}
                          title="Delete Record"
                          className="flex items-center justify-center bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-500 p-2.5 rounded-xl transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <div className="text-xs font-semibold text-gray-500">
              Showing Page <span className="text-[#212529] font-bold">{page}</span> of <span className="text-[#212529] font-bold">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
