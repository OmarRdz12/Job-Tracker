
import React, { useState } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Select from './ui/Select';
import Input from './ui/Input'; // Reusing for file input styling (though not ideal)
import UploadIcon from './ui/icons/UploadIcon';
import DownloadIcon from './ui/icons/DownloadIcon';
import { ImportDataType, ExportDataType } from '../types';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File, type: ImportDataType) => void;
  onExport: (type: ExportDataType) => void;
  onDownloadSample: (type: ImportDataType) => void;
}

const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  onImport,
  onExport,
  onDownloadSample,
}) => {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importType, setImportType] = useState<ImportDataType>('companies');
  const [exportType, setExportType] = useState<ExportDataType>('all');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile, importType);
      setSelectedFile(null); // Reset file input
    } else {
      alert('Please select a CSV file to import.');
    }
  };

  const handleExport = () => {
    onExport(exportType);
  };
  
  const tabButtonClasses = (isActive: boolean) => 
    `px-4 py-2 font-medium rounded-t-md focus:outline-none ${
      isActive ? 'bg-primary text-white' : 'bg-base-200 text-neutral hover:bg-base-300'
    }`;

  const importTypeOptions = [
    { value: 'companies', label: 'Companies' },
    { value: 'applications', label: 'Applications' },
    { value: 'references', label: 'References' },
  ];

  const exportTypeOptions = [
    { value: 'all', label: 'All Data' },
    ...importTypeOptions,
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import / Export Data">
      <div className="mb-4 border-b border-base-300">
        <button
          className={tabButtonClasses(activeTab === 'import')}
          onClick={() => setActiveTab('import')}
          aria-pressed={activeTab === 'import'}
        >
          Import
        </button>
        <button
          className={tabButtonClasses(activeTab === 'export')}
          onClick={() => setActiveTab('export')}
          aria-pressed={activeTab === 'export'}
        >
          Export
        </button>
      </div>

      {activeTab === 'import' && (
        <div className="space-y-6">
          <Select
            label="Select data type to import"
            name="importType"
            value={importType}
            options={importTypeOptions}
            onChange={(e) => setImportType(e.target.value as ImportDataType)}
          />
          <div>
            <label htmlFor="csv-upload" className="block text-sm font-medium text-gray-700 mb-1">
              Upload CSV File
            </label>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
            />
          </div>
          {selectedFile && <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>}
          <Button onClick={handleImport} leftIcon={<UploadIcon />} disabled={!selectedFile}>
            Import Data
          </Button>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Download sample CSV files:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <button 
                  onClick={() => onDownloadSample('companies')} 
                  className="text-accent hover:underline text-sm inline-flex items-center"
                >
                  <DownloadIcon className="mr-1 w-4 h-4" /> Sample Companies CSV
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onDownloadSample('applications')} 
                  className="text-accent hover:underline text-sm inline-flex items-center"
                >
                  <DownloadIcon className="mr-1 w-4 h-4" /> Sample Applications CSV
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onDownloadSample('references')} 
                  className="text-accent hover:underline text-sm inline-flex items-center"
                >
                  <DownloadIcon className="mr-1 w-4 h-4" /> Sample References CSV
                </button>
              </li>
            </ul>
             <p className="mt-2 text-xs text-gray-500">Ensure your CSV file matches the column structure of the sample file for the selected data type. IDs will be used to update existing records; new records will be created otherwise.</p>
          </div>
        </div>
      )}

      {activeTab === 'export' && (
        <div className="space-y-6">
          <Select
            label="Select data to export"
            name="exportType"
            value={exportType}
            options={exportTypeOptions}
            onChange={(e) => setExportType(e.target.value as ExportDataType)}
          />
          <Button onClick={handleExport} leftIcon={<DownloadIcon />}>
            Export Data
          </Button>
           <p className="mt-2 text-xs text-gray-500">
            {exportType === 'all' 
              ? 'Exports separate CSV files for companies, applications, and references.' 
              : `Exports a CSV file for ${exportType}.`}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default ImportExportModal;
