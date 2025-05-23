
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Company, ApplicationProcess, Reference, EntityType, ImportDataType, ExportDataType, ApplicationStatus } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { SITE_TITLE, FOOTER_CONTENT } from './constants';
import {IMAGES} from './images'
import Navbar from './components/Navbar';
import CompanyList from './components/companies/CompanyList';
import CompanyForm from './components/companies/CompanyForm';
import ApplicationList from './components/applications/ApplicationList';
import ApplicationForm from './components/applications/ApplicationForm';
import ReferenceList from './components/references/ReferenceList';
import ReferenceForm from './components/references/ReferenceForm';
import ImportExportModal from './components/ImportExportModal';
import Button from './components/ui/Button';
import UploadIcon from './components/ui/icons/UploadIcon';
import DownloadIcon from './components/ui/icons/DownloadIcon';

const App: React.FC = () => {
  const [companies, setCompanies] = useLocalStorage<Company[]>('companies', []);
  const [applications, setApplications] = useLocalStorage<ApplicationProcess[]>('applications', []);
  const [references, setReferences] = useLocalStorage<Reference[]>('references', []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Company | ApplicationProcess | Reference | null>(null);
  const [modalType, setModalType] = useState<EntityType | null>(null);


  const [isImportExportModalOpen, setIsImportExportModalOpen] = useState(false);

  // --- CSV Helper Functions ---
  const escapeCsvField = (field: any): string => {
    const str = String(field ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const arrayToCsv = (data: Record<string, any>[], columns: string[]): string => {
    const header = columns.map(escapeCsvField).join(',') + '\n';
    const rows = data.map(item => {
      return columns.map(col => {
        if (col === 'technologies' && Array.isArray(item[col])) {
          return escapeCsvField((item[col] as string[]).join(';'));
        }
        return escapeCsvField(item[col]);
      }).join(',');
    }).join('\n');
    return header + rows;
  };

  const downloadCsv = (filename: string, csvString: string) => {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const parseCsvRow = (row: string): string[] => {
    const result: string[] = [];
    let currentField = '';
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
            if (inQuotes && i + 1 < row.length && row[i+1] === '"') {
                currentField += '"';
                i++; 
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(currentField);
            currentField = '';
        } else {
            currentField += char;
        }
    }
    result.push(currentField);
    return result.map(field => field.trim());
};


  // --- Import/Export Logic ---
  const handleExportData = (type: ExportDataType) => {
    if (type === 'all' || type === 'companies') {
      const companyColumns = ['id', 'name', 'websiteUrl', 'jobPostUrl', 'technologies', 'recruiterName', 'recruiterEmail', 'recruiterPhone', 'notes'];
      const csv = arrayToCsv(companies, companyColumns);
      downloadCsv('companies.csv', csv);
    }
    if (type === 'all' || type === 'applications') {
      const applicationColumns = ['id', 'companyId', 'jobTitle', 'appliedDate', 'status', 'salaryExpectation', 'notes', 'nextFollowUpDate'];
      const csv = arrayToCsv(applications, applicationColumns);
      downloadCsv('applications.csv', csv);
    }
    if (type === 'all' || type === 'references') {
      const referenceColumns = ['id', 'companyId', 'name', 'contactInfo', 'relationship', 'notes'];
      const csv = arrayToCsv(references, referenceColumns);
      downloadCsv('references.csv', csv);
    }
    setIsImportExportModalOpen(false);
  };

  const handleImportData = (file: File, type: ImportDataType) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      if (!csvText) {
        alert('Error reading file.');
        return;
      }
      
      const lines = csvText.split(/\r\n|\n/).filter(line => line.trim() !== '');
      if (lines.length < 2) {
        alert('CSV file must contain a header row and at least one data row.');
        return;
      }
      
      const headerLine = lines[0];
      const headers = parseCsvRow(headerLine);
      const dataRows = lines.slice(1);

      try {
        switch (type) {
          case 'companies':
            const importedCompanies = dataRows.map(rowStr => {
              const values = parseCsvRow(rowStr);
              const company: Partial<Company> = {};
              headers.forEach((header, index) => {
                const key = header as keyof Company;
                if (key === 'technologies') {
                  company[key] = values[index] ? values[index].split(';').map(t => t.trim()).filter(t => t) : [];
                } else {
                  (company as any)[key] = values[index] || undefined;
                }
              });
              if (!company.id) company.id = crypto.randomUUID();
              return company as Company;
            });
            setCompanies(prev => {
              const newCompanies = [...prev];
              importedCompanies.forEach(impC => {
                const existingIndex = newCompanies.findIndex(c => c.id === impC.id);
                if (existingIndex > -1) newCompanies[existingIndex] = { ...newCompanies[existingIndex], ...impC };
                else newCompanies.push(impC);
              });
              return newCompanies;
            });
            break;
          case 'applications':
            const importedApplications = dataRows.map(rowStr => {
              const values = parseCsvRow(rowStr);
              const app: Partial<ApplicationProcess> = {};
              headers.forEach((header, index) => {
                 const key = header as keyof ApplicationProcess;
                 if (key === 'status') {
                    app[key] = values[index] as ApplicationStatus || ApplicationStatus.APPLIED;
                 } else {
                    (app as any)[key] = values[index] || undefined;
                 }
              });
              if (!app.id) app.id = crypto.randomUUID();
              if (!app.companyId) throw new Error('Missing companyId for an application.');
              return app as ApplicationProcess;
            });
             setApplications(prev => {
              const newApplications = [...prev];
              importedApplications.forEach(impA => {
                const existingIndex = newApplications.findIndex(a => a.id === impA.id);
                if (existingIndex > -1) newApplications[existingIndex] = { ...newApplications[existingIndex], ...impA };
                else newApplications.push(impA);
              });
              return newApplications;
            });
            break;
          case 'references':
            const importedReferences = dataRows.map(rowStr => {
              const values = parseCsvRow(rowStr);
              const ref: Partial<Reference> = {};
              headers.forEach((header, index) => {
                (ref as any)[header as keyof Reference] = values[index] || undefined;
              });
              if (!ref.id) ref.id = crypto.randomUUID();
              if (!ref.companyId) throw new Error('Missing companyId for a reference.');
              return ref as Reference;
            });
            setReferences(prev => {
              const newReferences = [...prev];
              importedReferences.forEach(impR => {
                const existingIndex = newReferences.findIndex(r => r.id === impR.id);
                if (existingIndex > -1) newReferences[existingIndex] = { ...newReferences[existingIndex], ...impR };
                else newReferences.push(impR);
              });
              return newReferences;
            });
            break;
        }
        alert(`${type} imported successfully!`);
        setIsImportExportModalOpen(false);
      } catch (error) {
        console.error("Import error:", error);
        alert(`Error importing ${type}: ${error instanceof Error ? error.message : String(error)}. Please check CSV format and required fields.`);
      }
    };
    reader.onerror = () => {
      alert('Failed to read file.');
    };
    reader.readAsText(file);
  };

  const handleDownloadSample = (type: ImportDataType) => {
    let csvString = '';
    let filename = '';
    switch (type) {
      case 'companies':
        filename = 'sample_companies.csv';
        csvString = 'id,name,websiteUrl,jobPostUrl,technologies,recruiterName,recruiterEmail,recruiterPhone,notes\n';
        csvString += 'company-uuid-1,Sample Tech Inc,https://sampletech.com,https://sampletech.com/careers,"JavaScript;React;NodeJS",John Recruiter,john@sampletech.com,123-456-7890,"Great company culture"\n';
        csvString += 'company-uuid-2,Another Corp,https://anothercorp.io,https://anothercorp.io/jobs,"Python;Django",Jane Recruiter,jane@anothercorp.io,,';
        break;
      case 'applications':
        filename = 'sample_applications.csv';
        csvString = 'id,companyId,jobTitle,appliedDate,status,salaryExpectation,notes,nextFollowUpDate\n';
        csvString += `app-uuid-1,company-uuid-1,Frontend Developer,2024-01-15,${ApplicationStatus.INTERVIEWING},"$90k-$100k","First interview went well",2024-02-01\n`;
        csvString += `app-uuid-2,company-uuid-2,Backend Engineer,2024-01-20,${ApplicationStatus.APPLIED},"$120k",,`;
        break;
      case 'references':
        filename = 'sample_references.csv';
        csvString = 'id,companyId,name,contactInfo,relationship,notes\n';
        csvString += 'ref-uuid-1,company-uuid-1,Alice Wonderland,alice@example.com,Former Manager,"Very supportive manager"\n';
        csvString += 'ref-uuid-2,company-uuid-2,Bob The Builder,bob@example.com,Senior Colleague,';
        break;
    }
    downloadCsv(filename, csvString);
  };


  // --- Company CRUD ---
  const handleAddOrUpdateCompany = (company: Company) => {
    setCompanies(prev => {
      const existing = prev.find(c => c.id === company.id);
      if (existing) {
        return prev.map(c => c.id === company.id ? company : c);
      }
      return [...prev, company];
    });
  };
  const handleDeleteCompany = (id: string) => {
    if (window.confirm('Are you sure you want to delete this company? This will also delete related applications and references.')) {
        setCompanies(prev => prev.filter(c => c.id !== id));
        setApplications(prev => prev.filter(app => app.companyId !== id));
        setReferences(prev => prev.filter(ref => ref.companyId !== id));
    }
  };

  // --- Application CRUD ---
  const handleAddOrUpdateApplication = (application: ApplicationProcess) => {
    setApplications(prev => {
      const existing = prev.find(a => a.id === application.id);
      if (existing) {
        return prev.map(a => a.id === application.id ? application : a);
      }
      return [...prev, application];
    });
  };
  const handleDeleteApplication = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(prev => prev.filter(a => a.id !== id));
    }
  };

  // --- Reference CRUD ---
  const handleAddOrUpdateReference = (reference: Reference) => {
    setReferences(prev => {
      const existing = prev.find(r => r.id === reference.id);
      if (existing) {
        return prev.map(r => r.id === reference.id ? reference : r);
      }
      return [...prev, reference];
    });
  };
  const handleDeleteReference = (id: string) => {
     if (window.confirm('Are you sure you want to delete this reference?')) {
      setReferences(prev => prev.filter(r => r.id !== id));
    }
  };

  // --- Modal Control ---
  const openModal = (type: EntityType, item: Company | ApplicationProcess | Reference | null = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setModalType(null);
  };
  
  const renderDashboard = () => (
    <div className="container mx-auto p-8 text-center">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-primary mb-6">Welcome to {SITE_TITLE}!</h1>
        <Button 
              onClick={() => setIsImportExportModalOpen(true)}
              variant="secondary"
              leftIcon={<UploadIcon className="w-4 h-4 mr-1"/>} // Example, can be more specific icon
              rightIcon={<DownloadIcon className="w-4 h-4 ml-1"/>}
          >
              Import/Export
        </Button>
      </div>
      <p className="text-lg text-gray-700 mb-8">Select a category from the navigation bar or manage your data using the import/export feature.</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-secondary mb-2">Companies</h2>
          <p className="text-gray-600">Total: {companies.length}</p>
        </div>
        <div className="p-6 bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-accent mb-2">Applications</h2>
          <p className="text-gray-600">Total: {applications.length}</p>
        </div>
         <div className="p-6 bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-indigo-500 mb-2">References</h2>
          <p className="text-gray-600">Total: {references.length}</p>
        </div>
      </div>
      <img src={IMAGES.dashboard} alt="Dashboard illustration" className="mt-10 mx-auto rounded-lg shadow-lg opacity-80" />
    </div>
  );


  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={renderDashboard()} />
          <Route path="/companies" element={
            <CompanyList 
              companies={companies} 
              onEdit={(company) => openModal('company', company)} 
              onDelete={handleDeleteCompany} 
              onAdd={() => openModal('company')} 
            />
          }/>
          <Route path="/applications" element={
            <ApplicationList 
              applications={applications} 
              companies={companies}
              onEdit={(app) => openModal('application', app)} 
              onDelete={handleDeleteApplication} 
              onAdd={() => openModal('application')} 
            />
          }/>
          <Route path="/references" element={
            <ReferenceList 
              references={references} 
              companies={companies}
              onEdit={(ref) => openModal('reference', ref)} 
              onDelete={handleDeleteReference} 
              onAdd={() => openModal('reference')} 
            />
          }/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {modalType === 'company' && (
        <CompanyForm
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAddOrUpdateCompany}
          initialData={editingItem as Company | null}
        />
      )}
      {modalType === 'application' && (
        <ApplicationForm
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAddOrUpdateApplication}
          initialData={editingItem as ApplicationProcess | null}
          companies={companies}
        />
      )}
      {modalType === 'reference' && (
        <ReferenceForm
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAddOrUpdateReference}
          initialData={editingItem as Reference | null}
          companies={companies}
        />
      )}
      <ImportExportModal
        isOpen={isImportExportModalOpen}
        onClose={() => setIsImportExportModalOpen(false)}
        onImport={handleImportData}
        onExport={handleExportData}
        onDownloadSample={handleDownloadSample}
      />
       <footer className="bg-base-300 text-center p-4 text-sm text-gray-600"  dangerouslySetInnerHTML={{__html:FOOTER_CONTENT}}>
        {/* {FOOTER_CONTENT} */}
      </footer>
    </div>
  );
};

export default App;
