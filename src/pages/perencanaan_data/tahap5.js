import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/navigationbar";
import TextInput from "../../components/input";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/tabs";
import SearchBox from "../../components/searchbox";
import Button from "../../components/button";

const Tahap4 = ({ onNext, onBack }) => {
  const [commonInformation, setCommonInformation] = useState({
    kode_rup: "",
    nama_balai: "",
    nama_paket: "",
    nama_ppk: "",
    jabatan_ppk: "",
  });

  const [dataMaterial, setDataMaterial] = useState([]);
  const [dataPeralatan, setDataPeralatan] = useState([]);
  const [dataTenagaKerja, setDataTenagaKerja] = useState([]);

  // State tambahan untuk pagination dan pencarian
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Ubah sesuai kebutuhan
  const [searchQueryMaterial, setSearchQueryMaterial] = useState("");
  const [searchQueryPeralatan, setSearchQueryPeralatan] = useState("");
  const [searchQueryTenagaKerja, setSearchQueryTenagaKerja] = useState("");

  const handleSearchMaterial = (query) => {
    setSearchQueryMaterial(query);
    setCurrentPage(1);
  };

  const fetchCommonInformation = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api-ecatalogue-staging.online/api/perencanaan-data/perencanaan-data-result/?id=1"
      );
      const data = await response.json();
      const { informasiUmum, material, peralatan, tenagaKerja } =
        data.data || {};

      setCommonInformation(
        informasiUmum || {
          kode_rup: "",
          nama_balai: "",
          nama_paket: "",
          nama_ppk: "",
          jabatan_ppk: "",
        }
      );

      setDataMaterial(material || []);
      setDataPeralatan(peralatan || []);
      setDataTenagaKerja(tenagaKerja || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchCommonInformation();
  }, [fetchCommonInformation]);

  // Fungsi pencarian dan pengolahan data lainnya tetap sama
  // ...

  return (
    <div className="space-y-3">
      <h4 className="text-H4 text-emphasis-on_surface-high">
        Perancangan Kuesioner
      </h4>
      <div className="space-y-2">
        <h5 className="text-H5 text-emphasis-on_surface-high">
          1. Informasi Umum
        </h5>
        <div className="mt-3 bg-custom-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
          <TextInput
            label="Kode RUP"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.kode_rup}
            disabledActive={true}
          />
          <TextInput
            label="Nama Balai"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.nama_balai}
            disabledActive={true}
          />
          <TextInput
            label="Nama Paket"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.nama_paket}
            disabledActive={true}
          />
          <TextInput
            label="Nama PPK"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.nama_ppk}
            disabledActive={true}
          />
          <TextInput
            label="Jabatan PPK"
            labelPosition="left"
            size="Medium"
            placeholder={commonInformation.jabatan_ppk}
            disabledActive={true}
          />
        </div>
      </div>
      <h5 className="text-H5 text-emphasis-on_surface-high">
        2. Identifikasi Kebutuhan
      </h5>
      <Tabs
        tabs={[
          {
            label: "Material",
            content: (
              <div className="mt-3 space-y-4">
                <SearchBox
                  placeholder="Cari Material..."
                  onSearch={handleSearchMaterial}
                />
                <Table
                  columns={[
                    { title: "Nama Material", accessor: "namaMaterial" },
                    { title: "Satuan", accessor: "satuan" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlahKebutuhan" },
                  ]}
                  data={filteredDataMaterial.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    filteredDataMaterial.length / itemsPerPage
                  )}
                  onPageChange={setCurrentPage}
                />
              </div>
            ),
          },
          // Similar updates for Peralatan and Tenaga Kerja tabs
        ]}
      />
      {/* Vendor Table and Button Section */}
      {/* ... */}
    </div>
  );
};

export default Tahap4;
