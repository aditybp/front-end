import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/navigationbar";
import TextInput from "../../components/input";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/tabs";
import SearchBox from "../../components/searchbox";
import Button from "../../components/button";
import axios from "axios";

const Tahap4 = ({ onNext, onBack }) => {
  const fetchCommonInformation = useCallback(async () => {
    const response = await fetch(
      "https://api-ecatalogue-staging.online/api/perencanaan-data/perencanaan-data-result?id=1"
    );
    console.log("response", response);
    const data = await response.json();
    console.log("data", data);
    const commonInformation = data?.data?.informasi_umum || {
      kode_rup: "",
      nama_balai: "",
      nama_paket: "",
      nama_ppk: "",
      jabatan_ppk: "",
      jenis_informasi: "",
    };
    const dataMaterial = data?.data?.material || [];
    const dataPeralatan = data?.data?.peralatan || [];
    const dataTenagaKerja = data?.data?.tenaga_kerja || [];
    const dataVendor = data?.data?.shortlist_vendor || [];
    setCommonInformation(commonInformation);
    setDataMaterial(dataMaterial);
    setDataPeralatan(dataPeralatan);
    setDataTenagaKerja(dataTenagaKerja);
    setDataVendor(dataVendor);
  }, []);

  useEffect(() => {
    fetchCommonInformation().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [fetchCommonInformation]);

  // State untuk setiap input form
  const [formValues, setFormValues] = useState({
    vendorName: "",
    category: "",
    resources: "",
    address: "",
    phone: "",
    mobile: "",
    picName: "",
    province: "",
    city: "",
  });

  const [commonInformation, setCommonInformation] = useState({
    kode_rup: "",
    nama_balai: "",
    nama_paket: "",
    nama_ppk: "",
    jabatan_ppk: "",
  });

  const [dataMaterial, setDataMaterial] = useState([
    {
      id: 1,
      nama_material: "Pasir",
      satuan: "mÂ³",
      spesifikasi: "",
      ukuran: "",
      kodefikasi: "",
      jumlah_kebutuhan: "",
      merk: "",
      provinsi: "",
      kabupatenKota: "",
      kelompok_material: "",
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  const [dataPeralatan, setDataPeralatan] = useState([
    {
      id: 1,
      nama_peralatan: "Excavator",
      satuan: "unit",
      tipe: "",
      merk: "",
      kapasitas: "",
      jumlah_kebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  const [dataTenagaKerja, setDataTenagaKerja] = useState([
    {
      id: 1,
      jenis_tenaga_kerja: "Tukang Batu",
      kategori: "Pekerja Harian",
      upah: "",
      jumlah_kebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  const [dataVendor, setDataVendor] = useState([
    {
      id: 1,
      nama_vendor: "PT. Vendor 1",
      pemilik_vendor: "Budi",
      alamat: "Jl. Vendor 1 No. 1",
      kontak: "08123456789",
      url_kuisioner: "https://example.com",
    },
  ]);

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

  const handleSearchPeralatan = (query) => {
    setSearchQueryPeralatan(query);
    setCurrentPage(1);
  };

  const handleSearchTenagaKerja = (query) => {
    setSearchQueryTenagaKerja(query);
    setCurrentPage(1);
  };

  // Filter data berdasarkan pencarian
  const filteredDataMaterial = dataMaterial.filter((item) =>
    item.nama_material.toLowerCase().includes(searchQueryMaterial.toLowerCase())
  );

  const filteredDataPeralatan = dataPeralatan.filter((item) =>
    item.nama_peralatan
      .toLowerCase()
      .includes(searchQueryPeralatan.toLowerCase())
  );

  const filteredDataTenagaKerja = dataTenagaKerja.filter((item) =>
    item.jenis_tenaga_kerja
      .toLowerCase()
      .includes(searchQueryTenagaKerja.toLowerCase())
  );

  // Fungsi onChange untuk mengupdate nilai form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Fungsi untuk menangani file yang dipilih
  const handleFileSelect = (files) => {
    // Logika untuk menangani file upload
  };

  const handleCancel = () => {
    // Logika untuk membatalkan upload file
  };

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
                    { title: "Nama Material", accessor: "nama_material" },
                    { title: "Satuan", accessor: "satuan" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlah_kebutuhan" },
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
          {
            label: "Peralatan",
            content: (
              <div className="mt-3 space-y-4">
                <SearchBox
                  placeholder="Cari Peralatan..."
                  onSearch={handleSearchPeralatan}
                />
                <Table
                  columns={[
                    { title: "Nama Peralatan", accessor: "nama_peralatan" },
                    { title: "Satuan", accessor: "satuan" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlah_kebutuhan" },
                  ]}
                  data={filteredDataPeralatan.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(dataPeralatan.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
                />
              </div>
            ),
          },
          {
            label: "Tenaga Kerja",
            content: (
              <div className="mt-3 space-y-4">
                <SearchBox
                  placeholder="Cari Tenaga Kerja..."
                  onSearch={handleSearchTenagaKerja}
                />
                <Table
                  columns={[
                    { title: "Nama Pekerja", accessor: "jenis_tenaga_kerja" },
                    { title: "Kategori", accessor: "kategori" },
                    { title: "Upah", accessor: "upah" },
                    { title: "Jumlah Kebutuhan", accessor: "jumlah_kebutuhan" },
                  ]}
                  data={filteredDataTenagaKerja.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(dataTenagaKerja.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
                />
              </div>
            ),
          },
        ]}
      />
      <h5 className="text-H5 text-emphasis-on_surface-high">3. Vendor</h5>
      <Table
        columns={[
          { title: "Responden/Vendor", accessor: "nama_vendor" },
          { title: "Pemilik Vendor", accessor: "pemilik_vendor" },
          { title: "Alamat", accessor: "alamat" },
          { title: "Kontak", accessor: "kontak" },
          { title: "Rancangan Kuesioner", accessor: "url_kuisioner" },
        ]}
        data={dataVendor.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(dataPeralatan.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button variant="outlined_yellow" size="Medium" onClick={onBack}>
          Kembali
        </Button>

        <Button
          variant="solid_blue"
          size="Medium"
          onClick={async () => {
            console.log("onNext called");
            try {
              // await handleSubmitSecondStep();
              onNext(); // This will only run if handleSubmitSecondStep succeeds
            } catch (error) {
              alert(error.message);
              // onNext() won't be called
            }
          }}
        >
          Simpan & Lanjut
        </Button>
      </div>
      ,
    </div>
  );
};

export default Tahap4;
