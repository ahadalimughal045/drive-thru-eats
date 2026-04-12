'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    taste: '',
    cleanliness: '',
    facilities: '',
    packing: '',
    speed: '',
    comments: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      alert('Please fill your name.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-6">🙏</div>
        <h1 className="text-3xl font-black text-brand-text mb-3" style={{ fontFamily: 'Georgia, serif' }}>Thank You!</h1>
        <p className="text-brand-muted mb-8 font-medium">Your feedback has been recorded successfully.</p>
        <Link href="/" className="bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-3 rounded transition-all shadow-md">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-surface py-12">
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-[#f4f4f4] rounded-2xl p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl font-bold text-[#212529] mb-8 text-center">Feedback</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[#6c757d] text-sm block mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#dee2e6] rounded-lg px-4 py-3 text-[#212529] placeholder-[#dee2e6] focus:outline-none focus:border-brand-red text-sm transition-colors"
                />
              </div>

              <div>
                <label className="text-[#6c757d] text-sm block mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#dee2e6] rounded-lg px-4 py-3 text-[#212529] placeholder-[#dee2e6] focus:outline-none focus:border-brand-red text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[#6c757d] text-sm block mb-2">How was the food in taste ?</label>
              <input
                type="text"
                name="taste"
                placeholder="Delivery Address"
                value={formData.taste}
                onChange={handleChange}
                className="w-full bg-white border border-[#dee2e6] rounded-lg px-4 py-3 text-[#212529] placeholder-[#dee2e6] focus:outline-none focus:border-brand-red text-sm transition-colors"
              />
            </div>

            <div>
              <label className="text-[#6c757d] text-sm block mb-2">How was the cleanliness in terms of food and utensils served in ?</label>
              <input
                type="text"
                name="cleanliness"
                placeholder="Delivery Address"
                value={formData.cleanliness}
                onChange={handleChange}
                className="w-full bg-white border border-[#dee2e6] rounded-lg px-4 py-3 text-[#212529] placeholder-[#dee2e6] focus:outline-none focus:border-brand-red text-sm transition-colors"
              />
            </div>

            <div>
              <label className="text-[#6c757d] text-sm block mb-2">How were the facilities at our Sitting place ?</label>
              <input
                type="text"
                name="facilities"
                placeholder="Delivery Address"
                value={formData.facilities}
                onChange={handleChange}
                className="w-full bg-white border border-[#dee2e6] rounded-lg px-4 py-3 text-[#212529] placeholder-[#dee2e6] focus:outline-none focus:border-brand-red text-sm transition-colors"
              />
            </div>

            <div>
              <label className="text-[#6c757d] text-sm block mb-2">How was our paking on delivery ?</label>
              <input
                type="text"
                name="packing"
                placeholder="Delivery Address"
                value={formData.packing}
                onChange={handleChange}
                className="w-full bg-white border border-[#dee2e6] rounded-lg px-4 py-3 text-[#212529] placeholder-[#dee2e6] focus:outline-none focus:border-brand-red text-sm transition-colors"
              />
            </div>

            <div>
              <label className="text-[#6c757d] text-sm block mb-2">How fast did we deliver ?</label>
              <input
                type="text"
                name="speed"
                placeholder="Delivery Address"
                value={formData.speed}
                onChange={handleChange}
                className="w-full bg-white border border-[#dee2e6] rounded-lg px-4 py-3 text-[#212529] placeholder-[#dee2e6] focus:outline-none focus:border-brand-red text-sm transition-colors"
              />
            </div>

            <div>
              <label className="text-[#6c757d] text-sm block mb-2">Comments for us to improve our services.</label>
              <input
                type="text"
                name="comments"
                placeholder="Any Instructions"
                value={formData.comments}
                onChange={handleChange}
                className="w-full bg-white border border-[#dee2e6] rounded-lg px-4 py-3 text-[#212529] placeholder-[#dee2e6] focus:outline-none focus:border-brand-red text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
