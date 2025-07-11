import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function FormPembelian() {
  const { kuota } = useParams();
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    no_hp: '',
    kuota: kuota
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://13.229.82.178:4000/api/postQuota', formData);
      setSubmitSuccess(true);
      setFormData({ nama: '', email: '', no_hp: '', kuota: kuota });
    } catch (error) {
      console.error("Error submit:", error);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow mt-4">
      <h2 className="text-2xl font-semibold mb-4">Form Pembelian Kuota {kuota}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nama Lengkap" className="w-full p-3 border rounded"
          value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} required />
        <input type="email" placeholder="Email" className="w-full p-3 border rounded"
          value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="text" placeholder="No HP" className="w-full p-3 border rounded"
          value={formData.no_hp} onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })} required />
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
          Beli Sekarang
        </button>
      </form>

      {submitSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
          Pembelian kuota berhasil!
        </div>
      )}
    </div>
  );
}

export default FormPembelian;
