import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import FeatureDisabled from './components/FeatureDisabled';
import LoadingState from './components/LoadingState';

function App() {
  const flags = useFlags();
  const ldClient = useLDClient();
  const [isReady, setIsReady] = useState(false);
  const [kuotaFlag, setKuotaFlag] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    no_hp: '',
    kuota: '10GB'
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (ldClient) {
      ldClient.waitForInitialization().then(() => setIsReady(true));

      const handleChange = () => {
        const updatedFlags = ldClient.allFlags();
        setKuotaFlag(updatedFlags['fe-kouta-internet']);
      };

      ldClient.on('change:fe-kouta-internet', handleChange);
      handleChange();

      return () => ldClient.off('change:fe-kouta-internet', handleChange);
    }
  }, [ldClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://54.179.244.21:4000/api/postQuota', formData);
      console.log(response.data);
      setSubmitSuccess(true);
      setFormData({ nama: '', email: '', no_hp: '', kuota: '10GB' });
    } catch (error) {
      console.error("Error submit:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6">
      <Header />
      {!isReady ? <LoadingState /> : kuotaFlag ? (
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Form Pembelian Kuota</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Nama Lengkap" className="w-full p-3 border rounded"
              value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} required />

            <input type="email" placeholder="Email" className="w-full p-3 border rounded"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />

            <input type="text" placeholder="No HP" className="w-full p-3 border rounded"
              value={formData.no_hp} onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })} required />

            <select className="w-full p-3 border rounded"
              value={formData.kuota} onChange={(e) => setFormData({ ...formData, kuota: e.target.value })}>
              <option value="10GB">10GB</option>
              <option value="20GB">20GB</option>
              <option value="30GB">30GB</option>
              <option value="40GB">40GB</option>
              <option value="50GB">50GB</option>
            </select>

            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">Beli Sekarang</button>
          </form>

          {submitSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
              Pembelian kuota berhasil!
            </div>
          )}
        </div>
      ) : <FeatureDisabled />}
    </div>
  );
}

export default App;
