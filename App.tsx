
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Company, ApplicationProcess, Reference, EntityType } from './types';
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

const App: React.FC = () => {
  const [companies, setCompanies] = useLocalStorage<Company[]>('companies', []);
  const [applications, setApplications] = useLocalStorage<ApplicationProcess[]>('applications', []);
  const [references, setReferences] = useLocalStorage<Reference[]>('references', []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Company | ApplicationProcess | Reference | null>(null);
  const [modalType, setModalType] = useState<EntityType | null>(null);

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
      <h1 className="text-4xl font-bold text-primary mb-6">Welcome to {SITE_TITLE}!</h1>
      <p className="text-lg text-gray-700 mb-8">Select a category from the navigation bar to manage your job applications, companies, and references.</p>
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
       <footer className="bg-base-300 text-center p-4 text-sm text-gray-600"  dangerouslySetInnerHTML={{__html:FOOTER_CONTENT}}>
        {/* {FOOTER_CONTENT} */}
      </footer>
    </div>
  );
};

export default App;
