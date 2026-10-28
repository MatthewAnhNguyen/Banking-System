import { useEffect, useState } from "react";
import { getBeneficiaries } from "../services/beneficiary.service";
import type { Beneficiary } from "../types/beneficiary";

export default function useBeneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBeneficiaries = async () => {
    try {
      const data = await getBeneficiaries();
      setBeneficiaries(data);
    } catch (error) {
      console.error(error);
      setBeneficiaries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

return {
    beneficiaries,
    loading,
    refresh: fetchBeneficiaries,
};
}