import React, { useState } from "react";
import Navbar from "../../components/navigationbar";
import TextInput from "../../components/input";
import Checkbox from "../../components/checkbox";
import Button from "../../components/button";
import Dropdown from "../../components/dropdown";

const Inputvendor = ({ onNext }) => {
  const [selectedTypes, setSelectedTypes] = useState([]); // Store selected checkbox types
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

  const handleCheckboxChange = (type) => {
    setSelectedTypes(
      (prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type) // Remove if already selected
          : [...prev, type] // Add if not selected
    );
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState("default");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileSelect = (files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setUploadState("processing");

      const uploadInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(uploadInterval);
            setUploadState("done");
            return 100;
          }
          return prevProgress + 10;
        });
      }, 500);
    }
  };

  const handleCancel = () => {
    setUploadState("default");
    setSelectedFile(null);
    setProgress(0);
  };

  // Define options based on selected types
  const getOptions = () => {
    const options = {
      Material: [
        { value: "pedagang_grosir", label: "Pedagang Grosir" },
        { value: "distributor", label: "Distributor" },
        { value: "produsen", label: "Produsen" },
        { value: "pedagang_campuran", label: "Pedagang Campuran" },
      ],
      Peralatan: [
        { value: "produsen", label: "Produsen" },
        { value: "jasa_penyewaan", label: "Jasa Penyewaan Alat Berat" },
        { value: "kontraktor", label: "Kontraktor" },
        { value: "agen", label: "Agen" },
      ],
      TenagaKerja: [
        { value: "kontraktor", label: "Kontraktor" },
        { value: "pemerintah_daerah", label: "Pemerintah Daerah" },
      ],
    };

    // Combine options based on selected types
    let combinedOptions = [];
    selectedTypes.forEach((type) => {
      // Check if options[type] exists and is an array
      if (Array.isArray(options[type])) {
        combinedOptions = [...combinedOptions, ...options[type]];
      }
    });

    return combinedOptions;
  };

  return (
    <div className="p-8">
      <Navbar />
      <div className="p-6">
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Input Data Vendor
        </h3>

        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex-grow grid grid-cols-1 gap-4 py-8 px-6 rounded-[16px] bg-custom-neutral-100">
            <TextInput
              label="Nama Vendor/Perusahaan"
              placeholder="Masukkan nama vendor/perusahaan"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Vendor/Perusahaan tidak boleh kosong."
              name="vendorName"
              value={formValues.vendorName}
              onChange={handleChange}
            />
            <div className="space-b-1">
              <p className="text-B2">Jenis Responden/ Vendor</p>
              <div className="flex space-x-8">
                <Checkbox
                  label="Material"
                  checked={selectedTypes.includes("Material")}
                  onChange={() => handleCheckboxChange("Material")}
                />
                <Checkbox
                  label="Peralatan"
                  checked={selectedTypes.includes("Peralatan")}
                  onChange={() => handleCheckboxChange("Peralatan")}
                />
                <Checkbox
                  label="Tenaga Kerja"
                  checked={selectedTypes.includes("TenagaKerja")} // Updated key here
                  onChange={() => handleCheckboxChange("TenagaKerja")} // Updated key here
                />
              </div>
            </div>

            <Dropdown
              options={getOptions()}
              label="Kategori Vendor/Perusahaan"
              placeholder="Pilih kategori vendor/perusahaan"
              value={formValues.category}
              onSelect={(selectedOption) => {
                setFormValues({
                  ...formValues,
                  category: selectedOption ? selectedOption.value : "",
                });
              }}
              isRequired={true}
            />

            {/* Other form fields remain unchanged */}

            <TextInput
              label="Sumber daya yang disediakan"
              placeholder="Masukkan sumber daya, contoh: Scaffolding, excavator, semen"
              type="text"
              state="border"
              name="resources"
              value={formValues.resources}
              onChange={handleChange}
            />
            <TextInput
              label="Alamat vendor atau perusahaan"
              placeholder="Masukkan alamat"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Alamat tidak boleh kosong."
              name="address"
              value={formValues.address}
              onChange={handleChange}
            />
            <div className="flex gap-8">
              <TextInput
                label="Nomor Telepon"
                placeholder="Masukkan nomor telepon"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Nomor telepon tidak boleh kosong."
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="flex-1"
              />
              <TextInput
                label="Nomor HP"
                placeholder="Masukkan nomor HP"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Nomor HP tidak boleh kosong."
                name="mobile"
                value={formValues.mobile}
                onChange={handleChange}
                className="flex-1"
              />
            </div>
            <TextInput
              label="Nama PIC"
              placeholder="Masukkan nama PIC"
              type="text"
              state="border"
              isRequired={true}
              errorMessage="Nama PIC tidak boleh kosong."
              name="picName"
              value={formValues.picName}
              onChange={handleChange}
            />
            <div className="flex gap-8">
              <TextInput
                label="Provinsi"
                placeholder="Masukkan provinsi"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Provinsi tidak boleh kosong."
                name="province"
                value={formValues.province}
                onChange={handleChange}
              />
              <TextInput
                label="Kabupaten/Kota"
                placeholder="Masukkan kabupaten/kota"
                type="text"
                state="border"
                isRequired={true}
                errorMessage="Kabupaten/Kota tidak boleh kosong."
                name="city"
                value={formValues.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-grow grid grid-cols-1 gap-4 py-8 px-6 rounded-[16px] bg-custom-neutral-100">
            <div className="space-y-6">
              <TextInput
                label="Lattitude"
                placeholder="Masukkan Lattitude"
                type="text"
                state="border"
                name="latitude"
                value={formValues.picName}
                onChange={handleChange}
              />
              <TextInput
                label="Longitude"
                placeholder="Masukkan Longitude"
                type="text"
                state="border"
                name="longitude"
                value={formValues.province}
                onChange={handleChange}
              />
              <FileInput
                onFileSelect={handleFileSelect}
                buttonText="Pilih File"
                selectedFile={selectedFile}
                progress={progress}
                state={uploadState}
                onCancel={handleCancel}
                multiple={false}
                accept=".jpg, .png"
                Label="Logo"
                HelperText="Format .JPG, .PNG dan maksimal 512Kb"
              />
              <FileInput
                onFileSelect={handleFileSelect}
                buttonText="Pilih File"
                selectedFile={selectedFile}
                progress={progress}
                state={uploadState}
                onCancel={handleCancel}
                multiple={false}
                accept=".jpg, .png"
                Label="Dokumen pendukung"
                HelperText="Format .JPG, .PNG dan maksimal 512Kb"
              />
            </div>
          </div>
          <div className="flex flex-row w-full justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
            <Button variant="solid_blue" size="Medium" onClick={onNext}>
              Simpan & Lanjut
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputvendor;
