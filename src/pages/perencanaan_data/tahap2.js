import React, { useState } from "react";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/tabs";
import Button from "../../components/button";
import { Trash } from "iconsax-react";
import SearchBox from "../../components/searchbox";

const Tahap2 = ({ onNext, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsToAdd, setRowsToAdd] = useState(0);

  const [dataMaterial, setDataMaterial] = useState([
    {
      id: 1,
      namaMaterial: "",
      satuan: "",
      spesifikasi: "",
      ukuran: "",
      kodefikasi: "",
      jumlahKebutuhan: "",
      merk: "",
      provinsi: "",
      kabupatenKota: "",
      kelompokMaterial: "",
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  const [dataPeralatan, setDataPeralatan] = useState([
    {
      id: 1,
      namaPeralatan: "Excavator",
      satuan: "unit",
      tipe: "",
      merk: "",
      kapasitas: "",
      jumlahKebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  const [dataTenagaKerja, setDataTenagaKerja] = useState([
    {
      id: 1,
      namaPekerja: "Tukang Batu",
      kategori: "Pekerja Harian",
      upah: "",
      jumlahKebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  const handleAddRowMaterial = () => {
    const newRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: dataMaterial.length + index + 1, // Unique ID
      namaMaterial: "", // Default value, adjust as needed
      satuan: "",
      spesifikasi: "",
      ukuran: "",
      kodefikasi: "",
      jumlahKebutuhan: "",
      merk: "",
      provinsi: "",
      kabupatenKota: "",
      kelompokMaterial: "",
    }));

    setDataMaterial((prevData) => [...prevData, ...newRows]);
    setFilteredDataMaterial((prevData) => [...prevData, ...newRows]);
    setRowsToAdd(0); // Reset input
    setIsModalOpen(false); // Close modal
  };

  const handleAddRowsPeralatan = () => {
    const newRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: dataPeralatan.length + index + 1, // Unique ID
      namaPeralatan: "", // Default value, adjust as needed
      satuan: "",
      tipe: "",
      merk: "",
      kapasitas: "",
      jumlahKebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    }));

    setDataPeralatan((prevData) => [...prevData, ...newRows]);
    setFilteredDataPeralatan((prevData) => [...prevData, ...newRows]);
    setRowsToAdd(0); // Reset input
    setIsModalOpen(false); // Close modal
  };

  const handleAddRowsTenagaKerja = () => {
    const newRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: dataTenagaKerja.length + index + 1, // Unique ID
      namaPekerja: "", // Default value, adjust as needed
      kategori: "",
      upah: "",
      jumlahKebutuhan: "",
      provinsi: "",
      kabupatenKota: "",
    }));

    setDataTenagaKerja((prevData) => [...prevData, ...newRows]);
    setFilteredDataTenagaKerja((prevData) => [...prevData, ...newRows]);
    setRowsToAdd(0); // Reset input
    setIsModalOpen(false); // Close
  };

  // State untuk data yang difilter per tab
  const [filteredDataMaterial, setFilteredDataMaterial] =
    useState(dataMaterial);
  const [filteredDataPeralatan, setFilteredDataPeralatan] =
    useState(dataPeralatan);
  const [filteredDataTenagaKerja, setFilteredDataTenagaKerja] =
    useState(dataTenagaKerja);

  const [stateMaterial, setStateMaterial] = useState(null);
  const [statePeralatan, setStatePeralatan] = useState(null);
  const [stateTenagaKerja, setStateTenagaKerja] = useState(null);

  // Search logic per tab
  const handleSearch = (query, tab) => {
    const data =
      tab === "Material"
        ? dataMaterial
        : tab === "Peralatan"
        ? dataPeralatan
        : dataTenagaKerja;
    const result = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    if (tab === "Material") {
      setFilteredDataMaterial(result);
    } else if (tab === "Peralatan") {
      setFilteredDataPeralatan(result);
    } else {
      setFilteredDataTenagaKerja(result);
    }
    setCurrentPage(1); // Reset to the first page
  };

  const handleDelete = (row, tab) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus item ${
        tab === "Material"
          ? row.namaMaterial
          : tab === "Peralatan"
          ? row.namaPeralatan
          : row.namaPekerja
      }?`
    );
    if (confirmed) {
      const newData = (
        tab === "Material"
          ? dataMaterial
          : tab === "Peralatan"
          ? dataPeralatan
          : dataTenagaKerja
      ).filter((item) => item.id !== row.id);
      if (tab === "Material") {
        setDataMaterial(newData);
        setFilteredDataMaterial(newData);
      } else if (tab === "Peralatan") {
        setDataPeralatan(newData);
        setFilteredDataPeralatan(newData);
      } else {
        setDataTenagaKerja(newData);
        setFilteredDataTenagaKerja(newData);
      }
      setCurrentPage(1);
    }
  };

  const columnsMaterial = [
    {
      title: "Nama Material",
      accessor: "nama_material",
      placeholder: "Masukkan Nama Material",
      type: "textInput",
      width: "300px",
    },
    {
      title: "Satuan",
      accessor: "satuan",
      type: "textInput",
      width: "154px",
      placeholder: "Masukkan Satuan",
    },
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      type: "textInput",
      placeholder: "Masukkan Spesifikasi",
      width: "240px",
      required: true,
    },
    {
      title: "Ukuran",
      accessor: "ukuran",
      type: "textInput",
      placeholder: "Masukkan Ukuran",
      width: "240px",
      required: true,
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      required: true,
    },
    {
      title: "Kelompok Material",
      accessor: "kelompok_material",
      type: "dropdown",
      options: ["Kelompok A", "Kelompok B", "Kelompok C"],
      width: "240px",
      required: true,
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlah_kebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah",
      width: "260px",
      required: true,
    },
    {
      title: "Merk",
      accessor: "merk",
      type: "textInput",
      placeholder: "Masukkan Merk",
      width: "200px",
      required: true,
    },
    {
      title: "Provinsi",
      accessor: "provinsi",
      type: "dropdown",
      options: ["Jawa Barat", "Jawa Timur", "DKI Jakarta"],
      width: "200px",
      required: true,
    },
    {
      title: "Kabupaten/Kota",
      accessor: "kabupatenKota",
      type: "dropdown",
      options: ["Bandung", "Surabaya", "Jakarta"],
      width: "300px",
      required: true,
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => handleDelete(row, "Material"),
      width: "52px",
    },
  ];

  const columnsPeralatan = [
    {
      title: "Nama Peralatan",
      accessor: "nama_peralatan",
      placeholder: "Masukkan Nama Peralatan",
      type: "textInput",
      width: "300px",
      required: true,
    },
    {
      title: "Satuan",
      accessor: "satuan",
      placeholder: "Masukkan Satuan",
      type: "textInput",
      width: "154px",
      required: true,
    },
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      type: "textInput",
      placeholder: "Masukkan Spesifikasi",
      width: "240px",
      required: true,
    },
    {
      title: "Kapasitas",
      accessor: "kapasitas",
      type: "textInput",
      placeholder: "Masukkan Kapasitas",
      width: "240px",
      required: true,
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      required: true,
    },
    {
      title: "Kelompok Peralatan",
      accessor: "kelompok_peralatan",
      type: "dropdown",
      options: ["Jawa Barat", "Jawa Timur", "DKI Jakarta"],
      placeholder: "Masukkan Kelompok Peralatan",
      width: "240px",
      required: true,
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlah_kebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah Kebutuhan",
      width: "260px",
      required: true,
    },
    {
      title: "Merk",
      accessor: "merk",
      type: "textInput",
      placeholder: "Masukkan Merk",
      width: "200px",
      required: true,
    },
    {
      title: "Provinsi",
      accessor: "provincies_id",
      type: "dropdown",
      options: ["Jawa Barat", "Jawa Timur", "DKI Jakarta"],
      width: "200px",
      required: true,
    },
    {
      title: "Kabupaten/Kota",
      accessor: "cities_id",
      type: "dropdown",
      options: ["Bandung", "Surabaya", "Jakarta"],
      width: "200px",
      required: true,
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => handleDelete(row, "Peralatan"),
      width: "52px",
    },
  ];

  const columnsTenagaKerja = [
    {
      title: "Jenis Tenaga Kerja",
      accessor: "jenis_tenaga_kerja",
      type: "textInput",
      placeholder: "Masukkan Tenaga Kerja",
      width: "300px",
      required: true,
    },
    {
      title: "Satuan",
      accessor: "satuan",
      // jumlah_kebutuhan: "Masukkan Satuan",
      placeholder: "Masukkan Satuan",
      type: "textInput",
      width: "154px",
      required: true,
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlah_kebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah Kebutuhan",
      width: "240px",
      required: true,
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      required: true,
    },
    {
      title: "Provinsi",
      accessor: "provincies_id",
      type: "dropdown",
      options: ["Jawa Barat", "Jawa Timur", "DKI Jakarta"],
      width: "200px",
      required: true,
    },
    {
      title: "Kabupaten/Kota",
      accessor: "cities_id",
      type: "dropdown",
      options: ["Bandung", "Surabaya", "Jakarta"],
      width: "200px",
      required: true,
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => handleDelete(row, "Tenaga Kerja"),
      width: "52px",
    },
  ];

  const tabs = [
    {
      label: "Material",
      content: (
        <div className="mt-3 space-y-8">
          <div className="flex items-center space-x-3 mt-3">
            <SearchBox placeholder="Cari Material..." onSearch={handleSearch} />
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Data
            </Button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
                <label className="block mb-2">
                  <p className="text-Medium font-bold text-emphasis-on_surface-high">
                    Tambah Data
                  </p>
                  <p className="text-Small text-emphasis-on_surface-medium">
                    Masukkan jumlah baris yang ingin ditambahkan:
                  </p>
                  <input
                    type="number"
                    value={rowsToAdd}
                    onChange={(e) => setRowsToAdd(Number(e.target.value))}
                    min="1"
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outlined_yellow"
                    size="Medium"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal{" "}
                  </Button>
                  <Button onClick={handleAddRowMaterial}>Tambah</Button>
                </div>
              </div>
            </div>
          )}

          <Table
            columns={columnsMaterial}
            data={filteredDataMaterial.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            setParentState={setStateMaterial}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredDataMaterial.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
    {
      label: "Peralatan",
      content: (
        <div className="mt-3 space-y-8">
          <div className="flex items-center space-x-3 mt-3">
            <SearchBox
              placeholder="Cari Peralatan..."
              onSearch={handleSearch}
            />
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Data
            </Button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
                <label className="block mb-2">
                  <p className="text-Medium font-bold text-emphasis-on_surface-high">
                    Tambah Data
                  </p>
                  <p className="text-Small text-emphasis-on_surface-medium">
                    Masukkan jumlah baris yang ingin ditambahkan:
                  </p>
                  <input
                    type="number"
                    value={rowsToAdd}
                    onChange={(e) => setRowsToAdd(Number(e.target.value))}
                    min="1"
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outlined_yellow"
                    size="Medium"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal{" "}
                  </Button>
                  <Button onClick={handleAddRowsPeralatan}>Tambah</Button>
                </div>
              </div>
            </div>
          )}
          <Table
            columns={columnsPeralatan}
            data={filteredDataPeralatan.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            setParentState={setStatePeralatan}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredDataPeralatan.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
    {
      label: "Tenaga Kerja",
      content: (
        <div className="mt-3 space-y-8">
          <div className="flex items-center space-x-3 mt-3">
            <SearchBox
              placeholder="Cari Tenaga Kerja..."
              onSearch={handleSearch}
            />
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Data
            </Button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
                <label className="block mb-2">
                  <p className="text-Medium font-bold text-emphasis-on_surface-high">
                    Tambah Data
                  </p>
                  <p className="text-Small text-emphasis-on_surface-medium">
                    Masukkan jumlah baris yang ingin ditambahkan:
                  </p>
                  <input
                    type="number"
                    value={rowsToAdd}
                    onChange={(e) => setRowsToAdd(Number(e.target.value))}
                    min="1"
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outlined_yellow"
                    size="Medium"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal{" "}
                  </Button>
                  <Button onClick={handleAddRowsTenagaKerja}>Tambah</Button>
                </div>
              </div>
            </div>
          )}
          <Table
            columns={columnsTenagaKerja}
            data={filteredDataTenagaKerja.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            setParentState={setStateTenagaKerja}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(
              filteredDataTenagaKerja.length / itemsPerPage
            )}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
  ];

  const handleSubmitSecondStep = async () => {
    try {
      if (!stateMaterial) throw new Error("Data material belum diisi!");
      if (!statePeralatan) throw new Error("Data peralatan belum diisi!");
      if (!stateTenagaKerja) throw new Error("Data tenaga kerja belum diisi!");
      // Lakukan validasi stateMaterial
      console.log(JSON.stringify(stateMaterial));
      const stateMaterialFirst = stateMaterial["1"];
      const statePeralatanFirst = statePeralatan["1"];
      const stateTenagaKerjaFirst = stateTenagaKerja["1"];
      const requestData = {
        informasi_umum_id: 1,
        material: [
          {
            ...stateMaterialFirst,
            provincies_id: 1,
            cities_id: 1,
          },
        ],
        peralatan: [
          {
            ...statePeralatanFirst,
            provincies_id: 1,
            cities_id: 1,
          },
        ],
        tenaga_kerja: [
          {
            ...stateTenagaKerjaFirst,
            provincies_id: 1,
            cities_id: 1,
          },
        ],
      };
      console.log(JSON.stringify(requestData));
      const response = await fetch(
        "https://api-ecatalogue-staging.online/api/perencanaan-data/store-identifikasi-kebutuhan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      console.log(response.body);

      if (!response.ok) {
        throw new Error("Submit tahap 2 gagal");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h4 className="text-H4 text-emphasis-on_surface-high">
        Identifikasi Kebutuhan{" "}
      </h4>
      <div className="mt-6">
        <Tabs tabs={tabs} />
      </div>
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
              await handleSubmitSecondStep();
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
    </div>
  );
};

export default Tahap2;
